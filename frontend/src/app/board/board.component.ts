import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { FormsModule } from '@angular/forms';
import { CollectionComponent } from '../collection/collection.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task/task.service';
import { TaskDto } from '../task/task-dto.model';
import { CollectionService } from '../collection/collection.service';
import { CollectionDto } from '../collection/collection-dto.model';
import { CreateTaskInlineComponent } from "../create-task-inline/create-task-inline.component";
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Board } from './board.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  imports: [CommonModule, FormsModule, CollectionComponent, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDropListGroup, CreateTaskInlineComponent, MatIconModule]
})
export class BoardComponent {
  private destroyRef = inject(DestroyRef);

  @Input()
  set id(boardId: number) {
    this.getBoardById(boardId);
  }

  board$: Observable<Board> = new Observable<Board>;

  newColumnName: string = '';

  constructor(
    private boardService: BoardService,
    private taskService: TaskService,
    private collectionService: CollectionService,
    private confirmDialog: MatDialog) {
  }

  ngOnInit() {
    this.board$ = this.boardService.board$;
  }

  getBoardById(boardId: number): void {
    this.boardService.getBoardById(boardId);
  }

  deleteCollection(boardId: number, collectionId: number) {
    this.collectionService.deleteCollection(collectionId)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.boardService.getBoardById(boardId))
  }

  createCollection(boardId: number) {
    if (this.newColumnName.length > 0) {
      let collectionDto = new CollectionDto(this.newColumnName, '', boardId)
      this.collectionService.createCollection(collectionDto)
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.newColumnName = ''
          this.getBoardById(boardId)
        })
    }
  }

  deleteTask(taskId: number, boardId: number) {
    this.taskService.deleteTask(taskId)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.getBoardById(boardId))
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

  confirmDeleteDialog(boardId: number, collectionId: number): void {
    const message = 'Die Spalte und sämtliche Tasks dieser Spalte werden unwiderruflich gelöscht.';

    const dialogData = new ConfirmDialogModel('Löschen bestätigen', message);

    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteCollection(boardId, collectionId);
      }
    });
  }
}
