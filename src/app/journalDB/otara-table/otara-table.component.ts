import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Farm} from '../../interfaces/farm';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../crud.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-otara-table',
  templateUrl: './otara-table.component.html',
  styleUrls: ['./otara-table.component.css']
})
export class OtaraTableComponent implements OnInit,AfterViewInit {

  public pages: Number = -1;
  public farms: Farm[] = [];

  constructor(private http: HttpClient, private router : Router, private route : ActivatedRoute, private crud : CrudService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.crud.getCollection<Farm>("/api/otara").subscribe((farms) => {
        this.farms = farms;
        this.refreshData();
      }
    );
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
      this.http.delete('/api/otara/' + id).subscribe(response => {
        this.farms = this.farms.filter((farm: Farm) => {
          return farm.id != id;
        });
        this.refreshData();
      });

    }
  }
}
