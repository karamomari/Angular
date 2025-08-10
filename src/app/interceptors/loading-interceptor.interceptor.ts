// loading-interceptor.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingServiceService } from '../services/loading-service.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingServiceService);
  loading.show();

  return next(req).pipe(
    finalize(() => loading.hide())
  );
};
