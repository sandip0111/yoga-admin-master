import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * @deprecated This service is a legacy placeholder.
 * All API calls should use ServiceService from ./services/service.service.
 * This file is kept for reference only and should not be injected anywhere.
 */
@Injectable({
  providedIn: 'root',
})
export class WebapiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}
}
