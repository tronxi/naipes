import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showError = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      user: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])

    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const user = this.loginForm.get('user').value;
    const pass = this.loginForm.get('password').value;
    this.userService.login(user, pass).subscribe(response => {
      this.showError = false;
      this.router.navigateByUrl('/game');
    }, error => {
      this.showError = true;
      console.log(error.status);
    });

  }

}
