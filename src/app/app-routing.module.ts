import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { HelpComComponent } from './help-com/help-com.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'user',
    pathMatch: 'full',
    component: UserRegComponent,
  },
  {
    path: 'help',
    pathMatch: 'full',
    component: HelpComComponent,
  },
  {
    path:'userlist',
    pathMatch: 'full',
    component:UserListComponent
  },
  {
    path: '**',
    component: HomeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
