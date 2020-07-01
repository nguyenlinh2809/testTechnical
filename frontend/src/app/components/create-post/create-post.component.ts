import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post: any;
  editPost: any;
  constructor(private postServiceService: PostServiceService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.postServiceService.getEditPost().subscribe( (post) => {
      this.editPost = {...post};
    });
  }
  createPost() {
    if (!this.post) {
      return;
    }
    this.postServiceService.createPost({body: this.post})
      .subscribe( (result) => {
        if (result === 'added') {
          this.router.navigate(['../posts'], { relativeTo: this.activedRoute });
        }
      }, err => {
        console.log(err.message);
      });
  }
  updatePost() {
    if (this.editPost) {
      this.postServiceService.updatePost(this.editPost).subscribe( (result) => {
        if (result === 'updated') {
          this.editPost = null;
          this.router.navigate(['../posts'], { relativeTo: this.activedRoute });
        }
      }, err => {
        console.log(err.message);
        this.editPost = null;
      });
    }
  }

}
