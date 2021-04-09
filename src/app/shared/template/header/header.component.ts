import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {CrossVarService} from '../../services/cross-var.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService, private router : Router, private crossVarService:CrossVarService) {
  }
  ngOnInit(): void {
  }
  public bState: boolean = true;
  RedirectToMain($event: MouseEvent) {
    this.router.navigate(["/"])
  }
  toggle() {
    this.bState = !this.bState;
    this.crossVarService.triggerState$.next(this.bState)
  }
}
