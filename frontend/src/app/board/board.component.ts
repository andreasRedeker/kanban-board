import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { Observable, map } from 'rxjs';
import { BoardDto } from './board-dto.model';
import { FormsModule } from '@angular/forms';
import { Collection } from '../collection/collection.model';
import { CollectionComponent } from '../collection/collection.component';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { TaskDto } from '../task/task-dto.model';
import { CollectionService } from '../collection/collection.service';
import { CollectionDto } from '../collection/collection-dto.model';
import { CreateTaskInlineComponent } from "../create-task-inline/create-task-inline.component";

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  imports: [CommonModule, FormsModule, CollectionComponent, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDropListGroup, CreateTaskInlineComponent]
})
export class BoardComponent {

  collections: Collection[] = [];

  newColumnName: string = '';

  constructor(private boardService: BoardService, private taskService: TaskService, private collectionService: CollectionService) {
    this.getBoards()
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.updateItem(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getBoards() {
    this.boardService.getBoards().subscribe(
      b => {
        this.collections = b.find(activeBoard => activeBoard.id = 1)?.collectionList || [];
      }
    )
  }

  updateItem(input: CdkDragDrop<string[]>) {
    console.log(input);
    console.log(`moved ${input.item.data.title} to ${input.container.id}`)

    let movedTask: TaskDto = input.item.data
    movedTask.collectionId = Number(input.container.id)

    console.log(movedTask)

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

  // boards$: Observable<Board[]> = new Observable<Board[]>

  // collectionList$: Observable<Collection[] | null> = new Observable<Collection[] | null>

  // collectionsList: Collection[] = [];

  // boardDto: BoardDto = new BoardDto()

  // activeBoardId: number = 0

  // constructor(private boardService: BoardService) { }

  // ngOnInit() {
  //   this.boards$ = this.boardService.getBoards()
  //   this.activeBoardId = this.boardService.activeBoardId

  //   this.collectionList$ = this.getCollectionByBoardId(this.activeBoardId)
  // }

  // onSubmit() {
  //   this.boardService.createBoard(this.boardDto)
  // }

  // getCollectionByBoardId(id: number): Observable<Collection[] | null> {
  //   return this.boards$.pipe(
  //     map(boards => {
  //       const foundBoard = boards.find(board => board.id === id);
  //       return foundBoard ? foundBoard.collectionList : null;
  //     })
  //   );
  // }
}
