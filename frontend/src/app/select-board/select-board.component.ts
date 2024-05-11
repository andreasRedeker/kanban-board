import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardService } from '../board/board.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BoardList } from '../board/board-list.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-select-board',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './select-board.component.html',
  styleUrl: './select-board.component.css'
})
export class SelectBoardComponent {
  private destroyRef = inject(DestroyRef);

  selected: BoardList = { id: 0, title: '' };

  boardList$: Observable<BoardList[]> = new Observable<BoardList[]>;

  boardList: BoardList[] = [];

  constructor(private boardService: BoardService, private confirmDialog: MatDialog) {
  }

  ngOnInit() {
    this.boardService.loadBoardList();
    this.boardService.getBoardList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(boardList => this.boardList = boardList);
    this.boardService.board$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(board => {
      if (board && board.id) {
        this.selected = { id: board.id, title: board.title }
      }
    });
    this.boardService.getBoardById(30); // todo which board should be loaded first
  }

  getSelectedBoard(event: Event): void {
    const id = (event.target as HTMLSelectElement).value as unknown as number;
    this.boardService.getBoardById(id);
  }

  selectionEvent(event: MatSelectChange) {
    this.boardService.getBoardById(event.value.id);
  }

  deleteBoard(): void {
    this.boardService.deleteBoard(this.selected.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      // this.getBoardList();
      this.boardService.loadBoardList();
      this.boardService.getBoardById(30); // todo: redirect to board overview
    });
  }

  getBoardList() {
    this.boardList$ = this.boardService.getBoardList();
  }

  confirmDeleteDialog(): void {
    const message = 'Das Board und sämtliche Tasks des Boards werden unwiderruflich gelöscht.';

    const dialogData = new ConfirmDialogModel('Löschen bestätigen', message);

    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteBoard()
      }
    });
  }
}
