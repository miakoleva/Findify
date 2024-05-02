import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDTO } from '../models/PostDTO';
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
}
