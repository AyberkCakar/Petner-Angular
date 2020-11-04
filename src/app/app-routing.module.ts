import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdvertComponent } from './advert/advert.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { UpdateAdvertComponent } from './update-advert/update-advert.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'advert', component: AdvertComponent },
  { path: 'addAdvert', component: AddAdvertComponent },
  { path: 'updateAdvert/:id', component: UpdateAdvertComponent },
  { path: 'detailAdvert/:id', component: AdvertDetailComponent },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
