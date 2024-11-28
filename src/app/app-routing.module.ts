import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './admin/layout/web-layout/web-layout.component';
import { TeamListComponent } from './admin/team-list/team-list/team-list.component';
import { EditTeamComponent } from './admin/edit-team/edit-team.component';
import { AddTeamComponent } from './admin/add-team/add-team.component';
import { TeamPlayersComponent } from './admin/team-players/team-players.component';
import { AddPlayerComponent } from './admin/player/add-player/add-player.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { AddScheduleDialogComponent } from './admin/add-schedule-dialog/add-schedule-dialog.component';
import { StatisticComponent } from './admin/statistic/statistic.component';
import { LoginComponent } from './admin/login/login.component';
import { SignInComponent } from './admin/sign-in/sign-in.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminStatisticComponent } from './admin/admin-statistic/admin-statistic.component';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', component: TeamListComponent },
      { path: 'add-team', component:AddTeamComponent  },
      { path: 'edit-team/:id', component: EditTeamComponent },
      { path: 'team-players/:id', component: TeamPlayersComponent },
      { path: 'add-player/:id', component: AddPlayerComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'add-schedule', component: AddScheduleDialogComponent, canActivate: [authGuard] },
      {path: 'statistic/:id', component:StatisticComponent},
      { path: 'login', component: LoginComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'admin-statistic/:id', component: AdminStatisticComponent ,canActivate: [authGuard] },
      { path: 'not-found', component: NotFoundComponent },
      // { path: '**', redirectTo: '/not-found' },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
