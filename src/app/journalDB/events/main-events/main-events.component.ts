import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Animal} from '../../../interfaces/animal';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {UtilsService} from '../../../utils.service';
import {EventInfo} from '../../../interfaces/event';
import {CrudService} from '../../crud.service';

@Component({
  selector: 'app-main-events',
  templateUrl: './main-events.component.html',
  styleUrls: ['./main-events.component.css']
})
export class MainEventsComponent implements OnInit, AfterViewInit {
  eventTypes = [
    {name: 'Бонитировка', type: 'appraisal', icon: 'login'},
    {name: 'Взвешивание', type: 'weighting'}
  ];
  public frame: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public form: FormGroup;
  public id: string = '';
  public animals: Animal[] = [];
  public events: EventInfo[] = [];
  public pages: number = -1;
  public pendingSave = false;
  public pendingLoadingId = false;

  constructor(public dialog: MatDialog, private http: HttpClient, private utils: UtilsService, private crud: CrudService) {
  }

  createForm() {
    this.form = new FormGroup({
      appraisal: new FormGroup({}),
      weighting: new FormGroup({
        date: new FormControl(new Date(Date.now()), [Validators.required]),
        weight: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
        text: new FormControl('')
      })
    });
  }

  ngOnInit(): void {
    this.refreshData();
    this.createForm();
    this.crud.getCollection<EventInfo>('/api/event').subscribe(result => {
      console.log('RESULT', result);
      this.events = result;
      this.refreshData();
    });

    console.log(this.form.get('weighting'));
  }

  displayedColumns: string[] = ['1', '2', '3', '4'];
  dataSource = new MatTableDataSource(this.events);

  applyFilter(value: any) {
    this.dataSource.filter = value.toLowerCase().trim();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.events);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '750px',
      height: '750px',
      data: {name: '', animals: this.animals}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animals = result;
      console.log('The dialog was closed');
    });

  }


  updatePageData($event: PageEvent) {

  }

  private convertToIds(collection): string[] {
    let ids = [];
    for (let ob of collection) {
      ids.push(ob._id || ob.id);
    }
    return ids;
  }

  SubmitData() {
    this.pendingSave = true;
    let sendObject = {
      animals: this.convertToIds(this.animals),
      eventName: this.frame,
      eventData: this.form.get(this.frame).value,
    };
    if (this.id === '') {
      this.http.post('/api/event', sendObject).subscribe(result => {
        console.log(result);
        this.pendingSave = false;
        this.utils.openSnackBar('Сохранено!', 'Успех');
      });
    } else {
      this.http.patch(`/api/event/${this.id}`, sendObject).subscribe(result => {
        console.log(result);
        this.pendingSave = false;
        this.utils.openSnackBar('Сохранено!', 'Успех');
      });
    }


  }

  loadEventData(id) {
    this.id = id;
    this.pendingLoadingId = true;
    this.http.get<EventInfo>(`/api/event/${id}`).subscribe(
      result => {
        this.frame = result.eventName;
        this.animals = result.animals;
        this.form.get(this.frame).patchValue({
          ...result.eventData
        });
        this.pendingLoadingId = false;

      }
    );

  }

  resetAll() {
    this.createForm();
    this.id = '';
    this.animals = [];
  }
}
