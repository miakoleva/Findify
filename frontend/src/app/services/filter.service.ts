import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  url = 'http://localhost:8080/api'

  // private filteredPostsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  // filteredPosts$: Observable<Post[]> = this.filteredPostsSubject.asObservable();

  constructor(private http: HttpClient) { }

  filterPosts(formData: FormData): Observable<Post[]>{
    console.log("eve")
    return this.http.post<Post[]>(`${this.url}/filter`, formData)
  }

  // setFilteredPosts(posts: Post[]): void {
  //   this.filteredPostsSubject.next(posts);
  // }
}
