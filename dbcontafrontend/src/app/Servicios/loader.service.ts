import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private requestCount = 0;
  
  constructor(private loader: NgxUiLoaderService ) {   }

  onRequestStart() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loader.start();
    }
  }

  onRequestEnd() {
    if (this.requestCount > 0) {
      this.requestCount--;
      if (this.requestCount === 0) {
        this.loader.stop();
      }
    }
  }

}
