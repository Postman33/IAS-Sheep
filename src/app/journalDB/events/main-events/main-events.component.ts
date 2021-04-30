import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Animal} from '../../../interfaces/animal';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  public form: FormGroup;

  public animals : Animal[]= [];
  public events : any[]= [];
  public pages: Number = -1;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshData();
    this.form = new FormGroup({
      appraisal: new FormGroup({

      }),

      weighting: new FormGroup({
        date: new FormControl(new Date(Date.now()),[Validators.required]),
        weight: new FormControl(0,[Validators.required,Validators.pattern("^[0-9]+$")]),
        text: new FormControl("")
      })

    })
    console.log(this.form.get("weighting"));
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

  SubmitData() {
    console.log(this.form);
  }
}
