import { Component, ViewChild } from '@angular/core';
import { IEmployees } from '../../../../shared/interfaces/employees.interface';
import { SearchFilterPipe } from '../../../../shared/pipes/search-filter/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';
import { EmployeesModalComponent } from '../employees-modal/employees-modal.component';
import { DateFormatPipe } from '../../../../shared/pipes/date-format/date-format.pipe';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [FormsModule, SearchFilterPipe, EmployeesModalComponent, DateFormatPipe],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  @ViewChild('employeesModalComponent', { static: false }) employeesModalComponent!: EmployeesModalComponent;
  
  searchKeyword: string = ''
  employeesList: IEmployees[] = employeesListDummyData
  employeeEditData!: IEmployees
  employeeModalType!: 'ADD' | 'EDIT'

  ngOnInit() {
    this.resolveEmployeesStorage()
  }

  resolveEmployeesStorage() {
    // get storaged employeesList
    const employeesListStorage = localStorage.getItem('employeesList')
    // resolve employeesListStorage
    if (!employeesListStorage) {
      // save dummyData in localStorage
      localStorage.setItem('employeesList', JSON.stringify(this.employeesList))
    } else {
      // save employeesListStorage
      this.employeesList = JSON.parse(employeesListStorage)
    }
  }

  openModal(employeeModalType: 'ADD' | 'EDIT') {
    this.employeeModalType = employeeModalType
    // Open employees modal
    if (employeeModalType === 'EDIT') {
      this.employeesModalComponent.employeeEditData = this.employeeEditData
    }
    this.employeesModalComponent.openModal(this.employeeModalType)
  }

  employeeDataSubmit(employee: IEmployees) {
    if (this.employeeModalType === 'ADD') {
      this.employeesList.push(employee)
    } else {
      const currentEmployeeIndex = this.employeesList.findIndex((empl) => empl.email === employee.email)
      this.employeesList[currentEmployeeIndex] = employee
    }
    // save employeesListStorage
    localStorage.setItem('employeesList', JSON.stringify(this.employeesList))
  }
}
