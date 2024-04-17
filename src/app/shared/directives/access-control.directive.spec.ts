import { ElementRef } from '@angular/core';
import { AccessControlDirective } from './access-control.directive';
import { inject } from '@angular/core/testing';

describe('AccessControlDirective', () => {
  it('should create an instance', () => {
    inject([ElementRef], (elementRef: ElementRef) => {
      const directive = new AccessControlDirective(elementRef);
      expect(directive).toBeTruthy();
    });
  });
});