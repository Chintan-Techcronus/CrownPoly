import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message:any, title:any) {
    this.toastr.success(message, title, { positionClass: 'toast-top-right' })
  }

  showError(message:any, title:any) {
    this.toastr.error(message, title, { positionClass: 'toast-top-right' })
  }

  showInfo(message:any, title:any) {
    this.toastr.info(message, title, { positionClass: 'toast-top-right' })
  }

  showWarning(message:any, title:any) {
    this.toastr.warning(message, title, { positionClass: 'toast-top-right'})
  }
}
