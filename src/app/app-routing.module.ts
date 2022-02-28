import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { AuthGuard } from './guards/auth.guard';
import { SessionGuard } from './guards/session.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [SessionGuard] },
  { path: 'registro', component: SignupComponent, canActivate: [SessionGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
