import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario valido', () => {
    let email = component.loginForm.controls['email']
    email.setValue('aa33@gmail.com')

    expect(component.loginForm.invalid).toBeFalse(); //TODO: ✔
  });

  it('Formulario email invalido', () => {
    let email = component.loginForm.controls['email']
    email.setValue('aa3gmail.com')

    expect(component.loginForm.get('email')?.errors?.['email']).toBeTrue(); //TODO: ✔
  });

  it('Formulario valido pero email no registrado', () => {
    let email = component.loginForm.controls['email']
    email.setValue('aa33@gmail.com')
    // Check if email is register
    const employee = component.emailValidation(component.loginForm.value.email!)

    expect(employee.length).toEqual(0); //TODO: ✔
  });

  it('Formulario valido con Login exitoso', () => {
    let email = component.loginForm.controls['email']
    email.setValue('alberto-c@a.com')
    // Check if email is register
    const employee = component.emailValidation(component.loginForm.value.email!)
    // Submit by button click
    const btnElement = fixture.debugElement.query(By.css('button.btn'))
    btnElement.nativeElement.click()

    expect(employee[0]).toEqual(component.employee); //TODO: ✔
  });
});
