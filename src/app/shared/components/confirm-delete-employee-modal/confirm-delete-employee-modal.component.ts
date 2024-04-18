import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { IModalConfig } from '../../interfaces/modalConfig.interface';
import { IEmployees } from '../../interfaces/employees.interface';

@Component({
  selector: 'app-confirm-delete-employee-modal',
  standalone: true,
  imports: [CustomModalComponent],
  templateUrl: './confirm-delete-employee-modal.component.html',
  styleUrl: './confirm-delete-employee-modal.component.scss'
})
export class ConfirmDeleteEmployeeModalComponent {
  // Get CustomModalComponent
  @ViewChild('confirmDeleteEmployeeModal', { static: false }) confirmDeleteEmployeeModal!: CustomModalComponent;
  @Output() removeEmployee = new EventEmitter()

  employeesModalConfig: IModalConfig = {
    modalTitle: 'Eliminar empleado',
    onDismiss:() => console.log('Cancelado'),
    onClose: () => this.removeEmployee.emit(this.employee.email),
  };

  employee!: IEmployees

  // open CustomModalComponent
  openModal() {
    // Open modal
    this.confirmDeleteEmployeeModal.open({size:'lg', backdrop: 'static'})
  }
  // Close CustomModalComponent
  closeModal() {
    this.confirmDeleteEmployeeModal.close()
  }
}
