import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AppConstants } from 'src/app/core/app-constant';
import { AddUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  users: Array<AddUser> = [];
  usersListSubscription!: Subscription;
  deleteSubscription!: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly _ts: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsersList();
  }

  /**
   * Get all users list
   */
  getAllUsersList(): void {
    this.usersListSubscription = this.authService
      .manageUserList()
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.users = res;
        },
        error: (error) => {
          this._ts.showError(error);
        },
      });
  }

  /**
   * Delete user by id
   * @param id is selected id
   */
  deleteUser(id: string): void {
    this.deleteSubscription = this.authService
      .deleteUser(Number(id))
      .pipe(first())
      .subscribe(() => {
        this._ts.showSuccess(AppConstants.UserDeletedSuccess);
        this.users = this.users.filter((x) => x.id !== id);
      });
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.usersListSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}
