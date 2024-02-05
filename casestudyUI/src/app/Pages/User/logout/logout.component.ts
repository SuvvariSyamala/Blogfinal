import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
 
 
  httpResponse: any;
  constructor(private router: Router,private route: ActivatedRoute) { }
 
  ngOnInit(): void {
   
    this.logout();
    this.confirmLogout();
  }
  confirmLogout(): void {
   
    const isConfirmed = window.confirm('Are you sure you want to log out?');
 
    if (isConfirmed) {
      this.logout();
    } else {
      const userRole = localStorage.getItem('userRole');
 
      if (userRole === 'User') {
        this.router.navigateByUrl('user-dashboard/getallposts');
      } else if (userRole === 'Admin') {
        this.router.navigateByUrl('admin-dashboard/getallposts');
      } else {
       
        this.router.navigate(['/']);
      }
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}