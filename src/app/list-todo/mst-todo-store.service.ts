import { Injectable } from '@angular/core';
import { types } from 'mobx-state-tree';

@Injectable({
  providedIn: 'root',
})
export class MstTodoStoreService {
  todo = types.model('todo', {
    id: types.optional(types.string, () =>
      Math.random()
        .toString(32)
        .slice(2)
    ),
    title: '',
    completed: false,
  });
  constructor() {}
}
