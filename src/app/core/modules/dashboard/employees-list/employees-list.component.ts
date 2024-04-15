import { Component } from '@angular/core';
import { EmployeesI } from '../../../../shared/interfaces/employees.interface';
import { SearchFilterPipe } from '../../../../shared/pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [FormsModule, SearchFilterPipe],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  searchKeyword: string = ''
  employeesList: EmployeesI[] = employeesListDummyData

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
}
