import { Injectable } from '@angular/core';
import { CollectionDto } from './collection-dto.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  deleteCollection(collectionId: number): Observable<void> {
    return this.http.delete<void>(environment.apiUrl + '/collection', { params: { collectionId }, headers: { 'Content-Type': 'application/json' } })
  }

  createCollection(collectionDto: CollectionDto): Observable<CollectionDto> {
    return this.http.post<CollectionDto>(environment.apiUrl + '/collection', collectionDto, { headers: { 'Content-Type': 'application/json' } })
  }
}
