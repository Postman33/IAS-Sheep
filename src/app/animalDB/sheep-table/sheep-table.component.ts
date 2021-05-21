import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Animal} from '../../interfaces/animal';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../journalDB/crud.service';
import {UtilsService} from '../../utils.service';
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SheepEditComponent} from "../sheep-edit/sheep-edit.component";




@Component({
  selector: 'app-sheep-table',
  templateUrl: './sheep-table.component.html',
  styleUrls: ['./sheep-table.component.css']
})
export class SheepTableComponent implements OnInit {
  public pages = -1;

  constructor(public dialog: MatDialog,
              private http: HttpClient, public route: ActivatedRoute, private router: Router, private crud: CrudService, public utilsService : UtilsService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public sheeps: Animal[] = [];
  public errorMsg : string;
  displayedColumns: string[] = ['registerno', 'chaban','otara', 'birthday', 'actions'];
  dataSource : MatTableDataSource<Animal>;

  ngOnInit(): void {
    this.crud.getCollection<Animal>("/api/sheep").subscribe( (animals: Animal[])=>{
      this.sheeps = animals; // Сохраняем информацию о всех овцах
      this.refreshData();
    }, (err)=>{
      this.errorMsg  = err || "Ошибка"
    })

  }
  // public getAnimals() : Observable<Animal[]>{
  //   return this.crud.getCollection<Animal>("/api/sheep");
  // }
  openDialog(id : string, create : string = 'false'): void {
    const dialogRef = this.dialog.open(SheepEditComponent, {
      height: '100%',
      width: '100%',
      data: {
        id: id,
        create: create
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result){return}
      this.crud.getCollection<Animal>("/api/sheep").subscribe( (animals: Animal[])=>{
        this.sheeps = animals; // Сохраняем информацию о всех овцах
        this.refreshData();
      }, (err)=>{
        this.errorMsg  = err || "Ошибка"
      })
    });
  }

  updateSheep(id) { // Вызывается кнопкой "Редактировать"
    // this.router.navigate(['edit',id],{
    //   queryParams:{"create":false},
    //   relativeTo: this.route
    // })
    this.openDialog(id);

  }

  removeSheep(id) { // Вызывается кнопкой "Удалить"
    if (confirm('Удалить?')) {
      this.http.delete('/api/sheep/' + id).subscribe(response => {
        this.sheeps = this.sheeps.filter((sheep: Animal) => {
          return sheep.id != id;
        });
        this.refreshData();
      });

    }
  }

  createSheep() { // Вызывается кнопкой "Добавить овцу"
    // this.router.navigate(['edit',"new"],{
    //   queryParams:{"create":true},
    //   relativeTo: this.route
    // })
    this.openDialog(null,"true");
  }
  refreshData() {
    this.dataSource = new MatTableDataSource(this.sheeps);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }




}
