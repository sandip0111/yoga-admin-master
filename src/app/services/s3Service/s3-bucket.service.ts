import { HttpClient, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UploadProgress } from "src/app/models/uploadCourse";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class S3BucketService {
  private url = environment.apiUrl + "api/v1";
  constructor(private http: HttpClient) {}
  uploadVideoThroughBackend(
    file: File,
    courseName: string
  ): Observable<UploadProgress> {
    const formData = new FormData();
    formData.append("video", file, file.name);
    formData.append("courseName", courseName);
    return this.http
      .post(`${this.url}/upload-video`, formData, {
        reportProgress: true,
        observe: "events",
      })
      .pipe(
        map((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = Math.round(
              (100 * event.loaded) / (event.total || event.loaded)
            );
            return {
              progress,
              status: "uploading" as const,
              success: false,
              message: "",
            } as UploadProgress;
          } else if (event.type === HttpEventType.Response) {
            return {
              progress: 100,
              status: "completed" as const,
              url: event.body?.location,
              success: true,
              message: "Upload completed",
            } as UploadProgress;
          }
          return {
            progress: 0,
            status: "uploading" as const,
            success: false,
            message: "",
          } as UploadProgress;
        }),
        catchError((error) => {
          return throwError(
            () =>
              ({
                progress: 0,
                status: "error" as const,
                success: false,
                message: error?.message ?? String(error),
                error,
              } as UploadProgress)
          );
        })
      );
  }
  validateVideoFile(file: File): { valid: boolean; error?: string } {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo",
      "video/mov",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid file type. Allowed types: MP4, MPEG, MOV, AVI",
      };
    }

    // if (file.size > maxSize) {
    //   return {
    //     valid: false,
    //     error: "File size exceeds 100MB limit",
    //   };
    // }

    return { valid: true };
  }
}
