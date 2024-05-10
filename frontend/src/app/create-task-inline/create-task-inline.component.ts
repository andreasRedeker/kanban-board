import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDto } from '../task/task-dto.model';
import { TaskService } from '../task/task.service';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-task-inline',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task-inline.component.html',
  styleUrl: './create-task-inline.component.css'
})
export class CreateTaskInlineComponent {
  private destroyRef = inject(DestroyRef);

  @Input() collectionId: number | undefined = undefined;

  @Output() newTaskEvent = new EventEmitter<void>()

  newTaskName: string = '';

  constructor(private taskService: TaskService) {
  }

  createTask() {
    if (this.newTaskName.length > 0 && this.collectionId) {
      let taskDto = new TaskDto(this.newTaskName, '', this.collectionId);
      this.taskService.createTask(taskDto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.newTaskName = ''
        this.newTaskEvent.emit()
      })
    }
  }
}
