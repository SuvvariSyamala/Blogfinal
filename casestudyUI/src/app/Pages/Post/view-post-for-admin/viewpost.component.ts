import { Component,NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { Post } from '../../../Models/post';
import { FormsModule} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../Models/comment';

@Component({
  selector: 'app-viewpost',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './viewpost.component.html',
  styleUrl: './viewpost.component.css'
})
export class ViewpostComponent {
  postId?: number = 0;
  post: Post;
  posts:Post[]=[];
  errMsg: string = '';
  isPostExist: boolean = false;
  postTitle: string = '';
  comments: Comment[]=[];
  comment:Comment;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http:HttpClient,private router:Router,private activateRoute:ActivatedRoute, private ngZone: NgZone){
    this.post = new Post();
    this.comment=new Comment();
   // this.getAllPost();
  
    this.activateRoute.params.subscribe((p) => (this.postId = p['postId']));
    console.log(this.postId);
    this.search();
  }

 search() {
    this.http
      .get<Post>('http://localhost:5293/api/Post/GetPostById/' + this.postId,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.posts = [response];
          this.isPostExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Post Name';
          this.isPostExist = false;
        }
    });
    const pid = this.postId ?? -1;
    const userRole = localStorage.getItem('userRole') ?? "Guest";
    this.http.get<Comment[]>(`http://localhost:5293/api/Comment/GetCommentByPostId/${pid}`,{params:{role: userRole}, headers: this.httpOptions.headers,})
    .subscribe((response)=>{
      console.log("Comments",response);
      if(response != null && response.length>0){
        this.comments = response;
        console.log(this.comments);
      }
    })
  }
  approve(commentId:any){
    this.http.put(`http://localhost:5293/api/Comment/ApproveComment/${commentId}`, {},this.httpOptions).subscribe(
      () => {
        console.log('Comment approved successfully');
       this.search();
      },
      (error) => {
        console.error('Error approving comment:', error);
      }
    );
  }
  deny(commentId:any){
    this.http.put(`http://localhost:5293/api/Comment/DenyComment/${commentId}`, {},this.httpOptions).subscribe(
      () => {
        console.log('Comment denied successfully');
        this.search();
      },
      (error) => {
        console.error('Error denying comment:', error);
      }
    );
  }
  AllowComment(postId:any){
    this.http.put(`http://localhost:5293/api/Post/AllowComment/${postId}`,{},this.httpOptions).subscribe(()=>{console.log('Comments Enabled');},(error)=>{
      console.log("Error for Enabling comments: ", error);
    });
  }
  DisAllowComment(postId:any){
    this.http.put(`http://localhost:5293/api/Post/DisAllowComment/${postId}`,{},this.httpOptions).subscribe(()=>{console.log('Comments Disabled');},(error)=>{
      console.log("Error for Disabling comments: ", error);
    });
  }
}
