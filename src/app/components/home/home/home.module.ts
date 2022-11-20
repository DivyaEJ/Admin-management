import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { HomeContentComponent } from './home-content/home-content.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ManageUsersComponent,
    AddUsersComponent,
    HomeContentComponent
  ]
})
export class HomeModule { }
