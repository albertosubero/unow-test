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
    // Open employees modal
    this.employeesModalComponent.openModal(employeeModalType)
  }

  employeeDataSubmit(employee: IEmployees) {
    console.log("🚀 ~ EmployeesListComponent ~ employeeDataSubmit ~ employee:", employee)
    this.employeesList.push(employee)
    localStorage.setItem('employeesList', JSON.stringify(this.employeesList))
  }
}
