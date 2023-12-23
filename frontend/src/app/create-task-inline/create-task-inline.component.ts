import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDto } from '../task/task-dto.model';
import { TaskService } from '../task/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task-inline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task-inline.component.html',
  styleUrl: './create-task-inline.component.css'
})
export class CreateTaskInlineComponent {

  @Input() collectionId: number | undefined = undefined;

  @Output() newTaskEvent = new EventEmitter<void>()

  newTaskName: string = '';

  constructor(private taskService: TaskService) {
  }

  createTask() {
    if (this.newTaskName.length > 0 && this.collectionId) {
      let taskDto = new TaskDto(this.newTaskName, '', this.collectionId);
      this.taskService.createTask(taskDto).subscribe(s => {
        this.newTaskName = ''
        this.newTaskEvent.emit()
      })
    }
  }
}
