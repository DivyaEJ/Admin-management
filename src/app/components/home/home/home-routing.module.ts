import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomeComponent } from './home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent,children:[
    {path:'dashboard',component:HomeContentComponent},
    {path:'manage-users',component:ManageUsersComponent},
    {path:'add-user',component:AddUsersComponent},
    {path:'edit-user/:id', component: AddUsersComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
