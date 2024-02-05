import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../../../Models/comment'; 
import { Post } from '../../../Models/post';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
    comment: Comment;
    posts:Post[]=[];
    constructor(private http: HttpClient, private router: Router) {
      this.comment = new Comment();
      this.getAllPost();
    }
    AddComment() {
      this.comment.commentStatus="Unreviewed";
      const userId=localStorage.getItem('UserId');
      if(userId!=null){
        this.comment.userId = parseInt(userId, 10);
      }
      this.http
        .post('http://localhost:5293/api/Comment/AddComment', this.comment)
        .subscribe((response) => {
          console.log(response);
          this.router.navigateByUrl('/user-dashboard/getallcomments');

        });

  }
  getAllPost(event?: any){
    this.http.get<Post[]>('http://localhost:5293/api/Post/GetAllPosts').subscribe((response) =>{
      this.posts=response;
      console.log(this.posts);
      if(event){
        this.comment.postId = parseInt(event.target.value, 10);
      }
    });
  }
}

