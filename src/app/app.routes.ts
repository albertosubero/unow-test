import { Routes } from '@angular/router';
import { EmployeesListComponent } from './core/modules/dashboard/employees-list/employees-list.component';
import { LoginComponent } from './core/modules/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'employees',
    component: EmployeesListComponent
  }
];
