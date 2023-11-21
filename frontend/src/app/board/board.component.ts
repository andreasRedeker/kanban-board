import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { Observable, map } from 'rxjs';
import { BoardDto } from './board-dto.model';
import { FormsModule } from '@angular/forms';
import { Collection } from '../collection/collection.model';
import { CollectionComponent } from '../collection/collection.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, CollectionComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  boards$: Observable<Board[]> = new Observable<Board[]>

  collectionList$: Observable<Collection[] | null> = new Observable<Collection[] | null>

  boardDto: BoardDto = new BoardDto()

  activeBoardId: number = 0

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boards$ = this.boardService.getBoards()
    this.activeBoardId = this.boardService.activeBoardId

    this.collectionList$ = this.getCollectionByBoardId(this.activeBoardId)
  }

  onSubmit() {
    this.boardService.createBoard(this.boardDto)
  }

  getCollectionByBoardId(id: number): Observable<Collection[] | null> {
    return this.boards$.pipe(
      map(boards => {
        const foundBoard = boards.find(board => board.id === id);
        return foundBoard ? foundBoard.collectionList : null;
      })
    );
  }
}
