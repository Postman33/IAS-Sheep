import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public sending: boolean = false;
    public SuccessInfo : string = ''
  public errorMsg : string;
  constructor(private http: HttpClient, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
    });
  }


  OnSubmit() {
    this.sending = true;
    this.authService.Register({email: this.form.value.email, password: this.form.value.password}).subscribe((response) => {
     this.SuccessInfo = response.message;
      this.sending = false;
    }, (response) => {
      this.sending = false;
      console.log("RESPONSE")
      console.log(response)
      this.errorMsg=response
    });


  }
}
