import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ListTodoComponent } from './list-todo/list-todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
  // {
  //   path: 'mst',
  //   component: ListTodoComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
