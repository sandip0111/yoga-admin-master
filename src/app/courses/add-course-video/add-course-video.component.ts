import { Component, OnInit } from "@angular/core";
import { UploadProgress } from "src/app/models/uploadCourse";
import { S3BucketService } from "src/app/services/s3Service/s3-bucket.service";

@Component({
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
    { value: "63c4e7e72bce43a907211c78", label: "200 TTC Online Sadhana" },
    { value: "63c51f6ba3082d9dd0100e4d", label: "Pranic Purification" },
    { value: "63fc3fdc6d203300eae38625", label: "Online Live class" },
  ];
  selectedOption = null;
  constructor(private s3BucketService: S3BucketService) {}

  ngOnInit(): void {}
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

      // Validate file
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
        .uploadVideoThroughBackend(this.selectedFile, this.courseName, this.selectedOption)
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
