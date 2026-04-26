import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/users/api/doctor/patients/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }

  getDoctorPatients(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}` 
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // createConsultation(consultationData: any): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Token ${token}`
  //   });
  //   return this.http.post('http://127.0.0.1:8000/users/api/consultations/add/', consultationData, { headers });
  // }


  createConsultation(consultationData: any): Observable<any> {
    // On utilise l'URL exacte qui a fonctionné dans ton navigateur
    const url = `${this.apiUrl}consultations/add/`;
    console.log("Appel POST vers :", url);
    return this.http.post(url, consultationData, { headers: this.getHeaders() });
  }

  // Ajouter dans patient.service.ts
createAppointment(appointmentData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });
  
  return this.http.post('http://127.0.0.1:8000/users/api/appointments/create/', appointmentData, { headers });
}
}




// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PatientService {
//   // On centralise l'URL de base pour plus de clarté
//   private baseUrl = 'http://127.0.0.1:8000/utilisateurs/api'; 

//   constructor(private http: HttpClient) {}

//   // Helper pour créer les headers avec le token
//   private getHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Authorization': `Token ${token}`
//     });
//   }

//   getDoctorPatients(): Observable<any> {
//     // Note: Vérifie si cette URL doit aussi être /utilisateurs/ au lieu de /users/
//     return this.http.get(`${this.baseUrl}/doctor/patients/`, { headers: this.getHeaders() });
//   }

//   createConsultation(consultationData: any): Observable<any> {
//     // On utilise l'URL exacte qui a fonctionné dans ton navigateur
//     const url = `${this.baseUrl}/consultations/ajouter/`;
//     console.log("Appel POST vers :", url);
//     return this.http.post(url, consultationData, { headers: this.getHeaders() });
//   }
// }