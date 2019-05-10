import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo-store.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  constructor() {}

  @Input() todo: Todo;
  @Output() complete = new EventEmitter();

  ngOnInit() {}
}
