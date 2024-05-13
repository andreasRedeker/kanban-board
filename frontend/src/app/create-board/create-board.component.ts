import { Component } from '@angular/core';
import { BoardDto } from '../board/board-dto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../board/board.service';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.css'
})
export class CreateBoardComponent {

  boardDto = new BoardDto();

  constructor(private boardService: BoardService) { }

  onSubmit(): void {
    this.boardService.createBoard(this.boardDto);
  }
}
