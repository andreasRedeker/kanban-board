import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  boards$: Observable<Board[]> = new Observable<Board[]>;

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.boards$ = this.boardService.getBoards()
  }
}
