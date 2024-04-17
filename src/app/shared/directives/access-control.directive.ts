import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAccessControl]',
  standalone: true
})
export class AccessControlDirective {
  userRole!: string
  userEmail!: string
  @Input('displayMode') displayMode: string = 'block'
  @Input('email') email!: string

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.style.display = "none"
    this.checkRole()
  }

   checkRole() {
    // get role and email from localStorage
    this.userRole = localStorage.getItem('userRole')!
    this.userEmail = localStorage.getItem('userEmail')!
    // compare storage values
    this.elementRef.nativeElement.style.display = this.userRole === 'ADMIN' || this.userEmail === this.email ? this.displayMode : "none"
  }
}
