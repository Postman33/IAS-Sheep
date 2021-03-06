import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../crud.service';
import {Farm} from '../../interfaces/farm';
import {MatDialog} from "@angular/material/dialog";
import {FarmEditComponent} from "../farm-edit/farm-edit.component";


@Component({
  selector: 'app-farm-table',
  templateUrl: './farm-table.component.html',
  styleUrls: ['./farm-table.component.css']
})
export class FarmTableComponent implements OnInit, AfterViewInit {
  public pages: Number = -1;
  public farms: Farm[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private route: ActivatedRoute, private crud: CrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private fetchData() {
    this.crud.getCollection<Farm>("/api/farm").subscribe((farms) => {
        this.farms = farms;
        this.refreshData();
      }
    );
  }

  ngOnInit(): void {
    this.fetchData();
  }

  openDialog(id: string, create: string = 'false'): void {
    const dialogRef = this.dialog.open(FarmEditComponent, {
      height: '70%',
      width: '50%',
      data: {
        id: id,
        create: create
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.fetchData();
    });
  }

  displayedColumns: string[] = ['regNo', 'farmName', 'address', 'actions'];
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
    this.openDialog(null, "true");
  }

  updateFarm(id: string) {
    this.openDialog(id, "false");
  }

  removeFarm(id: string) {
    if (confirm('???????????????')) {
      this.http.delete('/api/farm/' + id).subscribe(response => {
        this.farms = this.farms.filter((farm: Farm) => {
          return farm.id != id;
        });
        this.refreshData();
      });

    }
  }
}
