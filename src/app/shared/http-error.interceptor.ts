import { Injectable } from '@angular/core';
// import { ErrorDialogService } from './errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
      public alertCtrl: AlertController,
      private loadingCtrl: LoadingController,
      private toast:ToastController,
      private storage:Storage,
      private router:Router
      ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                  // console.log('event--->>>', event);
                  
                  // this.errorDialogService.openDialog(event);
                  
              }
              return event;
          }),
          catchError( (error: HttpErrorResponse) => {
            this.loadingCtrl.dismiss()
              console.log('evemt ', event)
              if(error.status === 401 ) {
                this.openToast('UnAuthorized');
                this.storage.remove('PANDA_USER_INFO');
                this.router.navigate(['/login'])
              }
            return throwError(error); 
          }));
    }

    openToast(message:string): void {
      // this.dialog.open(ErrorViewComponent, {
      //   data: {title:title, message:message}
      // });
      this.toast.dismiss().then( () => {
        this.toast.create({
          message,
          position:'bottom',
          duration:2000
        }).then(toast => toast.present());
      }) 
    }
}
