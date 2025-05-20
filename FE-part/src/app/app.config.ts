import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

// HTTP Interceptor to log requests and responses
const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('Request:', req.method, req.url);
  return next(req).pipe(
    tap({
      next: (response) => console.log('Response:', response),
      error: (error) => console.error('Error:', error)
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([loggingInterceptor])
    )
  ]
};
