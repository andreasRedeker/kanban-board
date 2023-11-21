import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: Task = new Task()
}
