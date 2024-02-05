import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-update-comment',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './update-comment.component.html',
  styleUrl: './update-comment.component.css'
})
export class UpdateCommentComponent {

  comment:Comment;
  commentId?:number=0;
  errMsg: string = '';
  isCommentExist: boolean = false;
  constructor(private router:Router,private activateRoute: ActivatedRoute,private http:HttpClient){
    this.comment=new Comment();
    this.activateRoute.params.subscribe((p) => (this.commentId = p['commentId']));
    console.log(this.commentId);
    this.search();
  }

  search() {
    this.http
      .get<Comment>(
        'http://localhost:5293/api/Post/GetPostById/' + this.commentId
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.comment = response;
          this.isCommentExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid commentId ';
          this.isCommentExist = false;
        }
      });
    }

  edit() {
    this.http
      .put('http://localhost:5293/api/Comment/UpdateComment', this.comment)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('/user-dashboard/getallcomments');
  }
}
