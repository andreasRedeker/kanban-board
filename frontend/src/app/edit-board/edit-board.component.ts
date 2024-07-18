import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../board/board.service';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Board } from '../board/board.model';
@Component({
  selector: 'app-edit-board',
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
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.css'
})
export class EditBoardComponent {
  board = inject<Board>(MAT_DIALOG_DATA);

  constructor(private boardService: BoardService) { }

  onSubmit(): void {
    this.boardService.updateBoard(this.board);
  }
}
