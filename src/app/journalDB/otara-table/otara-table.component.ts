import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Farm} from '../../interfaces/farm';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../crud.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {SheepEditComponent} from "../../animalDB/sheep-edit/sheep-edit.component";

@Component({
  selector: 'app-otara-table',
  templateUrl: './otara-table.component.html',
  styleUrls: ['./otara-table.component.css']
})
export class OtaraTableComponent implements OnInit, AfterViewInit {

  public pages: Number = -1;
  public farms: Farm[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private route: ActivatedRoute, private crud: CrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  openDialog(id: string, create: string = 'false'): void {
    const dialogRef = this.dialog.open(SheepEditComponent, {
      height: '100%',
      width: '100%',
      data: {
        id: id,
        create: create
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.fetchData();
    });
  }

  displayedColumns: string[] = ['regNo', 'name', 'actions'];
  dataSource = new MatTableDataSource(this.farms);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

  updatePageData($event: PageEvent) {

  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.farms);
    this.dataSource.paginator = this.paginator;
  }

  createFarm() {
    this.openDialog(null, "true")
  }

  updateFarm(id: string) {
    this.openDialog(id, "false")
  }

  removeFarm(id: string) {
    if (confirm('Удалить?')) {
      this.http.delete('/api/otara/' + id).subscribe(response => {
        this.farms = this.farms.filter((farm: Farm) => {
          return farm.id != id;
        });
        this.refreshData();
      });

    }
  }

  private fetchData() {
    this.crud.getCollection<Farm>("/api/otara").subscribe((farms) => {
        this.farms = farms;
        this.refreshData();
      }
    );
  }
}
