import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

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
  selector: '[hint]'
})
export class ErrorHintDirective implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  @Input("color") rgbCol;
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement,'color',this.rgbCol || 'red')
  }

}
