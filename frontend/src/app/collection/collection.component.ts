import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collection } from './collection.model';
import { TaskComponent } from '../task/task.component';
import { CollectionDto } from './collection-dto.model copy';
import { CollectionService } from './collection.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css'
})
export class CollectionComponent {
  @Input() collection: Collection = new Collection()

  collectionDto: CollectionDto = new CollectionDto()

  constructor(private collectionService: CollectionService) {}

  onSubmit() {
    this.collectionDto.boardId = 1;
    this.collectionService.createCollection(this.collectionDto)
  }
}
