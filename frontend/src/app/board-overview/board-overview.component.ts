import { Component } from '@angular/core';
import { BoardService } from '../board/board.service';
import { Observable } from 'rxjs';
import { BoardList } from '../board/board-list.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-board-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './board-overview.component.html',
  styleUrl: './board-overview.component.css'
})
export class BoardOverviewComponent {

  boardList$: Observable<BoardList[]> = new Observable<BoardList[]>;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardList$ = this.boardService.getBoardList();
    this.boardService.loadBoardList();
  }
}
