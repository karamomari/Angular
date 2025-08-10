import { HttpInterceptorFn } from '@angular/common/http';

export const athInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const cloned = req.clone({
    setHeaders: {
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return next(cloned);
};
