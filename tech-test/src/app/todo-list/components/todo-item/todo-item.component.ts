import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { Todo } from '@todo-list-feature/models/todo-list.models';
import { TodoListStoreService } from '@todo-list-feature/services/todo-list-store.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() public todo: Todo;

  public isEditing: boolean = false;
  public labelControl: AbstractControl = new FormControl();

  constructor(private todoListStoreService: TodoListStoreService) {}

  public ngOnInit(): void {
    this.labelControl.setValue(this.todo.label);
  }

  public edit(): void {
    this.isEditing = false;
    const newLabel: string = this.labelControl.value;

    if (newLabel.trim().length === 0) {
      this.delete();
    } else if (newLabel !== this.todo.label) {
      this.todoListStoreService.updateTodo({ id: this.todo.id, label: newLabel });
    }
  }

  public complete(): void {
    this.todoListStoreService.completeTodo({ id: this.todo.id, done: !this.todo.done });
  }

  public delete(): void {
    this.todoListStoreService.deleteTodo(this.todo.id);
  }

  public initEditing(): void {
    this.isEditing = true;
  }

  public cancelEditing(): void {
    this.labelControl.setValue(this.todo.label);
    this.isEditing = false;
  }
}
