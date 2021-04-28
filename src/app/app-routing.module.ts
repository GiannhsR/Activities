import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { ActivitiesComponent } from './activities/activities.component';
import {ActivityDetailComponent} from './activity-detail/activity-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'AllActivities', component: ActivitiesComponent},
  {path: 'detail/:activityId', component: ActivityDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
