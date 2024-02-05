import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from '../../../Models/post';
import { Category } from '../../../Models/category';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../Models/review';
import { Component } from '@angular/core';

@Component({
  selector: 'app-getall-posts-for-admin',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './getall-posts-for-admin.component.html',
  styleUrl: './getall-posts-for-admin.component.css'
})
export class GetallPostsForAdminComponent {
  posts:Post[]=[];
  postTitle:string='';
  postId?:number;
  post:Post;
  categories:Category[]=[];
  categoryId?:number;
  review:Review;
  postsStatus?:string[]=[];
  isApproved?: boolean;
  isDenied?: boolean;
  postStatus?:string;
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
constructor(private http:HttpClient,private router:Router)
{
  this.getAllPost();
  this.post=new Post();
  this.getAllCategory();
  this.review = new Review();
  this.postsStatus=["Approved","Denied","Unreviewed"];
}
ngOnInit() {
 this.getAllPost();
}
getAllPost(){
   const userRole = localStorage.getItem('userRole') ?? 'Guest';
   console.log("PostStatus Array: ",this.postsStatus);
    this.http.get<Post[]>('http://localhost:5293/api/Post/GetAllPosts',{params: {Role: userRole,postsStatus:''},headers: this.httpOptions.headers,}).subscribe((response) =>{
    if(response!=null){
       this.posts=response;
       console.log("Posts",this.posts);
     }
   });
}
getAllCategory(){
  this.http.get<Category[]>('http://localhost:5293/api/Category/GetAllCategories',this.httpOptions).subscribe((response) =>{
    this.categories=response;
    console.log(this.categories);
  });
}
getPostByCategoryId() {
  const url = `http://localhost:5293/api/Post/GetPostByCategoryId/${this.categoryId}`;
  
  this.http.get<Post[]>(url,this.httpOptions).subscribe(
    (response) => {
      if (response && response.length > 0) {
        this.posts = response;
        console.log(this.posts);
      } else {
        console.log(`No posts found for category ${this.categoryId}`);
        this.posts = [];
      }
    },
    (error) => {
      console.error('Error fetching posts:', error);
      
    }
  );

}

approvePost(postId: any) {
  this.http.put(`http://localhost:5293/api/Post/ApprovePost/${postId}`, {}, this.httpOptions).subscribe(
    () => {
      console.log(`Post ${postId} approved successfully`);
      this.updatePostStatus(postId, true, false);
    },
    (error) => {
      console.error(`Error approving post ${postId}:`, error);
    }
  );
}

denyPost(postId: any) {
  this.http.put(`http://localhost:5293/api/Post/DenyPost/${postId}`, {}, this.httpOptions).subscribe(
    () => {
      console.log(`Post ${postId} denied successfully`);
      this.updatePostStatus(postId, false, true);
    },
    (error) => {
      console.error(`Error denying post ${postId}:`, error);
    }
  );
}

updatePostStatus(postId: any, isApproved: boolean, isDenied: boolean) {
  const postIndex = this.posts.findIndex(post => post.postId === postId);

  if (postIndex !== -1) {
    this.posts[postIndex].isApproved = isApproved;
    this.posts[postIndex].isDenied = isDenied;
    console.log(`After:`, this.posts[postIndex]);

    
  } else {
    console.error(`Post with ID ${postId} not found.`);
  }
}



view(postId:any){
  this.router.navigateByUrl('/admin-dashboard/viewpost/'+postId);
}
getPostByStatus(){
  const userRole = localStorage.getItem('userRole') ?? 'Guest';
  const status = this.postStatus ?? "";
    this.http.get<Post[]>('http://localhost:5293/api/Post/GetAllPosts',{params: {Role: userRole,postsStatus: status},headers: this.httpOptions.headers,}).subscribe((response) =>{
    if(response!=null){
       this.posts=response;
       console.log("Posts",this.posts);
     }
   });
}
}