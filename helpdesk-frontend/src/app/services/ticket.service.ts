import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/tickets'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ticket);
  }

  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}