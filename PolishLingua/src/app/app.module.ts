import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { FunctionalityComponent } from './functionality/functionality.component';
import { AddFunctionalityComponent } from './functionality/add-functionality/add-functionality.component';
import { DetailsFunctionalityComponent } from './functionality/details-functionality/details-functionality.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { DetailsTaskComponent } from './tasks/details-task/details-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    AuthComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    EditProjectComponent,
    FunctionalityComponent,
    AddFunctionalityComponent,
    DetailsFunctionalityComponent,
    AddTaskComponent,
    TasksComponent,
    DetailsTaskComponent,
    EditTaskComponent,
    NavbarComponent,
    UserListComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
