import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IModalConfig } from '../../../../shared/interfaces/modalConfig.interface';
import { CustomModalComponent } from '../../../../shared/components/custom-modal/custom-modal.component';
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PositionsService } from '../../../../shared/services/positions/positions.service';
import { IEmployees } from '../../../../shared/interfaces/employees.interface';
import { AccessControlDirective } from '../../../../shared/directives/access-control.directive';

@Component({
  selector: 'app-employees-modal',
  standalone: true,
  imports: [CustomModalComponent, FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule, AccessControlDirective],
  providers: [PositionsService],
  templateUrl: './employees-modal.component.html',
  styleUrl: './employees-modal.component.scss'
})
export class EmployeesModalComponent {
  @Output() employeeDataSubmit = new EventEmitter()
  @Output() removeEmployee = new EventEmitter()
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
    role: new FormControl('USER'),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfbirth: new FormControl({}, Validators.required),
    position: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  employeePosition: string[] = []
  employeeEditData!: IEmployees
  employeeModalType!: 'ADD' | 'EDIT'

  constructor(private positionsService: PositionsService) {}

  ngOnInit() {
    // Get positions array for select input
    this.getPositions()
  }

  // open CustomModalComponent
  openModal(employeeModalType: 'ADD' | 'EDIT') {
    // Setup modalTitle by employeeModalType
    this.employeeModalType = employeeModalType
    if (employeeModalType === 'ADD') {
      this.employeesModalConfig.modalTitle = 'Crear nuevo empleado'
      this.employeeDataForm.reset()
    } else {
      this.employeesModalConfig.modalTitle = 'Editar empleado'
      this.patchFormData()
    }
    // Open employees modal
    this.modalComponent.open({size:'lg', backdrop: 'static'})
  }
  // Close CustomModalComponent
  closeModal() {
    this.modalComponent.close()
  }
  // Form submit
  onSubmit() {
    const employee = this.employeeDataForm.value
    this.employeeDataSubmit.emit(employee)
    this.closeModal()
  }

  // Remove employee from company
  deleteEmployee() {
    this.removeEmployee.emit(this.employeeDataForm.value.email)
    this.closeModal()
  }

  // Get positions array
  getPositions() {
    this.positionsService.getPositions()
    .subscribe({
      next: (res) => {
        this.employeePosition = res.positions
      },
      error: (err) => {
        console.error(err.error)
      }
    });
  }

  // Patch employeeEditData to form
  patchFormData() {
    this.employeeDataForm.patchValue({
      role: this.employeeEditData.role,
      name: this.employeeEditData.name,
      lastName: this.employeeEditData.lastName,
      dateOfbirth: this.employeeEditData.dateOfbirth,
      position: this.employeeEditData.position,
      email: this.employeeEditData.email
    });
  }
}
