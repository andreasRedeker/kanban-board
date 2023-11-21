import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collection } from './collection.model';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {

  @Input() collection: Collection = new Collection()
}
