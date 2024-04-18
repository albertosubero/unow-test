import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesListComponent } from './employees-list.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesListComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('Mostrar tabla de listado de empleados', () => {
    const employeesTable = fixture.debugElement.query(By.css('table.table'))
    expect(employeesTable).toBeTruthy() //TODO: ✔
  });

  it('Abrir modal de creacion de empleados', () => {
    // open modal by button click
    const btnElement = fixture.debugElement.nativeElement.querySelector('#openCreateModal')
    btnElement.click()
    // check if modal is open
    let employeesModal = document.getElementsByClassName('modal-dialog')

    expect(employeesModal).toBeTruthy() //TODO: ✔
  });

  it('Abrir modal de edicion de empleado', () => {
    // open modal by button click
    const btnElement = fixture.debugElement.query(By.css('button.btn-outline-primary'))
    btnElement.nativeElement.click()
    // check if modal is open
    let employeesModal = document.getElementsByClassName('modal-dialog')

    expect(employeesModal).toBeTruthy() //TODO: ✔
  });

  it('Eliminar empleado', () => {
    // current employees length
    const employeesLength = component.employeesList.length
    // delete employee by button
    const btnElement = fixture.debugElement.query(By.css('button.btn-danger'))
    btnElement.nativeElement.click()

    expect(component.employeesList.length).toEqual(employeesLength - 1) //TODO: ✔
  });

  it('Mostrar alerta de listado de empleados vacio', () => {
    component.employeesList = []
    fixture.detectChanges()
    const employeesAlert = fixture.debugElement.query(By.css('div.alert'))
    expect(employeesAlert).toBeTruthy() //TODO: ✔
  });

  it('Crear nuevo empleado', () => {
    // current employees length
    const employeesLength = component.employeesList.length
    const role: 'ADMIN' | 'USER' = 'ADMIN'
    const newEmployee = {
      email: 'fernando-c@a.com',
      role: role,
      name: 'Fernando',
      lastName: 'Ramirez',
      dateOfbirth: {
        day: 25,
        month: 5,
        year: 1995
      },
      position: 'scrum master',
    }
    component.employeeModalType = 'ADD'

    component.employeeDataSubmit(newEmployee)

    expect(component.employeesList.length).toEqual(employeesLength + 1) //TODO: ✔
  });

  it('Editar empleado existente', () => {
    // current employee to edit
    const currentEmployee = component.employeesList[0]

    const editedEmployee = {
      email: currentEmployee.email,
      role: currentEmployee.role,
      name: 'Fernando',
      lastName: currentEmployee.lastName,
      dateOfbirth: currentEmployee.dateOfbirth,
      position: currentEmployee.position,
    }
    component.employeeModalType = 'EDIT'

    component.employeeDataSubmit(editedEmployee)

    expect(component.employeesList[0].name === 'Fernando').toBeTrue() //TODO: ✔
  });
});
