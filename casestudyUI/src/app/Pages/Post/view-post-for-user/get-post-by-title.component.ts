import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { Post } from '../../../Models/post';
import { FormsModule} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../Models/comment';

@Component({
  selector: 'app-get-post-by-title',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-post-by-title.component.html',
  styleUrl: './get-post-by-title.component.css'
})
export class GetPostByTitleComponent {
  postId?: number = 0;
  post: Post;
  posts:Post[]=[];
  errMsg: string = '';
  isPostExist: boolean = false;
  postTitle: string = '';
  comment:Comment;
  comments: Comment[]=[];
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
      if(response != null && response.length > 0){
        this.comments = response;
        console.log(this.comments);
      }
    })
  }

    
    
     addComment(postId:any) {
      if(this.comment.text!=null){
        const userId=localStorage.getItem('userId');
        if(userId!=null){
         this.comment.commentStatus="Unreviewed";
         this.comment.userId = parseInt(userId, 10);
         this.comment.postId = this.postId;
         this.http
           .post('http://localhost:5293/api/Comment/AddComment', this.comment,this.httpOptions)
           .subscribe((response) => {
             console.log(response);
             this.comment.text = "";
             this.router.navigateByUrl('/user-dashboard/viewpost/'+postId);
            });
          }
          else{
            this.ngZone.run(() => {
              alert('User is not active. Please activate your account.');
          });
        }
        }
  }
}
