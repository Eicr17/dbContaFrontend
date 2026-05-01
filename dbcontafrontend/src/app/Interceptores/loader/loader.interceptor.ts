import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../../Servicios/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderTracker = inject(LoaderService);

  loaderTracker.onRequestStart();

  return next(req).pipe(
    finalize(() => {
      loaderTracker.onRequestEnd();
    }
    ));

};
