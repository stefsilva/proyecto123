import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients = new BehaviorSubject<Patient[]>([]);

  getPatients(): Observable<Patient[]> {
    return this.patients.asObservable();
  }

  addPatient(patient: Patient): void {
    const currentPatients = this.patients.getValue();
    this.patients.next([...currentPatients, { ...patient, id: crypto.randomUUID() }]);
  }

  removePatient(id: string): void {
    const currentPatients = this.patients.getValue();
    this.patients.next(currentPatients.filter(patient => patient.id !== id));
  }
}