import { Component, Input } from '@angular/core';

import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() public todo: Todo;
  public isEditing: boolean = false;

  private cachedTodoLabel: string = '';

  constructor(private todoService: TodoService) {}

  public edit(todo: Todo): void {
    this.isEditing = false;

    if (todo.label.trim().length === 0) {
      this.delete(todo.id);
    } else {
      this.todoService.editTodo(todo);
    }
  }

  public complete(todo: Todo): void {
    this.todoService.completeTodo(todo);
  }

  public delete(id: number): void {
    this.todoService.deleteTodo(id);
  }

  public initEditing(todo: Todo): void {
    this.cachedTodoLabel = todo.label;
    this.isEditing = true;
  }

  public cancelEditing(todo: Todo): void {
    todo.label = this.cachedTodoLabel;
    this.isEditing = false;
  }
}
