import { Component, OnInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  posts: any;
  constructor(private postServiceService: PostServiceService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getListPost();
  }
  getListPost() {
    this.postServiceService.getListPost().subscribe( (data) => {
      if (data) {
        this.posts = data;
      }
    },
    err => {
      console.log(err.message);
    });
  }
  deletePost(post) {
    if (!post) {
      return;
    }
    this.postServiceService.deletePost(post.id).subscribe( (result) => {
      if (result === 'deleted') {
        alert(result);
        this.getListPost();
      }
    }, err => {
      console.log(err.message);
    });
  }
  editPost(post) {
    if (!post) {
      return;
    }
    this.router.navigate(['../create'], { relativeTo: this.activedRoute });
    setTimeout(() => {
      this.postServiceService.sendEditPost(post);
    }, 1000);
  }

}
