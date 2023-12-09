import { Injectable } from '@angular/core';
import { CollectionDto } from './collection-dto.model copy';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  createCollection(collectionDto: CollectionDto): void {
    this.http.post<CollectionDto>(environment.apiUrl + '/collection', collectionDto).subscribe()
  }
}
