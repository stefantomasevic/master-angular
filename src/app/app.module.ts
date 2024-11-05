import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebLayoutComponent } from './admin/layout/web-layout/web-layout.component';
import { TeamListComponent } from './admin/team-list/team-list/team-list.component';
import { EditTeamComponent } from './admin/edit-team/edit-team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeamComponent } from './admin/add-team/add-team.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamPlayersComponent } from './admin/team-players/team-players.component';
import { AddPlayerComponent } from './admin/player/add-player/add-player.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { AddScheduleDialogComponent } from './admin/add-schedule-dialog/add-schedule-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    WebLayoutComponent,
    TeamListComponent,
    EditTeamComponent,
    AddTeamComponent,
    TeamPlayersComponent,
    AddPlayerComponent,
    ScheduleComponent,
    AddScheduleDialogComponent,
    
    
    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
