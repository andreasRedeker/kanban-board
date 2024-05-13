import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Board } from './board.model';
import { BoardDto } from './board-dto.model';
import { environment } from '../../environments/environment';
import { BoardList } from './board-list.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private destroyRef = inject(DestroyRef);

  private board = new BehaviorSubject<Board>(new Board());
  public board$ = this.board.asObservable();

  private boardList = new BehaviorSubject<BoardList[]>([]);

  public getBoardList(): Observable<BoardList[]> {
    return this.boardList;
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  init() {
    this.loadBoardList();
    this.getBoardList().subscribe(list => {
      if (list.length > 0) {
        let firstBoardId = list[0].id;
        if (firstBoardId) {
          this.getBoardById(firstBoardId);
        }
      }
    });
  }

  loadBoardList(): void {
    this.http.get<BoardList[]>(environment.apiUrl + '/board-list', { headers: { responseType: 'application/json' } })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        boardList => this.boardList.next(boardList)
      )
  }

  getBoardById(boardId: number): void {
    this.http.get<Board>(environment.apiUrl + '/board', { params: { boardId }, headers: { 'Content-Type': 'application/json' } })
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
        board => this.board.next(board),
        error => this.handleError(error)
      );
  }

  createBoard(boardDto: BoardDto): void {
    this.http.post<Board>(environment.apiUrl + '/board', boardDto, { headers: { 'Content-Type': 'application/json' } })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        board => {
          this.router.navigate(['board', board.id])
        }
      )
  }

  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/board', { params: { boardId }, headers: { 'Content-Type': 'application/json' } })
  }

  private handleError(error: any) {
    if (error.status === 404) {
      // show special error page in the future
      this.router.navigate(['error']);
    } else {
      this.router.navigate(['error']);
    }
  }
}
