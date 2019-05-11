import { Component, OnInit } from '@angular/core';
import { fromMobx } from '../core/from-mobx.service';
import { MstTodosStoreService } from './mst-todos-store.service';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss'],
})
export class ListTodoComponent implements OnInit {
  todos$ = fromMobx(() => this.todos.todos.filteredTodos);
  constructor(private todos: MstTodosStoreService) {}

  ngOnInit() {}
}
