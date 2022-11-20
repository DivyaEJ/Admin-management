import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/core/app-constant';
import { MAGICNUMBER } from 'src/app/core/app-magic-string';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit,OnDestroy {
  form!: FormGroup;
  submitted = false;
  loading = false;
  registerSubscribe!: Subscription;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly router: Router,
    private readonly _ts: ToastrService
  ) {}

  ngOnInit() {
    this.initRegisterForm();
  }

  /**
   * Create Register form
   */
  initRegisterForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
  get f(): any {
    return this.form.controls;
  }

  /**
   * Register Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.registerSubscribe = this._authService
      .register(this.form.value)
      .subscribe({
        next: () => {
          this._ts.showSuccess(AppConstants.RegisterSuccess);
          this.router.navigate(['/auth/login']);
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
  ngOnDestroy(): void {
    this.registerSubscribe?.unsubscribe();
  }
}
