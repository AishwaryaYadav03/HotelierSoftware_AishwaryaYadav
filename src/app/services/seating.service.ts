import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatingService {

  private selectedSection: any = null;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Tenant': 'HAD'
  });

  private baseUrl = 'https://api.pos.lodge.hotelierpune.in/api/hotel/SeatingSection';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAll`, { headers: this.headers });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, data, { headers: this.headers });
  }

  update(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Update`, data, { headers: this.headers });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteById?id=${id}`, { headers: this.headers });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetById?id=${id}`, { headers: this.headers });
  }

setSelectedSection(section: any) {
  this.selectedSection = section;
}

getSelectedSection(): any {
  return this.selectedSection;
}

}
