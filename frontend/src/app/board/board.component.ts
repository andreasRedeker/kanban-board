import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { FormsModule } from '@angular/forms';
import { Collection } from '../collection/collection.model';
import { CollectionComponent } from '../collection/collection.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task/task.service';
import { TaskDto } from '../task/task-dto.model';
import { CollectionService } from '../collection/collection.service';
import { CollectionDto } from '../collection/collection-dto.model';
import { CreateTaskInlineComponent } from "../create-task-inline/create-task-inline.component";
import { Subscription, filter, map } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  imports: [CommonModule, FormsModule, CollectionComponent, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDropListGroup, CreateTaskInlineComponent, MatIconModule]
})
export class BoardComponent {

  collections: Collection[] = [];

  newColumnName: string = '';

  sub: Subscription = new Subscription();

  constructor(private boardService: BoardService, private taskService: TaskService, private collectionService: CollectionService) {
  }

  ngOnInit() {
    this.getBoards()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getBoards() {
    this.sub = this.boardService.getBoards().pipe(
      map(boards => boards.find(board => board.id === 1)?.collectionList || []),
      filter(collections => collections !== undefined)
    )
      .subscribe(collections => {
        this.collections = collections;
      });
  }

  drop(event: CdkDragDrop<any>) {
    // task moved in same collection
    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // update task only if task position has been changed
      if (event.previousIndex !== event.currentIndex) {
        this.updateItem(event);
      }
    } else {

      // task has been moved to different collection
      this.updateItem(event);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateItem(input: CdkDragDrop<TaskDto[]>) {
    let movedTask: TaskDto = input.item.data
    movedTask.collectionId = Number(input.container.id)

    if (input.previousIndex !== input.currentIndex) {
      movedTask.position = input.currentIndex + 1
    }

    this.taskService.updateTaskStatus(movedTask)
  }

  deleteCollection(collectionId: number) {
    this.collectionService.deleteCollection(collectionId).subscribe(() => this.getBoards())
  }

  createCollection() {
    if (this.newColumnName.length > 0) {
      let collectionDto = new CollectionDto(this.newColumnName, '', this.boardService.activeBoardId)
      this.collectionService.createCollection(collectionDto).subscribe(s => {
        this.newColumnName = ''
        this.getBoards()
      })
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => this.getBoards())
  }
}
