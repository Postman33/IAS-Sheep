import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Animal} from '../../../interfaces/animal';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.form.get('chaban').disable()
    this.form.get('farm').disable()
  }
  public filter:  boolean = false;
  public form: FormGroup = new FormGroup({
    animal: new FormControl("",[Validators.required]),
    farm: new FormControl("",[Validators.required]),
    chaban: new FormControl("",[Validators.required]),
  })

  public animals: Animal[] = [];
  displayedColumns: string[] = ['1', '2', '3','4'];
  dataSource = new MatTableDataSource(this.animals);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }



  refreshData() {
    this.dataSource = new MatTableDataSource(this.animals);
    //this.dataSource.paginator = this.paginator;
  }

  typesAnimals: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];




}
