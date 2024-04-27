import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board } from './board.model';
import { BoardDto } from './board-dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  activeBoardId = 1;

  sub: Subscription = new Subscription();

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(environment.apiUrl + '/boards', { headers: { responseType: 'application/json' } })
  }

  createBoard(boardDto: BoardDto): void {
    this.sub = this.http.post<BoardDto>(environment.apiUrl + '/board', boardDto, { headers: { 'Content-Type': 'application/json' } }).subscribe(
      res => console.log(res)
    )
  }
}
