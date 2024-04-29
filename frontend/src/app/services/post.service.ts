import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDTO } from '../models/PostDTO';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = 'http://localhost:4200/api'

  constructor(private http: HttpClient) {}

  addPost(post: PostDTO){
    console.log("Posted.")
    return this.http.post(`${this.url}/new-post`, post)
  }
}
