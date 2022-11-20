import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/core/app-constant';
import { MAGICNUMBER } from 'src/app/core/app-magic-string';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;
  loginSubscribe!:Subscription;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly router: Router,
    private readonly _ts: ToastrService
  ) {}

  ngOnInit(): void {
    this._createLoginForm();
  }

  /**
   * Create login form
   */
  private _createLoginForm() {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(MAGICNUMBER.EIGHT),
          Validators.maxLength(MAGICNUMBER.FIFTEEN),
        ],
      ],
    });
  }

 // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }


  /**
   * Login Submit.
   */
  onLoginSubmit() {
    this.submitted = true;
    this.loading = true;
   // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.loginSubscribe =this._authService.checkUserCredentials().subscribe({
      next: (res: any) => {
        const userExists = res.find((element: any) => {
          return (
            element.email === this.loginForm.value.email &&
            element.password === this.loginForm.value.password
          );
        });
        if (userExists) {
          this.loginForm.reset();
          localStorage.setItem('user', JSON.stringify(userExists));
          this.router.navigate(['/home/dashboard']);
          this._ts.showSuccess(AppConstants.LoginSuccess);
        } else {
          this.loading = false;
          this._ts.showError(AppConstants.LoginFailure);
        }
      },
      error: (error) => {
        this._ts.showError(error);
        this.loading = false;
      },
    });
  }

   /**
   * On Destroy.
   */
  ngOnDestroy() : void{
    this.loginSubscribe?.unsubscribe();
  }
}
