import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../../Models/post';
import { Category } from '../../../Models/category';
import * as emailjs from 'emailjs-com';
import {  HttpEventType, HttpErrorResponse } from '@angular/common/http';
import {  EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  post: Post;
  categories: Category[]=[];
  progress: number = 0;
  message?: string;
  @Output() public onUploadFinished = new EventEmitter();
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
  }
  uploadFile = (files?:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.post.image = fileToUpload.name;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('http://localhost:5293/api/Post/UploadImage', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
          if (
            event.type === HttpEventType.UploadProgress &&
            event.total != undefined
          )
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }
 AddPost() {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if(userId!=null){
      this.post.postsStatus = "Unreviewed";
      this.post.userId = parseInt(userId, 10);
      this.post.canComment = "Allowed";
      this.http
        .post('http://localhost:5293/api/Post/AddPost', this.post,this.httpOptions)
        .subscribe((response) => {
          console.log(response);
          if(userRole=='Admin'){
            this.router.navigateByUrl('/admin-dashboard/getallposts');
          }
           else if(userRole=='User')
          {
            this.sendEmail();
          this.router.navigateByUrl('/user-dashboard/getallposts'); 
         }
        });
      }
      else{
        this.ngZone.run(() => {
          alert('User is not active. Please SignIn to add post.');
        });
      }
  }
  getAllCategory(event?: any){
    this.http.get<Category[]>('http://localhost:5293/api/Category/GetAllCategories',this.httpOptions).subscribe((response) =>{
      this.categories=response;
      console.log(this.categories);
      if(event){
        this.post.categoryId = parseInt(event.target.value, 10);
      }
    });
  }
  sendEmail() {
    const userName = localStorage.getItem('userName');
    const templateParams = {
      to_name: userName,
      message: this.post.content
    };
  
    emailjs.init("Kj_qSaDjcE3EWPoyM");
    emailjs.send('service_38gw9ka', 'template_7f4wz8g', templateParams)
      .then((response) => {
        console.log('Email sent successfully:', response);
      }, (error) => {
        console.error('Error sending email:', error);
      });

  }

}
 