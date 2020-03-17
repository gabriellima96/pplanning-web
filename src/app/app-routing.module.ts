import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VotingPlanningComponent } from './pages/voting-planning/voting-planning.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard/:grupoId/:userId',
    component: DashboardComponent
  },
  {
    path: 'voting/:grupoId/:userId',
    component: VotingPlanningComponent
  },
  {
    path: '',
    component: HomeComponent
  },

  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
