import { Injectable, inject } from '@angular/core';
import { Environments } from '../config/app-configuration';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Todo } from '../models/todo';
import { Status } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private http: HttpClient = inject(HttpClient);
  readonly baseURL = Environments.DEV;

  /**
   * @description Gets the list of todos based on username only if the user exists, else a new user will be created. Use `admin` username for test data.
   * @param userName
   * @returns An Array of todo objects.
   */
  public getTodoList(userName: string): Observable<Todo[] | Error> {
    this.setUser(userName);
    const getTodosURL = `${this.baseURL}/myTodos?user=${userName}`;
    return this.http.get<Todo[]>(getTodosURL);
    // .pipe(map((response: Todo[]) => this.modifyResponse(response)))
  }

  /**
   * @description Adds the new todo to the existing todo list. If a duplicate todo is sent only the status gets updated.
   * @param todo
   * @returns An Array of todo objects.
   */
  public saveTodo(todo: Todo, userName: string): Observable<Todo[] | Error> {
    const saveTodoURL = `${this.baseURL}/myTodos?user=${userName}`;
    return this.http.post<Todo[]>(saveTodoURL, todo);
  }

  /**
   * @description This will modify the response into required format.
   * @returns Modified response.
   */
  private modifyResponse(response: Todo[]): Todo[] {
    return response.map(todos => {
      todos.status ? Status.DONE : Status.IN_PROGRESS;
      return todos;
    });
  }

  /**
   * @description Saves username to the session storage.
   * @param user
   */
  public setUser(user: string) {
    sessionStorage.setItem('username', user);
  }

  /**
   * @description Returns current username from the session storage.
   * @param user
   */
  public getUser(): string {
    return sessionStorage.getItem('username') ?? '';
  }
}
