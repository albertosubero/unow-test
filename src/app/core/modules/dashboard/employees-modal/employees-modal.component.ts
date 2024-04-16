import { Component, ViewChild } from '@angular/core';
import { IModalConfig } from '../../../../shared/interfaces/modalConfig.interface';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule],
  templateUrl: './employees-modal.component.html',
  styleUrl: './employees-modal.component.scss'
})
export class EmployeesModalComponent {
  // Get CustomModalComponent
  @ViewChild('modalComponent', { static: false }) modalComponent!: CustomModalComponent;
  // Custom modal config
  employeesModalConfig: IModalConfig = {
    modalTitle: 'Crear nuevo empleado',
    showFooter: false,
    onDismiss:() => console.log('Cancelado'),
    onClose: () => console.log('Guardado'),
  };
  // employeeDataForm
  employeeDataForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfbirth: new FormControl('', Validators.required),
    position: new FormControl(0, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // open CustomModalComponent
  openModal(employeeModalType: 'ADD' | 'EDIT') {
    // Setup modalTitle by employeeModalType
    if (employeeModalType === 'ADD') {
      this.employeesModalConfig.modalTitle = 'Crear nuevo empleado'
    } else {
      this.employeesModalConfig.modalTitle = 'Editar empleado'
    }
    // Open employees modal
    this.modalComponent.open({size:'lg', backdrop: 'static'})
  }

  // Form submit
  onSubmit() {
    console.log(this.employeeDataForm.value)
  }
}
