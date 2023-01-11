import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment';
import { TodoListApiService } from '@todo-list-feature/services/todo-list-api.service';

describe('TodoListApiService', () => {
  let service: TodoListApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListApiService]
    });

    service = TestBed.inject(TodoListApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be correctly injected', () => expect(service).toBeTruthy());

  it('getTodos() should return Todo[]', (done) => {
    service.getTodos().subscribe((result) => {
      expect(typeof result).toBe('object');
      expect(result).toEqual([]);
      done();
    });

    const req = httpTestingController.expectOne(environment.apiUrl);
    expect(req.request.method).toEqual('GET');

    req.flush([]);
    httpTestingController.verify();
  });

  it('createTodo() should return void', (done) => {
    service.createTodo('label').subscribe((result) => {
      expect(typeof result).toBeUndefined();
      expect(result).toBe(undefined);
    });
    done();

    const req = httpTestingController.expectOne(environment.apiUrl);

    expect(req.request.method).toEqual('POST');

    httpTestingController.verify();
  });

  it('updateTodo() should return void', (done) => {
    service.updateTodo({ id: 3, label: 'label' }).subscribe((result) => {
      expect(typeof result).toBeUndefined();
      expect(result).toBe(undefined);
    });
    done();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${3}`);

    expect(req.request.method).toEqual('PATCH');

    httpTestingController.verify();
  });

  it('completeTodo() should return void', (done) => {
    service.completeTodo({ id: 3, done: true }).subscribe((result) => {
      expect(typeof result).toBeUndefined();
      expect(result).toBe(undefined);
    });
    done();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${3}`);

    expect(req.request.method).toEqual('PATCH');

    httpTestingController.verify();
  });

  it('deleteTodo() should return void', (done) => {
    service.deleteTodo(3).subscribe((result) => {
      expect(typeof result).toBeUndefined();
      expect(result).toBe(undefined);
    });

    done();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/${3}`);

    expect(req.request.method).toEqual('DELETE');

    httpTestingController.verify();
  });
});
