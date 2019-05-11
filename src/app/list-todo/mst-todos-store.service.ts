import { Injectable } from '@angular/core';
import { types, flow } from 'mobx-state-tree';
import { TodosFilter, Todo } from '../todo-list/todo-store.service';
import { MstTodoStoreService } from './mst-todo-store.service';

@Injectable({
  providedIn: 'root',
})
export class MstTodosStoreService {
  todos = types
    .model('todos', {
      todos: types.optional(types.array(this.todoStore.todo), []),
      filter: types.union(
        types.literal('SHOW_ALL'),
        types.literal('SHOW_COMPLETED'),
        types.literal('SHOW_ACTIVE')
      ),
    })
    .actions(self => ({
      setFilter(filter: TodosFilter) {
        self.filter = filter;
      },
      getTodos: flow(function* getTodos() {
        self.todos = yield new Promise<Todo[]>(funStuff => {
          setTimeout(() => {
            funStuff([new Todo({ title: 'Learn Mobx' })]);
          }, 1000);
        });
      }),
      addTodo({ title }: Partial<Todo>) {
        // self.todos = [this.todoStore]
      },
      removeTodo(todo: Todo) {
        self.todos = self.todos.filter(currentTodo => currentTodo !== todo);
      },
      toggleComplete(todo: Todo) {
        this.todos = this.todos.map(currentTodo => {
          if (currentTodo === todo) {
            return {
              ...currentTodo,
              completed: !currentTodo.completed,
            };
          }
          return currentTodo;
        });
      },
      checkAll() {
        self.todos = self.todos.map(t => ({ ...t, completed: true }));
      },
      unCheckAll() {
        self.todos = self.todos.map(t => ({ ...t, completed: false }));
      },
    }))
    .views(self => ({
      get filteredTodos() {
        switch (self.filter) {
          case 'SHOW_ALL':
            return self.todos;
          case 'SHOW_COMPLETED':
            return self.todos.filter(t => t.completed);
          case 'SHOW_ACTIVE':
            return self.todos.filter(t => !t.completed);
        }
      },
      get completedTodos() {
        return self.todos.filter(t => t.completed);
      },
    }))
    .create();

  constructor(private todoStore: MstTodoStoreService) {}
}
