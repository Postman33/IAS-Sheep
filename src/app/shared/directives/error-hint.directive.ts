import {AfterViewInit, Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[red-hint]'
})
export class RedHintDirective implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement,'color','red')
  }

}

@Directive({
  selector: '[blue-hint]'
})
export class BlueHintDirective implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement,'color',"#338ec4")
  }

}

@Directive({
  selector: '[red-hint]'
})
export class ErrorHintDirective implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement,'color','red')
  }

}
