import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from "./welcome/welcome.component";
import { RegisterComponent } from './auth/register/register.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component'; // Import komponentu
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { FunctionalityComponent } from './functionality/functionality.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'functionality/:projectId', component: FunctionalityComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
