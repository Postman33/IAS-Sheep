import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Chaban} from '../../interfaces/chaban';
import {Animal} from '../../interfaces/animal';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../journalDB/crud.service';
import {UtilsService} from '../../utils.service';


export interface AnimalElement {
  RegisterNo?: Number;
  chaban?: Chaban; // Чабан
  Birthday?: Date | string;
  Purpose?: string; // Назначение
}



@Component({
  selector: 'app-sheep-table',
  templateUrl: './sheep-table.component.html',
  styleUrls: ['./sheep-table.component.css']
})
export class SheepTableComponent implements OnInit {
  public pages = -1;

  constructor(private http: HttpClient, public route: ActivatedRoute, private router: Router, private crud: CrudService, public utilsService : UtilsService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public sheeps: Animal[] = [];
  displayedColumns: string[] = ['registerno', 'chaban','otara', 'birthday', 'actions'];
  dataSource : MatTableDataSource<Animal>;

  ngOnInit(): void {
    this.crud.getCollection<Animal>("/api/sheep").subscribe( (animals: Animal[])=>{
      this.sheeps = animals;
      this.refreshData();
    })

  }
  updateSheep(id) {
    this.router.navigate(['edit',id],{
      queryParams:{"create":false},
      relativeTo: this.route
    })
  }

  removeSheep(id) {
    if (confirm('Удалить?')) {
      this.http.delete('/api/sheep/' + id).subscribe(response => {
        this.sheeps = this.sheeps.filter((sheep: Animal) => {
          return sheep.id != id;
        });
        this.refreshData();
      });

    }
  }

  createSheep() {
    this.router.navigate(['edit',"new"],{
      queryParams:{"create":true},
      relativeTo: this.route
    })
  }
  refreshData() {
    this.dataSource = new MatTableDataSource(this.sheeps);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }




}
