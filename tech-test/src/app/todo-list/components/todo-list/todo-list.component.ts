import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '@store/features/todo-list/models/todo-list.models';
import { TodoListStoreService } from '@store/features/todo-list/services/todo-list-store.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  public todoTitle: string = '';

  public todos$: Observable<Todo[]> = this.todoListStoreService.selectTodos();

  constructor(public todoListStoreService: TodoListStoreService) {}

  public ngOnInit(): void {
    this.todoListStoreService.getTodos();
  }

  public createTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoListStoreService.createTodo(this.todoTitle);

    this.todoTitle = '';
  }
}
