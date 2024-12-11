import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div *ngFor="let patient of patients$ | async" 
           [class]="isElderly(patient) ? 'border-2 border-red-500' : ''"
           class="p-4 bg-white rounded shadow">
        <h3 class="text-lg font-bold">{{ patient.firstName }} {{ patient.lastName }}</h3>
        <p>Fecha de Nacimiento: {{ patient.birthDate | date:'dd/MM/yyyy' }}</p>
        <p>DNI: {{ patient.dni }}</p>
        <p>Correo: {{ patient.email }}</p>
        <button (click)="removePatient(patient.id)" 
                class="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Eliminar
        </button>
      </div>
      <div *ngIf="(patients$ | async)?.length === 0" class="col-span-full text-center p-4">
        No hay pacientes registrados
      </div>
    </div>
  `
})
export class PatientListComponent {
  patients$ = this.patientService.getPatients();

  constructor(private patientService: PatientService) {}

  removePatient(id: string) {
    if (confirm('¿Está seguro que desea eliminar este paciente?')) {
      this.patientService.removePatient(id);
    }
  }

  isElderly(patient: Patient): boolean {
    const birthDate = new Date(patient.birthDate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge >= 60;
  }
}