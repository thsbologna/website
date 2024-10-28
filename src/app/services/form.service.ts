import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../interfaces/email';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService extends BaseService {
  url: string = this.baseUrl + "/send-email"

  constructor(private http: HttpClient) {
    super();
  }

  sendEmail(email: Email): Observable<any> {
    return this.http.post(this.url, email);
  }
}
