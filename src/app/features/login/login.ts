import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // On importe les modules nécessaires pour le formulaire et les requêtes HTTP
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    // Appel à l'API de ton Backend Django
    this.http.post('http://127.0.0.1:8000/users/api/login/', loginData).subscribe({
      next: (res: any) => {
        console.log("Connexion réussie", res);
        
        // On stocke les informations importantes dans le navigateur
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);

        alert("Bienvenue, " + res.username + " !");
        
        // Redirection vers la page d'accueil ou dashboard
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Identifiants incorrects ou compte non approuvé.";
      }
    });
  }
}