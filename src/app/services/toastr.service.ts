import { Injectable } from '@angular/core';
import { ToastrService as TS } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private readonly ts: TS
  ) { }

  /**
   * @description show success toaster
   * @param msg toast message
   */
  showSuccess(msg: string) {
    this.ts.success(msg);
  }

  /**
   * @description show error toaster
   * @param msg toast message
   */
  showError(msg: string) {
    this.ts.error(msg);
  }

  /**
   * @description show warning toaster
   * @param msg toast message
   */
  showWarning(msg: string) {
    this.ts.warning(msg);
  }
}
