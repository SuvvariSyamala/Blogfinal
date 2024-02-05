import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  users:User ;
  email: string = '';
  password: string = '';
  errMsg: string = '';
  httpResponse: any;
  constructor(private http: HttpClient, private router:Router) {
    this.users= new User();
  }

  onSubmit(): void {
    let login = { Email: this.email, Password: this.password };
    this.http
      .post('http://localhost:5293/api/User/Validate', login)
      .subscribe((response) => {
        this.httpResponse = response;
        console.log("Login response",this.httpResponse);
        if (this.httpResponse.token != null) {
          localStorage.setItem('token', this.httpResponse.token);
          localStorage.setItem('userId', this.httpResponse.userId);
          localStorage.setItem('userRole', this.httpResponse.roleName);
          localStorage.setItem('userStatus',this.httpResponse.userStatus);
          localStorage.setItem('userName',this.httpResponse.userName);
          if (this.httpResponse.roleName == 'User') {
            this.router.navigateByUrl('user-dashboard/getallposts');
          } else if (this.httpResponse.roleName == 'Admin') {
            this.router.navigateByUrl('admin-dashboard/getallposts');
          }
        } else {
          this.errMsg = 'Invalid Credentials';
          console.log(this.errMsg);
        }
      });
  }
  onReset(form: NgForm): void {
    form.reset();
  }
  
}