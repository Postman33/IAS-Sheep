import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Animal} from '../../../interfaces/animal';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-main-events',
  templateUrl: './main-events.component.html',
  styleUrls: ['./main-events.component.css']
})
export class MainEventsComponent implements OnInit,AfterViewInit {
  eventTypes = [
    {name: "Бонитировка", type: "appraisal", icon: "login"},
    {name: "Взвешивание", type: "weighting"}
  ];
  public frame = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public animals : Animal[]= [];
  public events : any[]= [];
  public pages: Number = -1;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshData();
  }

  displayedColumns: string[] = ['1', '2', '3','4'];
  dataSource = new MatTableDataSource(this.events);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.animals);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '750px',
      height: "750px",
      data: {name: "", animals: this.animals}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

    });
  }


  updatePageData($event: PageEvent) {

  }
}
