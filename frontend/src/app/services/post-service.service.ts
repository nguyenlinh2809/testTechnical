import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  GET_POSTS_API = environment.GET_POSTS_API;
  CREATE_POST_API = environment.CREATE_POST_API;
  DELETE_POSTS_API = environment.DELETE_POSTS_API;
  UPDATE_POSTS_API = environment.UPDATE_POSTS_API;

  ediPostEvent = new Subject<any>();


  constructor(private http: HttpClient) {

  }

  getListPost() {
    return this.http.get(this.GET_POSTS_API);
  }
  createPost(post) {
    return this.http.post(this.CREATE_POST_API, post);
  }
  deletePost(postId) {
    const url = this.DELETE_POSTS_API + '/' + postId;
    return this.http.delete(url);
  }
  updatePost(post) {
    const url = this.UPDATE_POSTS_API + '/' + post.id;
    return this.http.put(url, {body: post.body});
  }

  sendEditPost(post: any) {
    this.ediPostEvent.next(post);
  }

  getEditPost(): Observable<any> {
      return this.ediPostEvent.asObservable();
  }
}
