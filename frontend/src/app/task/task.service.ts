import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDto } from './task-dto.model';
import { Task } from './task.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  createTask(TaskDto: TaskDto): void {
    this.http.post<TaskDto>(environment.apiUrl + '/task', TaskDto).subscribe()
  }

  updateTaskStatus(taskDto: TaskDto): void {
    this.http.post<TaskDto>(environment.apiUrl + '/task/status', taskDto, { headers: { 'Content-Type': 'application/json' } }).subscribe()
  }
}
