import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient ,HttpHeaders} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Category } from '../../../Models/category';
@Component({
  selector: 'app-get-category-by-id',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-category-by-id.component.html',
  styleUrl: './get-category-by-id.component.css'
})
export class GetCategoryByIdComponent {
  categoryId?: number = 0;
  category: Category;
  errMsg: string = '';
  isCategoryExist: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http:HttpClient,private router:Router, private activateRoute: ActivatedRoute){

  this.category = new Category();

    //route parameter cid is assiged to CategoryId
    this.activateRoute.params.subscribe((p) => (this.categoryId = p['cid']));
    console.log(this.categoryId);
    this.search();
  }
  search(){
    this.http
      .get<Category>(
        'http://localhost:5293/api/Category/GetCategoryById/' + this.categoryId,this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.category = response;
          this.isCategoryExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Category Id';
          this.isCategoryExist = false;
        }
      });
  }
  edit() {
    this.http
      .put('http://localhost:5293/api/Category/EditCategory', this.category,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('/admin-dashboard/getallcategories');
  }
  
 
  
}

