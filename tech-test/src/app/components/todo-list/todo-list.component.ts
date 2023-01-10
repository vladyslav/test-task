import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)' }))
      ]),

      transition(':leave', [animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))])
    ])
  ]
})
export class TodoListComponent {
  public todoTitle: string = '';
  public todos: Todo[] = [];

  constructor(public todoService: TodoService) {}

  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle);

    this.todoTitle = '';
  }
}
