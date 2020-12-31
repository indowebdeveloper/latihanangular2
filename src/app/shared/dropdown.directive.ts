import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggle(eData: Event) {
    this.isOpen = this.elRef.nativeElement.contains(eData.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}
}
