import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./todo-list/todo-list.module').then((m) => m.TodoListModule),
    data: { preload: true, delay: false, title: 'Todo List' }
  }
];
