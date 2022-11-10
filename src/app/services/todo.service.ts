import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url : string = 'https://todo-dcu6.onrender.com/api';

  constructor( private http : HttpClient ) { }

  getTasks() {
    return this.http.get<Todo[]>(`${this.url}/notas`);
  }

  createTask( task: Todo ) {
    return this.http.post(`${this.url}/notas`, task);
  }

  deleteTask( id: string ) {
    return this.http.delete(`${this.url}/notas/${id}`);
  }

  updateTask( task: Todo ) {
    if (task._id) {
      return this.http.put(`${this.url}/notas/${task._id}`, task);
    }
    return;
  }
}
