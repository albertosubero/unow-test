import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesModalComponent } from './employees-modal.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

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
});
