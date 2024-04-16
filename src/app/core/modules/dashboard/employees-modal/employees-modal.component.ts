import { Component, ViewChild } from '@angular/core';
import { IModalConfig } from '../../../../shared/interfaces/modalConfig.interface';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees-modal',
  standalone: true,
  imports: [CustomModalComponent, NgbDatepickerModule, NgbAlertModule],
  templateUrl: './employees-modal.component.html',
  styleUrl: './employees-modal.component.scss'
})
export class EmployeesModalComponent {
  @ViewChild('modalComponent', { static: false }) modalComponent!: CustomModalComponent;

  employeesModalConfig: IModalConfig = {
    modalTitle: 'Crear nuevo empleado',
    closeButtonLabel: 'Guardar',
    onDismiss:() => console.log('Cancelado'),
    onClose: () => console.log('Guardado')
  };

  
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
}
