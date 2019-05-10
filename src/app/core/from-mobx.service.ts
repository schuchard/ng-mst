// https://github.com/NetanelBasal/ngx-mobx/blob/master/src/from-mobx.ts
import { Injectable } from '@angular/core';
import { computed } from 'mobx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FromMobxService {
  constructor() {}
fromMobx<T>(expression: () => T, invokeImmediately: boolean = true): Observable<T> {
    return new Observable((observer) => {
      const computedValue = computed(expression);
      const disposer = computedValue.observe((changes) => {
        observer.next(changes.newValue);
      }, invokeImmediately);

      return () => {
        disposer && disposer();
      };
    });
  }
}
