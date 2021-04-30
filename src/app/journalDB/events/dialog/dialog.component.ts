import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Animal} from '../../../interfaces/animal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../utils.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private utils :UtilsService,  @Inject(MAT_DIALOG_DATA) public data: any) { }
  public animals: Animal[];
  public dataSource : MatTableDataSource<Animal>;
  ngOnInit(): void {
    this.form.get('chaban').disable()
    this.form.get('farm').disable()

    this.animals = this.data.animals;
    this.dataSource = new MatTableDataSource(this.animals);

  }
  public filter:  boolean = false;
  public form: FormGroup = new FormGroup({
    animal: new FormControl("",[Validators.required]),
    farm: new FormControl("",[Validators.required]),
    chaban: new FormControl("",[Validators.required]),
  })


  displayedColumns: string[] = ['1', '2', '3','4'];

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }


  addData(value: Animal) {
   if (!value.id) {
     this.utils.openSnackBar("Элемент не выбран или не существует!","Ошибка")
     return;
   }
    let cont = true;
    for(let i =0;i<this.animals.length; i++){
      if (value.id === this.animals[i].id){
        cont = false;
      }
    }
    if (cont){    this.animals.push( value );
      this.refreshData();}
    else {
      this.utils.openSnackBar("Нельзя добавить повторяющийся эелемент!","Ошибка")
    }

  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.animals);
    //this.dataSource.paginator = this.paginator;
  }

  typesAnimals: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  addAnimalByChip(value: Animal) {

    this.addData( value );
  }

  RemoveSheep(id) {

    this.animals = this.animals.filter( item => {
      return item.id != id;
    });
    this.refreshData();
    console.log(this.animals);
  }
}
