import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { PatientFormComponent } from './app/components/patient-form/patient-form.component';
import { PatientListComponent } from './app/components/patient-list/patient-list.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PatientFormComponent, PatientListComponent],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Gestión de Pacientes</h1>
      <app-patient-form></app-patient-form>
      <app-patient-list></app-patient-list>
    </div>
  `
})
export class App {
  name = 'Patient Management System';
}

bootstrapApplication(App, {
  providers: [provideAnimations()]
});