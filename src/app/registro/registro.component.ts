import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registerForm: FormGroup;

  private uniqueName = false;

  error = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      user: new FormControl('', {validators: [
        Validators.required
        ],
        updateOn: 'blur'}),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new FormControl('', {validators: [
        Validators.required
      ]}),
      secondPassword: new FormControl('', {validators: [
          Validators.required,
        ]}),

    },
      {validator: this.passwordMatchValidator}
    );
  }

  checkName(): void {
    this.userService.check(this.registerForm.get('user').value).subscribe(response => {
      console.log(response);
      this.uniqueName = false;
    }, error => {
      error.status === 404 ? this.uniqueName = true : this.uniqueName = false;
    });
  }

  passwordMatchValidator(g: FormGroup): { mismatch: true } {
    return g.get('password').value === g.get('secondPassword').value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const user = this.registerForm.get('user').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.userService.register(user, email, password).subscribe(response => {
      this.error = false;
      this.router.navigateByUrl('/login');
    }, error => {
      this.error = true;
    });
    console.log(this.registerForm.value);
  }

  isValid(): boolean {
    return this.registerForm.invalid || !this.uniqueName;
  }

  setInvalid(): void {
    this.uniqueName = false;
  }
}
