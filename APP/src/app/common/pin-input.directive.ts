import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPinInput]',
})
export class PinInputDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any): void {
    const value = event.target.value;
    const newValue = value.replace(/\D/g, '').substring(0, 4); // Replace non-digit characters
    this.el.nativeElement.value = newValue;
  }
}


