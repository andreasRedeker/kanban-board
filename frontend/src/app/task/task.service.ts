import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { TaskDto } from './task-dto.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) { }

  createTask(taskDto: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(environment.apiUrl + '/task', taskDto, { headers: { 'Content-Type': 'application/json' } })
  }

  updateTaskStatus(taskDto: TaskDto): void {
    this.http.post<TaskDto>(environment.apiUrl + '/task/status', taskDto, { headers: { 'Content-Type': 'application/json' } })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/task', { params: { taskId }, headers: { 'Content-Type': 'application/json' } })
  }
}
