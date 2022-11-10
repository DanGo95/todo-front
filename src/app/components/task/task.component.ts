import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks !: Todo[];
  updateRow : any;
  edit = false;

  @ViewChild('task') task!: ElementRef;

  constructor( private todoService : TodoService, private auth: AuthService ) {
    this.getTasks();
  }

  ngOnInit(): void {
  }

  private clearInput() {
    this.task.nativeElement.value = '';
  }

  getTasks() {
    this.todoService.getTasks().subscribe( tasks => {
      this.tasks = tasks;
    })
  }

  createTask(descripcion: string) {
    var newTask = new Todo();
    newTask = { descripcion, estado: false }
    this.todoService.createTask(newTask).subscribe( msg => {
      this.clearInput();
      this.getTasks();
    });
  }

  deleteTask(id?: string) {
    if (id) {
      this.todoService.deleteTask(id).subscribe( msg => {
        this.getTasks();
      })
    }
  }

  updateStatus(task: Todo) {
    var newTask = task;
    newTask.estado = !newTask.estado;
    this.todoService.updateTask(newTask)?.subscribe( msg => {
      this.getTasks();
    })
  }

  updateTask(task: Todo, name: string){
    this.saveRow();
    task.descripcion = name
    this.todoService.updateTask(task)?.subscribe( msg => {
      this.getTasks();
    })
  }

  // set updateRow to the id
  editRow(id?: string) {
    if (id) {
      this.updateRow = id;
      this.edit = true;
    }
  }

  // set updateRow to 0
  saveRow() {
    this.edit = false;
    this.updateRow = 0;
  }

  salir() {
    this.auth.logout();
  }


}
