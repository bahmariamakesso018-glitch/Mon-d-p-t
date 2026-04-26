import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  // Ajuste l'URL selon la configuration de ton backend Django
  private apiUrl = 'http://127.0.0.1:8000/api/consultations'; 

  constructor(private http: HttpClient) { }

  /**
   * Récupère le nombre de consultations effectuées aujourd'hui
   */
  getTodayCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/today-count/`);
  }
}