import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';
import { IEmployees } from '../../../../shared/interfaces/employees.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      const employee = this.emailValidation(this.loginForm.value.email!)
      if (employee.length) {
        this.saveLoggedUserData(employee[0])
        this.router.navigateByUrl('/employees');
      }
    }
  }
  // Check if email is register
  emailValidation(email: string) {
    return employeesListDummyData.filter(it => {
      return it['email'].toLocaleLowerCase().includes(email.toLocaleLowerCase());
    });
  }

  saveLoggedUserData(employee: IEmployees) {
    localStorage.setItem('userRole', employee.role)
    localStorage.setItem('userEmail', employee.email)
  }
}
