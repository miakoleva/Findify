import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://localhost:8080/api'

  constructor(private http: HttpClient) {}

  addPost(formData: FormData): Observable<Post> {
    console.log("Posted.")
    return this.http.post<Post>(`${this.url}/new-post`, formData)
  }
  getLostItems(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/lost-items`)
  }
  getFoundItems(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/found-items`)
  }
  getPendingPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/pending-posts`)
  }

  getPostById(id: number): Observable<Post | undefined> {
    return this.http.get<Post>(`${this.url}/posts/${id}`)
  }

  getPostsByUserId(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts/users/${id}`)
  }

  approvePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.url}/posts/${post.id}`, post)
  }

  declinePost(id: number): Observable<any> {
    return this.http.delete<Post>(`${this.url}/posts/${id}`)
  }

}
