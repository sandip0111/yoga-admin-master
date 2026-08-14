import { Component, OnInit } from "@angular/core";
import { ServiceService } from "src/app/services/service.service";
import { forkJoin, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Component({
  standalone: false,
  selector: "app-show-all-videos",
  templateUrl: "./show-all-videos.component.html",
  styleUrls: ["./show-all-videos.component.scss"],
})
export class ShowAllVideosComponent implements OnInit {
  isLoading = false;
  allVideos: any[] = [];
  filteredVideos: any[] = [];
  courseList: any[] = [];

  // Filter properties
  selectedCourseId: string = "";
  searchQuery: string = "";

  // Pagination property
  p: number = 1;

  // Selected video for modal playback
  selectedVideo: any = null;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.isLoading = true;
    this.service.getAllCourseV2().subscribe({
      next: (res: any) => {
        this.courseList = res.data || [];
        const requests = this.courseList.map((course) =>
          this.service.getCourseVideoV2({ courseId: course._id }).pipe(
            map((videos: any) => {
              if (Array.isArray(videos)) {
                return videos.map((vid) => {
                  let createdDate = vid.created || vid.createdAt;
                  if (!createdDate && vid._id && typeof vid._id === 'string' && vid._id.length === 24) {
                    const hexTimestamp = vid._id.substring(0, 8);
                    const seconds = parseInt(hexTimestamp, 16);
                    if (!isNaN(seconds)) {
                      createdDate = new Date(seconds * 1000).toISOString();
                    }
                  }
                  return {
                    ...vid,
                    created: createdDate,
                    courseName: course.coursetitle,
                    courseId: course._id,
                  };
                });
              }
              return [];
            }),
            catchError((err) => {
              console.error(`Error loading videos for course ${course._id}:`, err);
              return of([]);
            })
          )
        );

        if (requests.length === 0) {
          this.allVideos = [];
          this.filteredVideos = [];
          this.isLoading = false;
          return;
        }

        forkJoin(requests).subscribe({
          next: (results: any[]) => {
            // Flatten video lists from all courses
            this.allVideos = results.reduce((acc, val) => acc.concat(val), []);
            // Sort videos by creation date descending (newest first)
            this.allVideos.sort((a, b) => {
              const timeA = a.created ? new Date(a.created).getTime() : 0;
              const timeB = b.created ? new Date(b.created).getTime() : 0;
              return timeB - timeA;
            });
            this.applyFilters();
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Error combined loading:", err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error("Error loading courses:", err);
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    let filtered = [...this.allVideos];

    // Filter by Course
    if (this.selectedCourseId) {
      filtered = filtered.filter(
        (vid) => vid.courseId === this.selectedCourseId
      );
    }

    // Filter by Title
    if (this.searchQuery && this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (vid) =>
          (vid.title && vid.title.toLowerCase().includes(query)) ||
          (vid.courseName && vid.courseName.toLowerCase().includes(query))
      );
    }

    this.filteredVideos = filtered;
    this.p = 1; // Reset to page 1 on filter
  }

  onCourseFilterChange(event: any): void {
    this.selectedCourseId = event.target.value;
    this.applyFilters();
  }

  onSearchChange(event: any): void {
    this.searchQuery = event.target.value;
    this.applyFilters();
  }

  playVideo(video: any): void {
    this.selectedVideo = video;
  }

  closeModal(): void {
    this.selectedVideo = null;
  }

  onTableDataChange(event: any): void {
    this.p = event;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
