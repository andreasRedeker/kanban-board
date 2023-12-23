import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';
import { TaskDto } from './task-dto.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: Task = new Task()

  // TODO
  taskDto: TaskDto = new TaskDto('','',1)

  constructor(private taskService: TaskService) {}

  onSubmit() {
    this.taskDto.collectionId = 4;
    this.taskService.createTask(this.taskDto)
  }
}
