import { HttpClient,HttpClientModule ,} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../Models/comment'; 
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../Models/post';


@Component({
  selector: 'app-get-all-comments',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-all-comments.component.html',
  styleUrl: './get-all-comments.component.css'
})
export class GetAllCommentsComponent{

  postId?: number;
  comments: Comment[] = [];
  errMsg: string = '';
  comment :Comment;
  posts:Post[]=[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getAllComment();
    this. getCommentsByPostId();
    this.comment=new Comment();
    
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['postId'];
    });
  }
  getCommentsByPostId() {
    const url = `http://localhost:5293/api/Comment/GetCommentByPostId${this.postId}`;
    
    this.http.get<Comment[]>(url).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.comments = response;
          console.log(this.comments);
        } else {
          console.log(`No comments found for post ${this.postId}`);
          this.comments = [];
        }
      },
      (error) => {
        console.error('Error fetching comments:', error);
        
      }
    );
  }
  
  getAllComment(){
    const userRole = localStorage.getItem('userRole') ?? 'Guest';
 
     this.http.get<Comment[]>('http://localhost:5293/api/Comment/GetAllComments',{params: {Role: userRole}}).subscribe((response) =>{
     if(response!=null){
        this.comments=response;
        console.log("comments",this.comments);
      }
    });
 }
  

  

delete(id: any) {
  
  this.comment.id = id;
  this.http
    .delete('http://localhost:5293/api/Comment/DeleteComment/' + this.comment.id)
    .subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('getallcomments');
    });
}

  edit(id:any){
    this.router.navigateByUrl('edit-Comment/' + id);
  
  }


}