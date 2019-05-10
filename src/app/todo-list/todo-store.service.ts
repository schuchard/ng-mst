import { Injectable } from '@angular/core';
import { action, observable, computed } from 'mobx';

export class Todo {
  completed = false;
  title: string;

  constructor({ title, completed = false }) {
    this.completed = completed;
    this.title = title;
  }
}

export type TodosFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService {
  @observable todos$: Todo[] = [];
  @observable filter = 'SHOW_ALL';

  constructor() {}

  @action setFilter(filter: TodosFilter) {
    this.filter = filter;
  }

  @action async getTodos() {
    this.todos$ = await new Promise<Todo[]>(funStuff => {
      setTimeout(() => {
        funStuff([new Todo({ title: 'Learn Mobx' })]);
      }, 1000);
    });
  }

  @action addTodo({ title }: Partial<Todo>) {
    this.todos$ = [...this.todos$, new Todo({ title })];
  }

  @action removeTodo(todo: Todo) {
    this.todos$ = this.todos$.filter(currentTodo => currentTodo !== todo);
  }

  @action toggleComplete(todo: Todo) {
    this.todos$ = this.todos$.map(currentTodo => {
      if (currentTodo === todo) {
        return {
          ...currentTodo,
          completed: !currentTodo.completed,
        };
      }
      return currentTodo;
    });
  }

  @action checkAll() {
    this.todos$ = this.todos$.map(t => ({ ...t, completed: true }));
  }

  @action unCheckAll() {
    this.todos$ = this.todos$.map(t => ({ ...t, completed: false }));
  }

  @computed get filteredTodos() {
    switch (this.filter) {
      case 'SHOW_ALL':
        return this.todos$;
      case 'SHOW_COMPLETED':
        return this.todos$.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return this.todos$.filter(t => !t.completed);
    }
  }

  @computed get completedTodos() {
    return this.todos$.filter(t => t.completed);
  }
}
