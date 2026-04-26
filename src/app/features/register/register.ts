
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router'; // Importe le Router


@Component({
  selector: 'app-register',
  standalone: true,         
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  role: string = 'patient'; // par défaut
  username = '';
  password = '';
  phone = '';
  email = '';
  birthDate = '';
  birthPlace = '';
  specialty = '';
  errorMessage = '';


  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {}

  // Choisir rôle
  selectRole(selectedRole: string) {
    this.role = selectedRole;
  }

  // Envoyer inscription
  onRegister() {
    let url = '';

    if (this.role === 'patient') {
      url = 'http://127.0.0.1:8000/users/register/patient/';
    } else {
      url = 'http://127.0.0.1:8000/users/register/doctor/';
    }

    const data: any = {
      username: this.username,
      password1: this.password, 
      password2: this.password,
      email: this.email,
      birth_date: this.birthDate,
      birth_place: this.birthPlace,
      phone_number: this.phone

    };

    // Ajouter spécialité si docteur
    if (this.role === 'doctor') {
      data.specialty = this.specialty;
    }

    this.http.post(url, data).subscribe({
      next: (res) => {
        console.log("Compte créé", res);
        alert("Inscription réussie ! Redirection vers la connexion...");
        this.router.navigate(['/login']); // Automatise la redirection
      },
      error: (err) => {
        console.error(err);
        // Affiche l'erreur spécifique renvoyée par le backend si elle existe
        this.errorMessage = err.error?.detail || "Erreur lors de l'inscription";
      }
    });
  }
}