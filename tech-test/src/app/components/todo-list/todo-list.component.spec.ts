import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from './todo-list.component';

const TodoServiceMock = {
  addTodo: () => {}
};

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TodoListComponent],
      providers: [{ provide: TodoService, useValue: TodoServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addTodo()', () => {
    it('should set todo.label to cachedTodoLabel', () => {
      // Arrange
      spyOn(todoService, 'addTodo');
      component.todoTitle = '';
      // Act
      component.addTodo();
      // Assert
      expect(todoService.addTodo).not.toHaveBeenCalled();
    });

    it('should call todoService.addTodo()', () => {
      // Arrange
      spyOn(todoService, 'addTodo');
      component.todoTitle = '333';
      // Act
      component.addTodo();
      // Assert
      expect(todoService.addTodo).toHaveBeenCalledTimes(1);
      expect(todoService.addTodo).toHaveBeenCalledWith('333');
    });

    it('should set todoTitle to ""', () => {
      // Arrange
      component.todoTitle = '333';
      // Act
      component.addTodo();
      // Assert
      expect(component.todoTitle).toBe('');
    });
  });
});
