import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { IModalConfig } from '../../interfaces/modalConfig.interface';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss'
})
export class CustomModalComponent {
  @Input() 
  config!: IModalConfig;
  @ViewChild('modalTemplate') private modalTemplateRef!: TemplateRef<CustomModalComponent>;
  @ContentChild(TemplateRef) content!: TemplateRef<any>;
  private modalRef!: NgbModalRef
  
  constructor(private modalService: NgbModal) {}

  open(options?: NgbModalOptions): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalTemplateRef, options)
      this.modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
    if (this.config.shouldClose === undefined || (await this.config.shouldClose())) {
      const result = this.config.onClose === undefined || (await this.config.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.config.shouldDismiss === undefined || (await this.config.shouldDismiss())) {
      const result = this.config.onDismiss === undefined || (await this.config.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
