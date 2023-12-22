import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './features/todos/todo-list/todo-list.component';
import { TodoManageComponent } from './features/todos/todo-manage/todo-manage.component';

const routes: Routes = [
  {
    path: 'list',
    component: TodoListComponent
  },
  {
    path: 'manage',
    component: TodoManageComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
