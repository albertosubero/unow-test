import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { employeesListDummyData } from '../../../../shared/dummyData/employees';
import { IEmployees } from '../../../../shared/interfaces/employees.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  employee!: IEmployees
  loginFormError: boolean = false
  loginFormSubmited: boolean = false

  constructor(private router: Router) {}

  login() {
    this.loginFormError = false
    this.loginFormSubmited = false
    // check if form is valid
    if (this.loginForm.valid) {
      // check if email is registered
      const employee = this.emailValidation(this.loginForm.value.email!)
      this.employee = employee[0]
      // if email is registered save user data in local storage go to employees view
      if (employee.length) {
        this.saveLoggedUserData(this.employee)
        this.router.navigateByUrl('/employees');
      } else {
        this.loginFormError = true
      }
    }

    this.loginFormSubmited = true
  }
  // Check if email is register
  emailValidation(email: string) {
    return employeesListDummyData.filter(it => {
      return it['email'].toLocaleLowerCase().includes(email.toLocaleLowerCase());
    });
  }
  // save logged user info in local storage
  saveLoggedUserData(employee: IEmployees) {
    localStorage.setItem('userRole', employee.role)
    localStorage.setItem('userEmail', employee.email)
  }
}
