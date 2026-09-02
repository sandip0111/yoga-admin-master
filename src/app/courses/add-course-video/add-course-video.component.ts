import { Component, OnInit } from "@angular/core";
import { UploadProgress } from "src/app/models/uploadCourse";
import { S3BucketService } from "src/app/services/s3Service/s3-bucket.service";

@Component({
  standalone: false,
  selector: "app-add-course-video",
  templateUrl: "./add-course-video.component.html",
  styleUrls: ["./add-course-video.component.scss"],
})
export class AddCourseVideoComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  uploadComplete: boolean = false;
  uploadError: string | null = null;
  videoUrl: string | null = null;
  previewUrl: string | null = null;
  courseName: string = "";
  options = [
    { value: null, label: "Select a option" },
    { value: "6a00b33b220856ac7775c2bf", label: "200 TTC Online Sadhana" },
    { value: "69ff20a10cd7ed2296fbbdcd", label: "Pranic Purification II" },
    { value: "69ff6a520cd7ed2296fbbddb", label: "Online Live class" },
  ];
  selectedOption = null;
  months: { value: string; label: string }[] = [];
  selectedMonth: string | null = null;

  // Additional dropdown with two names (values 1 and 3)
  teacherOptions: { value: number; label: string }[] = [
    { value: 1, label: "Prashant Ji" },
    { value: 3, label: "Taniya Ji" },
  ];
  selectedTeacherId: number | null = null;

  constructor(private s3BucketService: S3BucketService) {}

  ngOnInit(): void {
    this.months = this.generateMonthOptions();
    this.selectedMonth = this.months.length ? this.months[0].value : null;

    // Default WO selection
    this.selectedTeacherId = this.teacherOptions.length
      ? this.teacherOptions[0].value
      : null;
  }

  private generateMonthOptions() {
    const months: { value: string; label: string }[] = [
      {
        value: "September, 2026",
        label: "September, 2026",
      },
    ];
    return months;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validation = this.s3BucketService.validateVideoFile(file);
      if (!validation.valid) {
        this.uploadError = validation.error || "Invalid file";
        this.selectedFile = null;
        this.previewUrl = null;
        return;
      }
      this.selectedFile = file;
      this.uploadError = null;
      this.uploadComplete = false;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const validation = this.s3BucketService.validateVideoFile(file);
      if (!validation.valid) {
        this.uploadError = validation.error || "Invalid file";
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
      this.uploadError = null;
      this.uploadComplete = false;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  uploadVideoThroughBackend(): void {
    if (!this.selectedFile) {
      return;
    }
    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadError = null;
    this.uploadComplete = false;
    if (this.selectedOption) {
      this.s3BucketService
        .uploadVideoThroughBackend(
          this.selectedFile,
          this.courseName,
          this.selectedOption,
          this.selectedMonth ? this.selectedMonth : "",
          this.selectedTeacherId ? this.selectedTeacherId : 0,
        )
        .subscribe({
          next: (progress: UploadProgress) => {
            this.uploadProgress = progress.progress;
            if (progress.success) {
              this.uploadComplete = true;
              this.isUploading = false;
            }
          },
          error: (error) => {
            this.uploadError = "Upload failed. Please try again.";
            this.isUploading = false;
            this.uploadProgress = 0;
          },
        });
    }
  }

  reset(): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.isUploading = false;
    this.uploadComplete = false;
    this.uploadError = null;
    this.videoUrl = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }

  getFileSize(): string {
    if (!this.selectedFile) {
      return "";
    }
    const bytes = this.selectedFile.size;
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }
}
