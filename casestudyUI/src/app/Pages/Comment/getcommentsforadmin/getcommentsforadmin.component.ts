import { HttpClient,HttpClientModule} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../Models/comment';
import { Post } from '../../../Models/post';


@Component({
  selector: 'app-getcommentsforadmin',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './getcommentsforadmin.component.html',
  styleUrl: './getcommentsforadmin.component.css'
})
export class GetcommentsforadminComponent {

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
    this.getAllPost();
    
    
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
  getAllPost(event?: any){
    this.http.get<Post[]>('http://localhost:5293/api/Post/GetAllPosts').subscribe((response) =>{
      this.posts=response;
      console.log(this.posts);
      if(event){
        this.comment.postId = parseInt(event.target.value, 10);
      }
    });
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
 approveComment(id: any) {
  this.http.put(`http://localhost:5293/api/comment/Approvecomment/${id}`, {}).subscribe(
    () => {
      console.log('comment approved successfully');
     this.getAllComment();
    },
    (error) => {
      console.error('Error approving comment:', error);
    }
  );
}

denyComment(id: any){
  this.http.put(`http://localhost:5293/api/Comment/Denycomment/${id}`, {}).subscribe(
    () => {
      console.log('comment denied successfully');
      this.getAllComment();
    },
    (error) => {
      console.error('Error denying comment:', error);
    }
  );
}
}
