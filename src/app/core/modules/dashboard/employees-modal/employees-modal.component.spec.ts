import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesModalComponent } from './employees-modal.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('EmployeesModalComponent', () => {
  let component: EmployeesModalComponent;
  let fixture: ComponentFixture<EmployeesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesModalComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Modal en modo crear empleado', () => {
    component.openModal('ADD')
    expect(component.employeesModalConfig.modalTitle).toEqual('Crear nuevo empleado') //TODO: ✔
  });

  it('Modal en modo editar empleado', () => {
    component.employeeEditData =   {
      email: 'alberto-c@a.com',
      role: 'ADMIN',
      name: 'Alberto',
      lastName: 'Subero',
      dateOfbirth: {
        day: 22,
        month: 4,
        year: 1991
      },
      position: 'scrum master',
    }
    component.openModal('EDIT')
    expect(component.employeesModalConfig.modalTitle).toEqual('Editar empleado') //TODO: ✔
  });

  it('Formulario invalido', () => {
    component.employeeDataForm.patchValue({
      role: null,
      name: null,
      lastName: null,
      dateOfbirth: null,
      position: null,
      email: null
    });
    // Submit
    component.onSubmit()

    expect(component.employeeDataForm.invalid).toBeTrue(); //TODO: ✔
  });

  it('Formulario valido y empleado creado', () => {
    // fill employeeDataform
    component.employeeDataForm.patchValue({
      email: 'fernando-c@a.com',
      role: 'ADMIN',
      name: 'Fernando',
      lastName: 'Perez',
      dateOfbirth: {
        day: 25,
        month: 6,
        year: 1995
      },
      position: 'scrum master',
    });
    // Submit
    component.onSubmit()
    fixture.detectChanges()

    expect(component.employeeDataForm.valid).toBeTrue(); //TODO: ✔
  });
});
