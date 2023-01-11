import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { routes } from '@todo-list/todo-list.routes';
import { TodoListComponent, TodoItemComponent } from '@todo-list/components';

@NgModule({
  declarations: [TodoListComponent, TodoItemComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule.forChild(routes)],
  bootstrap: [TodoListComponent]
})
export class TodoListModule {}
