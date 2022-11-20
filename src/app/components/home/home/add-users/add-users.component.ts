import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AppConstants } from 'src/app/core/app-constant';
import { MAGICNUMBER } from 'src/app/core/app-magic-string';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
})
export class AddUsersComponent implements OnInit, OnDestroy {
  addUserForm!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  userAddSubscription!: Subscription;
  userUpdateSubscription!: Subscription;
  constructor(private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly _ts: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(MAGICNUMBER.EIGHT), Validators.maxLength(MAGICNUMBER.FIFTEEN)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators]
    });

    if (!this.isAddMode) {
      this.getUserDetailsById();
    }
  }

  /**
   * Get Specific User Details
   */
  getUserDetailsById(): void {
    this.authService.getDetailsById(Number(this.id))
      .pipe(first())
      .subscribe((x: any) => this.addUserForm.patchValue(x));
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.addUserForm.controls; }


  /**
   * User Submit
   */
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  /**
   * create user
   */
  private createUser(): void {
    this.userAddSubscription = this.authService.setAddUserForm(this.addUserForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._ts.showSuccess(AppConstants.UserAddedSuccess);
          this.router.navigate(['/home/manage-users']);
        },
        error: error => {
          this._ts.showError(error);
          this.loading = false;
        }
      });
  }

  /**
   * update user
   */
  private updateUser(): void {
    this.userUpdateSubscription = this.authService.updateUserDetails(this.id, this.addUserForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this._ts.showSuccess(AppConstants.UserUpdatedSuccess);
          this.router.navigate(['/home/manage-users']);
        },
        error: (error: any) => {
          this._ts.showError(error);
          this.loading = false;
        }
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.userAddSubscription?.unsubscribe();
    this.userUpdateSubscription?.unsubscribe();
  }

}
