import { Component, ViewChild } from '@angular/core';
import { IEmployees } from '../../../../shared/interfaces/employees.interface';
import { SearchFilterPipe } from '../../../../shared/pipes/search-filter/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';
import { EmployeesModalComponent } from '../employees-modal/employees-modal.component';
import { DateFormatPipe } from '../../../../shared/pipes/date-format/date-format.pipe';
import { AccessControlDirective } from '../../../../shared/directives/access-control.directive';
import { ConfirmDeleteEmployeeModalComponent } from '../../../../shared/components/confirm-delete-employee-modal/confirm-delete-employee-modal.component';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [FormsModule, SearchFilterPipe, EmployeesModalComponent, DateFormatPipe, AccessControlDirective, ConfirmDeleteEmployeeModalComponent],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  @ViewChild('employeesModalComponent', { static: false }) employeesModalComponent!: EmployeesModalComponent;
  @ViewChild('confirmDeleteEmployeeModalComponent', { static: false }) confirmDeleteEmployeeModalComponent!: ConfirmDeleteEmployeeModalComponent;

  searchKeyword: string = ''
  employeesList: IEmployees[] = employeesListDummyData
  employeeEditData!: IEmployees
  employeeModalType!: 'ADD' | 'EDIT'

  ngOnInit() {
    this.resolveEmployeesStorage()
  }

  resolveEmployeesStorage() {
    // get storaged employeesList
    const employeesListStorage = JSON.parse(localStorage.getItem('employeesList')!)
    // resolve employeesListStorage
    if (employeesListStorage?.length === 0 || !employeesListStorage) {
      // save dummyData in localStorage
      this.saveEmployeesStorage(this.employeesList)
    } else {
      // save employeesListStorage
      this.employeesList = employeesListStorage
    }
  }

  saveEmployeesStorage(employees: IEmployees[]) {
    localStorage.setItem('employeesList', JSON.stringify(employees))
  }

  openModal(employeeModalType: 'ADD' | 'EDIT') {
    this.employeeModalType = employeeModalType
    // Open employees modal
    if (employeeModalType === 'EDIT') {
      this.employeesModalComponent.employeeEditData = this.employeeEditData
    }
    this.employeesModalComponent.openModal(this.employeeModalType)
  }

  openConfirmModal(employee: IEmployees) {
    this.confirmDeleteEmployeeModalComponent.employee = employee
    this.confirmDeleteEmployeeModalComponent.openModal()
  }

  employeeDataSubmit(employee: IEmployees) {
    if (this.employeeModalType === 'ADD') {
      this.employeesList.push(employee)
    } else {
      const currentEmployeeIndex = this.employeesList.findIndex((empl) => empl.email === employee.email)
      this.employeesList[currentEmployeeIndex] = employee
    }
    // save employeesListStorage
    this.saveEmployeesStorage(this.employeesList)
  }

  deleteEmployee(employeeEmail: string | Event) {
    const employeeToDeleteIndex = this.employeesList.findIndex((empl) => empl.email === employeeEmail)
    this.employeesList = this.employeesList.filter(item => item !== this.employeesList[employeeToDeleteIndex])
    // save employeesListStorage
    this.saveEmployeesStorage(this.employeesList)
  }
}
