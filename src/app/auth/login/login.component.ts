import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public sending: boolean = false;
  public SuccessInfo : string = ''

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }


  OnSubmit() {
    this.sending = true;
    this.authService.Login({email: this.form.value.email, password: this.form.value.password}).subscribe((response) => {
      console.log(response);
      this.SuccessInfo = response.message;
      this.sending = false;
      this.router.navigate(["/"])
      console.log("Testing");
      localStorage.setItem("token_name",response.token);
      localStorage.setItem("token_exp",new Date(+(response.expiresIn) * 1000 + new Date().getTime()).toString());
    }, (response) => {
      this.sending = false;

    });


  }
}
