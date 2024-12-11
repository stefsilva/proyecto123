import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="patientForm" (ngSubmit)="onSubmit()" class="p-4 bg-white rounded shadow">
      <div class="mb-4">
        <label class="block mb-2">Nombre:</label>
        <input type="text" formControlName="firstName" class="w-full p-2 border rounded">
        <div *ngIf="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched" 
             class="text-red-500 mt-1">
          El nombre es obligatorio
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">Apellido:</label>
        <input type="text" formControlName="lastName" class="w-full p-2 border rounded">
        <div *ngIf="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched" 
             class="text-red-500 mt-1">
          El apellido es obligatorio
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">Fecha de Nacimiento:</label>
        <input type="date" formControlName="birthDate" class="w-full p-2 border rounded">
        <div *ngIf="patientForm.get('birthDate')?.errors?.['required'] && patientForm.get('birthDate')?.touched" 
             class="text-red-500 mt-1">
          La fecha de nacimiento es obligatoria
        </div>
        <div *ngIf="patientForm.get('birthDate')?.errors?.['underage'] && patientForm.get('birthDate')?.touched" 
             class="text-red-500 mt-1">
          El paciente debe ser mayor de edad
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">DNI:</label>
        <input type="text" formControlName="dni" class="w-full p-2 border rounded">
        <div *ngIf="patientForm.get('dni')?.errors?.['required'] && patientForm.get('dni')?.touched" 
             class="text-red-500 mt-1">
          El DNI es obligatorio
        </div>
        <div *ngIf="patientForm.get('dni')?.errors?.['pattern'] && patientForm.get('dni')?.touched" 
             class="text-red-500 mt-1">
          El DNI debe contener solo números
        </div>
      </div>

      <div class="mb-4">
        <label class="block mb-2">Correo Electrónico:</label>
        <input type="email" formControlName="email" class="w-full p-2 border rounded">
        <div *ngIf="patientForm.get('email')?.errors?.['required'] && patientForm.get('email')?.touched" 
             class="text-red-500 mt-1">
          El correo electrónico es obligatorio
        </div>
        <div *ngIf="patientForm.get('email')?.errors?.['email'] && patientForm.get('email')?.touched" 
             class="text-red-500 mt-1">
          El formato del correo electrónico no es válido
        </div>
      </div>

      <button type="submit" 
              [disabled]="patientForm.invalid" 
              class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300">
        Agregar Paciente
      </button>
    </form>
  `
})
export class PatientFormComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required, this.ageValidator]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ageValidator(control: any) {
    if (!control.value) return null;
    
    const birthDate = new Date(control.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge >= 18 ? null : { underage: true };
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.addPatient({
        ...this.patientForm.value,
        birthDate: new Date(this.patientForm.value.birthDate)
      });
      this.patientForm.reset();
    }
  }
}