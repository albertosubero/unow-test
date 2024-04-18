import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteEmployeeModalComponent } from './confirm-delete-employee-modal.component';

describe('ConfirmDeleteEmployeeModalComponent', () => {
  let component: ConfirmDeleteEmployeeModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteEmployeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteEmployeeModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
