import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from './board.model';
import { BoardDto } from './board-dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  activeBoardId = 1;

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(environment.apiUrl + '/boards', { headers: { responseType: 'application/json' } })
  }

  createBoard(boardDto: BoardDto): void {
    this.http.post<BoardDto>(environment.apiUrl + '/board', boardDto, { headers: { 'Content-Type': 'application/json' } }).subscribe()
  }
}
