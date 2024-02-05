import { Routes } from '@angular/router';

import { GetAllCategoryComponent } from './Pages/Category/get-all-category/get-all-category.component';
import { AddCategoryComponent } from './Pages/Category/add-category/add-category.component';
import { GetCategoryByIdComponent } from './Pages/Category/get-category-by-id/get-category-by-id.component';
import { GetAllPostsComponent } from './Pages/Post/get-all-posts-for-user/get-all-posts.component';
import { GetPostByTitleComponent } from './Pages/Post/view-post-for-user/get-post-by-title.component';
import { AddPostComponent } from './Pages/Post/add-post/add-post.component';
import { LoginComponent } from './Pages/User/login/login.component';
import { AdminDashboardComponent } from './Pages/User/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './Pages/User/user-dashboard/user-dashboard.component';
import { LogoutComponent } from './Pages/User/logout/logout.component';
import { RegisterComponent } from './Pages/User/register/register.component';
import { GetAllUsersComponent } from './Pages/User/get-all-users/get-all-users.component';
import { EditUserComponent } from './Pages/User/edit-user/edit-user.component';
import { EditPostComponent } from './Pages/Post/edit-post/edit-post.component';
import { GetallPostsForAdminComponent } from './Pages/Post/getall-posts-for-admin/getall-posts-for-admin.component';
import { AddCommentComponent } from './Pages/Comment/add-comment/add-comment.component';
import { GetAllCommentsComponent } from './Pages/Comment/get-all-comments/get-all-comments.component';
import { GetcommentsforadminComponent } from './Pages/Comment/getcommentsforadmin/getcommentsforadmin.component';
import { MyPostsComponentComponent } from './Pages/Post/my-posts-component/my-posts-component.component';
import { GetuserbyidComponent } from './Pages/User/getuserbyid/getuserbyid.component';
import { ViewpostComponent } from './Pages/Post/view-post-for-admin/viewpost.component';


export const routes: Routes = [
    
    
    
    
    {path:'user-dashboard',component:UserDashboardComponent,
    children:[
      { path: 'getallposts', component: GetAllPostsComponent },
      { path: 'getallcategories', component:GetAllCategoryComponent},
      {path:'addpost',component:AddPostComponent},
      {path:'edit-post/:postId',component:EditPostComponent},
      { path: 'logout', component: LogoutComponent }, 
      { path: 'addcategory', component: AddCategoryComponent },
      {path:'addcomment',component:AddCommentComponent},
      {path:'viewpost/:postId',component:GetPostByTitleComponent},
      {path:'myposts',component:MyPostsComponentComponent},
      {path:'getuserbyid',component:GetuserbyidComponent},
      {path:'edit-user/:userId',component:EditUserComponent},
      

      

    ]},
    { path: 'admin-dashboard', component: AdminDashboardComponent,
    children: [
     { path: 'getallcategories', component:GetAllCategoryComponent},
      { path: 'addcategory', component: AddCategoryComponent },
      {path:'edit-category/:cid',component:GetCategoryByIdComponent},
      {path:'edit-user/:uid',component:EditUserComponent},
      {path:'addpost',component:AddPostComponent},
      {path:'getallusers',component:GetAllUsersComponent},
      {path:'viewpost/:postId',component:ViewpostComponent},
      // {path:'edit-post/:postId',component:EditPostComponent},
      {path:'getallposts',component:GetallPostsForAdminComponent},
      {path:'getallcomments',component:GetcommentsforadminComponent},
      {path:'addcomment',component:AddCommentComponent},
      { path: 'logout', component: LogoutComponent }, 
    ],
  },
  { path: 'login', component: LoginComponent },
  {path:'',component:RegisterComponent},
 
];