import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from '../../../Models/post';
import { Category } from '../../../Models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-posts-component',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './my-posts-component.component.html',
  styleUrls: ['./my-posts-component.component.css'],

})
export class MyPostsComponentComponent implements OnInit {

  originalPosts: Post[] = [];
  posts: Post[] = [];
  postTitle: string = '';
  postId?: number;
  post: Post;
  categories: Category[] = [];
  categoryId?: number;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.post = new Post();
    this.getAllCategory();
  }

  ngOnInit() {
    this.getAllPostByUserId();
  }

  getAllPostByUserId() {
    const userId = localStorage.getItem('userId')|| 0; 
    const url = `http://localhost:5293/api/Post/GetPostByUserId/${userId}`;
  
    this.http.get<Post[]>(url,this.httpOptions).subscribe((response) => {
      if (response != null) {
        this.originalPosts = response;
        this.posts = response;
        console.log("Posts", this.posts);
      }
    });
  }
  getAllPostByCategoryIdUserId() {
    const userId = localStorage.getItem('userId') || 'defaultUserId';
    const url = `http://localhost:5293/api/Post/GetPostByCategoryIdAndUserId/${this.categoryId}/${userId}`;

    this.http.get<Post[]>(url,this.httpOptions).subscribe((response) => {
      if (response != null) {
        this.originalPosts = response;
        this.posts = response; // Assuming that the API already filters based on categoryId and userId
        console.log("Posts", this.posts);
      }
    });
  }
  

  getAllCategory() {
    this.http.get<Category[]>('http://localhost:5293/api/Category/GetAllCategories',this.httpOptions).subscribe((response) => {
      this.categories = response;
      console.log(this.categories);
    });
  }
  

  delete(postId: any) {
    this.postId = postId;
    this.http
      .delete(`http://localhost:5293/api/Post/DeletePost/${this.postId}`,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/user-dashboard/myposts');
      });
  }

  edit(postId: any) {
    this.router.navigateByUrl(`/user-dashboard/edit-post/${postId}`);
  }

  addPost(){
    const userStatus = localStorage.getItem('userStatus');
    if(userStatus=="Active"){
      this.router.navigateByUrl('/user-dashboard/addpost');
    }
    else{
      this.ngZone.run(() => {
        alert('User is not active. Please activate your account.');
      });
    }
  }
  
}
