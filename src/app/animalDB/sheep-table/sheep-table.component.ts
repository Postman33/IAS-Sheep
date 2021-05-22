import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Animal} from '../../interfaces/animal';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from '../../journalDB/crud.service';
import {UtilsService} from '../../utils.service';
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
              private http: HttpClient, public route: ActivatedRoute, private router: Router, private crud: CrudService,
              public utilsService: UtilsService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public sheeps: Animal[] = [];
  public errorMsg: string;
  displayedColumns: string[] = ['registerno', 'chaban', 'otara', 'birthday', 'actions'];
  dataSource: MatTableDataSource<Animal>;

  private fetchData(cb = null) {
    this.crud.getCollection<Animal>("/api/sheep").subscribe((animals: Animal[]) => {
      this.sheeps = animals; // Сохраняем информацию о всех овцах
      this.refreshData();
      cb();
    }, (err) => {
      this.errorMsg = err || "Ошибка"
    })
  }

  ngOnInit(): void {
    this.fetchData()

  }

  openDialog(id: string, create: string = 'false'): void {
    const dialogRef = this.dialog.open(SheepEditComponent, {
      height: '100%',
      width: '100%',
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
      this.fetchData()
    });
  }

  updateSheep(id) { // Вызывается кнопкой "Редактировать"
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
    this.openDialog(null, "true");
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.sheeps);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

}
