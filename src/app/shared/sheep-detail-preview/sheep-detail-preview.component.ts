import {Component, Input, OnInit} from '@angular/core';
import {Animal} from '../../interfaces/animal';

@Component({
  selector: 'app-sheep-detail-preview',
  templateUrl: './sheep-detail-preview.component.html',
  styleUrls: ['./sheep-detail-preview.component.css']
})
export class SheepDetailPreviewComponent implements OnInit {
  @Input("animal") animal : Animal;
  constructor() { }

  ngOnInit(): void {
  }

}
