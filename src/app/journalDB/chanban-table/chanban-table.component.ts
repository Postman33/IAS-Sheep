import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {$e} from 'codelyzer/angular/styles/chars';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


import {CrudService} from '../crud.service';
import {Chaban} from '../../interfaces/chaban';
import {MatDialog} from "@angular/material/dialog";
import {SheepEditComponent} from "../../animalDB/sheep-edit/sheep-edit.component";
import {ChanbanEditComponent} from "../chanban-edit/chanban-edit.component";




const Chabans : Chaban[] = [
  {
    FIO: "Petrov Igor Valentinovic",
    birthday: new Date(Date.parse("11-10-2019")),
  }



]

@Component({
  selector: 'app-chanban-table',
  templateUrl: './chanban-table.component.html',
  styleUrls: ['./chanban-table.component.css']
})
export class ChanbanTableComponent implements OnInit,AfterViewInit {
  public pages: Number = -1;
  public chabans: Chaban[] = [];

  constructor(public dialog: MatDialog,private http: HttpClient, private router : Router, private route : ActivatedRoute, private crud : CrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.crud.getCollection<Chaban>('/api/chaban').subscribe((chabans) => {
        this.chabans = chabans;
        this.refreshData();
      }
    );
  }
  openDialog(id : string, create : string = 'false'): void {
    const dialogRef = this.dialog.open(ChanbanEditComponent, {
      height: '100%',
      width: '100%',
      data: {
        id: id,
        create: create
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result){return}
      this.crud.getCollection<Chaban>('/api/chaban').subscribe((chabans) => {
          this.chabans = chabans;
          this.refreshData();
        }
      );
    });
  }
  displayedColumns: string[] = ['regNo', 'fio', 'birthday', 'actions'];
  dataSource = new MatTableDataSource(this.chabans);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

  updatePageData($event: PageEvent) {

  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.chabans);
    this.dataSource.paginator = this.paginator;
  }

  createChaban(){
    this.openDialog(null,"true")
    // this.router.navigate(['edit',"new"],{
    //   queryParams:{"create":true},
    //   relativeTo: this.route
    // })
  }
  updateChaban(id : string){
    this.openDialog(id,"false")
    // this.router.navigate(['edit',id],{
    //   queryParams:{"create":false},
    //   relativeTo: this.route
    // })
  }
  removeChaban(id: string) {
    if (confirm('Удалить?')) {
      this.http.delete('/api/chaban/' + id).subscribe(response => {
        this.chabans = this.chabans.filter((chaban: Chaban) => {
          return chaban.id != id;
        });
        this.refreshData();
      });

    }
  }
}
