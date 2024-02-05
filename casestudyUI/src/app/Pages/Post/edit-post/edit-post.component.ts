import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { Post } from '../../../Models/post';
import { FormsModule } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent {

  post:Post;
  postId?:number=0;
  errMsg: string = '';
  isPostExist: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private router:Router,private activateRoute: ActivatedRoute,private http:HttpClient){
    this.post=new Post();
    this.activateRoute.params.subscribe((p) => (this.postId = p['postId']));
    console.log(this.postId);
    this.search();
  }
  search() {
    this.http
      .get<Post>(
        'http://localhost:5293/api/Post/GetPostById/' + this.postId,this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.post = response;
          this.isPostExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid postId ';
          this.isPostExist = false;
        }
      });
    }
    edit() {
      this.http.put('http://localhost:5293/api/Post/EditPost', this.post,this.httpOptions)
        .subscribe((response) => {
          console.log(response);
          this.router.navigateByUrl('/user-dashboard/myposts');
        });
      
    }
}
