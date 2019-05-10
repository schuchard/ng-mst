// https://github.com/NetanelBasal/ngx-mobx/blob/master/src/from-mobx.ts
import { computed } from 'mobx';
import { Observable } from 'rxjs';

export function fromMobx<T>(expression: () => T, invokeImmediately: boolean = true): Observable<T> {
  return new Observable(observer => {
    const computedValue = computed(expression);
    const disposer = computedValue.observe(changes => {
      observer.next(changes.newValue);
    }, invokeImmediately);

    return () => {
      return disposer && disposer();
    };
  });
}
