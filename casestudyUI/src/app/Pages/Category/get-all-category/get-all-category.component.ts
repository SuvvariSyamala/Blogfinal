import { Component, NgZone } from '@angular/core';
import { HttpClient,HttpClientModule,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Category } from '../../../Models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-category',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './get-all-category.component.html',
  styleUrl: './get-all-category.component.css'
})
export class GetAllCategoryComponent {
categories:Category[]=[];
categoryId?:number;
userRole?:string;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};
constructor(private http:HttpClient,private router:Router, private ngZone: NgZone)
{
  this.getAllCategory();
  this.userRole = localStorage.getItem('userRole') ?? "Guest";
}
getAllCategory(){
  this.http.get<Category[]>('http://localhost:5293/api/Category/GetAllCategories',this.httpOptions).subscribe((response) =>{
    this.categories=response;
    console.log(this.categories);
  });
}
delete(categoryId:any) {
 this.categoryId=categoryId;
  this.http
    .delete('http://localhost:5293/api/Category/DeleteCategory/' + this.categoryId,this.httpOptions)
    .subscribe((response) => {
      console.log(response);
      (err:HttpErrorResponse)=>{
        console.log(err);
      }
      this.router.navigateByUrl('/admin-dashboard/getallcategories');
    });
 
}
edit(categoryId:any)
{
  if(this.userRole=="Admin"){
    this.router.navigateByUrl('/admin-dashboard/edit-category/' + categoryId);
  }
  // else if(userRole == "User"){
  //   this.router.navigateByUrl('/user-dashboard/edit-category/' + categoryId);
  // }
  else{
      this.ngZone.run(() => {
        alert('User is not Logged In. Please Login your account.');
      });
  }

}
}