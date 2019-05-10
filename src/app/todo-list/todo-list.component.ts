import { Component, OnInit } from '@angular/core';
import { TodoStoreService, Todo, TodosFilter } from './todo-store.service';
import { Observable } from 'rxjs';
import { FromMobxService } from '../core/from-mobx.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Observable<Todo[]>;

  constructor(private todoStore: TodoStoreService, private fmx: FromMobxService) {}

  ngOnInit() {
    this.todoStore.getTodos();
    this.todos = this.fmx.fromMobx(() => this.todoStore.filteredTodos);
  }

  addTodo() {
    this.todoStore.addTodo({ title: `Todo ${this.makeId()}` });
  }

  complete(todo: Todo) {
    this.todoStore.toggleComplete(todo);
  }

  setFilter(filter: TodosFilter) {
    this.todoStore.setFilter(filter);
  }

  checkAll() {
    this.todoStore.checkAll();
  }

  unCheckAll() {
    this.todoStore.unCheckAll();
  }

  private makeId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
