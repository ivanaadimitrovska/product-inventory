import { Observable } from 'rxjs';

declare module 'rxjs' {
  interface Observable<T> {
    // Add any custom operators or extensions here
  }
}

// Add any custom operators here
Observable.prototype.customOperator = function() {
  return this;
}; 