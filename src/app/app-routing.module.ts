import { HomeComponent } from "./pages/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from "./pages/posts/posts.component";
import { DetailPostComponent } from "./pages/posts/detail-post/detail-post.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { AuthGuard } from "./core/auth/auth.guard";
import { EventsComponent } from "./pages/events/events.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Toque seu Negócio | Home' }
  },

  {
    path: 'admin',
    component: AdminComponent,
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard]
  },

  {
    path: 'events',
    component: EventsComponent,
    data: { title: 'Eventos'}
  },

  {
    path: 'posts/:id',
    component: DetailPostComponent,
    data: { title: 'Toque seu Negócio'}
  },

  {
    path: 'posts',
    component: PostsComponent,
    data: { title: 'Toque seu Negócio'}
  },

  {
    path: 'categoria/:id',
    component: PostsComponent,
    data: { title: 'Toque seu Negócio'}
  },

  {
      path: '',
      component: HomeComponent,
      data: { title: 'Toque seu Negócio | Home' }
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
