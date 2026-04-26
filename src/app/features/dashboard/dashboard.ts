
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Ajoute ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { FormsModule } from '@angular/forms';
import { ConsultationService } from '../../core/services/consultation.service'; // 2. Importe le service de consultation

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
  
})
export class Dashboard implements OnInit {
  username: string | null = '';
  role: string | null = '';
  patientsCount: number = 0;
  patientsList: any[] = [];
  doctorsList:any[] = [];
  selectedPatientId: string = '';
  showModal: boolean = false;
  consultationsTodayCount: number = 0;
  consultationData = {
  patient_id: '',
  ordonnance: '',
  diagnostic: '',
  
};

  constructor(
    private router: Router,
    private patientService: PatientService,
    private cdr: ChangeDetectorRef,
    private consultationService: ConsultationService
  ) {}

  ngOnInit() {
    this.loadConsultationsCount();
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    
    // Sécurité : Si pas de token, on renvoie au login
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.role === 'doctor') {
      this.loadDoctorData();
    }
  }

loadDoctorData() {
  this.patientService.getDoctorPatients().subscribe({ 
    next: (data: any) => {
      console.log('Données reçues de Django :', data);
      if (data && data.results) {
        this.patientsList = data.results;
        this.patientsCount = data.count;
      } else if (Array.isArray(data)) {
       
        this.patientsList = data;
        this.patientsCount = data.length;
      }
      
      this.cdr.detectChanges(); 
    },
    error: (err: any) => {
      console.error('Erreur lors du chargement des patients', err);
    }
  });
}


  voirDossier(id: number) {
    this.router.navigate(['/patient-detail', id]);
  }
  ajouterConsultation(formData: any) {
  this.patientService.createConsultation(formData).subscribe({
    next: (res: any) => {
      console.log('Consultation enregistrée !');
      this.loadDoctorData(); // On rafraîchit la liste pour voir le nouveau patient
    },
    error: (err: any) => console.error(err)
  });
}


ouvrirModalConsultation() {
  console.log("Ouverture du formulaire de consultation");
  this.showModal = true;


}

fermerModal() {
  this.showModal = false;
}

// validerConsultation() {
//   console.log("Enregistrement de la consultation...");
//   this.showModal = false;
//   alert("La consultation a été enregistrée avec succès !");
  
// }
 

validerConsultation() {
  if (!this.selectedPatientId) {
    alert("Veuillez sélectionner un patient");
    return;
  }

  const payload = {
    patient_id: this.selectedPatientId,
    ordonnance: this.consultationData.ordonnance,
    diagnostic: this.consultationData.diagnostic
  };

  console.log("Envoi des données à Django...", payload);

  this.patientService.createConsultation(payload).subscribe({
    next: (res: any) => {
      alert("La consultation a été enregistrée avec succès !");
      this.showModal = false; // Ferme la modale
      
      // RÉACTUALISATION DYNAMIQUE
      this.loadConsultationsCount(); // Le compteur passe de 2 à 3
      this.loadDoctorData();         // La liste des patients se met à jour
      
      // Réinitialisation du formulaire
      this.consultationData = { patient_id: '', ordonnance: '', diagnostic: '' };
      this.selectedPatientId = '';
    },
    error: (err: any) => {
      console.error("Erreur lors de l'enregistrement", err);
      alert("Erreur : La consultation n'a pas pu être sauvée.");
    }
  });
}


// Dans ta classe DashboardComponent
//consultationsTodayCount: number = 0; // On commence à 0, pas à 6

// ngOnInit() {
//   this.loadConsultationsCount();
// }

loadConsultationsCount() {
  this.consultationService.getTodayCount().subscribe({
    next: (count: number) => {
      this.consultationsTodayCount = count;
    },
    error: (err: any) => {
      console.error('Erreur lors de la récupération du compteur', err);
      this.consultationsTodayCount = 0;
    }
  });
}
  showAppointmentModal: boolean = false;
  appointmentForm = {
  doctor_id: '',
  date: '',
  reason: ''
};

ouvrirModalRDV() {
  this.showAppointmentModal = true;
}

validerRDV() {
  this.patientService.createAppointment(this.appointmentForm).subscribe({
    next: (res) => {
      alert("Demande de rendez-vous envoyée !");
      this.showAppointmentModal = false;
      // Optionnel : recharger le compteur "RDV à venir"
    },
    error: (err) => console.error("Erreur RDV", err)
  });
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}