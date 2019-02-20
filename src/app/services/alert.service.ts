import { Injectable } from '@angular/core';
import * as swal from 'sweetalert';

@Injectable()
export class AlertService {
  success(title: string, message: string, timer?: number): Promise<any> {
    return swal({
      title: title,
      text: message,
      icon: "success",
      timer: timer ? timer : 0
    });
  }

  error(title: string, message: string): Promise<any> {
    return swal(title, message, "error");
  }

  confirm(title: string, message: string): Promise<boolean> {
    return swal({
      title: title,
      text: message,
      icon: "warning",
      buttons: ['Cancelar', true],
      dangerMode: true
    });
  }
}
