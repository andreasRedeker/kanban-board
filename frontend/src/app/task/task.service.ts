import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskDto } from './task-dto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  createTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(environment.apiUrl + '/task', taskDto, { headers: { 'Content-Type': 'application/json' } })
  }

  updateTaskStatus(taskDto: TaskDto): void {
    this.http.post<TaskDto>(environment.apiUrl + '/task/status', taskDto, { headers: { 'Content-Type': 'application/json' } }).subscribe()
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/task', { params: { taskId }, headers: { 'Content-Type': 'application/json' } })
  }
}
