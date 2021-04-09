import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../crud.service';

export interface Farm {
  id?: string;
  _id? : string;
  address: string;
  name: string;
  city: string;
}


const farmsData: Farm[] = [
  {
    id: '1',
    address: 'Зеленоград, ул. Юности, 2',
    name: 'Ферма 1',
    city: "Владимир",
  }


];

@Component({
  selector: 'app-farm-table',
  templateUrl: './farm-table.component.html',
  styleUrls: ['./farm-table.component.css']
})
export class FarmTableComponent implements OnInit, AfterViewInit {
  public pages: Number = -1;
  public farms: Farm[] = [];

  constructor(private http: HttpClient, private router : Router, private route : ActivatedRoute, private crud : CrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.crud.getCollection<Farm>("/api/farm").subscribe((farms) => {
        this.farms = farms;
        this.refreshData();
      }
    );
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

  createFarm(){
    this.router.navigate(['edit',"new"],{
      queryParams:{"create":true},
      relativeTo: this.route
    })
  }
  updateFarm(id : string){
    this.router.navigate(['edit',id],{
      queryParams:{"create":false},
      relativeTo: this.route
    })
  }
  removeFarm(id: string) {
    if (confirm('Удалить?')) {
      this.http.delete('/api/farm/' + id).subscribe(response => {
        this.farms = this.farms.filter((farm: Farm) => {
          return farm.id != id;
        });
        this.refreshData();
      });

    }
  }
}
