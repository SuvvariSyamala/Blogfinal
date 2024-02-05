import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../Models/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
categories:Category;
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }),
};
constructor(private http:HttpClient,private router:Router)
{
this.categories=new Category();
}
AddCategory() {
  console.log(this.categories);
  const userRole = localStorage.getItem("userRole") ?? "Guest";
  this.http
  .post('http://localhost:5293/api/Category/AddCategory', this.categories,this.httpOptions 
    
   
  )
  .subscribe((response) => {
    console.log(response);
  });

    if(userRole=="Admin"){
      this.router.navigateByUrl('/admin-dashboard/getallcategories');
    }else{
      this.router.navigateByUrl('/user-dashboard/getallcategories');
    }
    

}
}
