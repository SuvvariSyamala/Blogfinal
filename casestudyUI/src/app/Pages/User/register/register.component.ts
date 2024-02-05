import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
users:User;
constructor(private router:Router,private http:HttpClient){
  this.users=new User();
}
onSubmit(): void {
  console.log(JSON.stringify(this.users));
  console.log(this.users);
  this.users.userStatus="Active";
  this.users.role="User";
  this.http.post('http://localhost:5293/api/User/Register',this.users)
  .subscribe((response)=>{
    console.log(response);
    this.router.navigateByUrl('login');
    this.sendEmail();
  })
  
}
onReset(form: NgForm): void {
  form.reset();
}
redirectToLogin() {
  this.router.navigateByUrl('login');
}
sendEmail() {
  const templateParams = {
    to_name: this.users.userName,
    from_name: 'Blog Sphere',
    message:`Thankyou for registering`,
    to_email: this.users.email
  };

  emailjs.init("I8gzD5e6ceGl0lgEM");
  emailjs.send('service_7ebkijl', 'template_k44ktsn', templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
    }, (error) => {
      console.error('Error sending email:', error);
    });


}
}

