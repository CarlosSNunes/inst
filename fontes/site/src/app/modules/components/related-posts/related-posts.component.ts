import { Component, OnInit } from '@angular/core';
import Posts from "./mock-post";
import { BlogService } from 'src/app/services';

@Component({
  selector: 'app-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit {
  posts: {}[] = [];
  pagePost;
  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getRelatedPosts(this.pagePost);
  }


  async getRelatedPosts(_post) {
    try {
      this.posts = await this.blogService.getRelatedPosts(_post);
      this.posts = Posts.posts;
    } catch (err) {
      console.log(err)
      this.posts = Posts.posts;
    }
  }
}
