import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.css']
})
export class AddScheduleDialogComponent {

  scheduleForm: FormGroup;
  teams:Team[]=[];

  constructor(private fb: FormBuilder, private router: Router, private teamService:TeamService, private scheduleService:ScheduleService) {
    this.scheduleForm = this.fb.group({
      homeTeamId: ['', Validators.required],
      guestTeamId: ['', Validators.required],
      gameTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeams();
  }

  openAddScheduleModal(): void {
    const modal = document.getElementById('addScheduleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeAddScheduleModal(): void {
    const modal = document.getElementById('addScheduleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  saveSchedule(): void {
    if (this.scheduleForm.valid) {
      const scheduleData = this.scheduleForm.value;
      console.log('New Schedule:', scheduleData);

      this.scheduleService.createSchedule(scheduleData).subscribe({
        next: (response) => {
          console.log('Utakmica je uspešno kreirana:', response);
        },
        error: (error) => {
          console.error('Greška prilikom kreiranja utakmice:', error);
        }
      });

      this.closeAddScheduleModal();
      this.scheduleForm.reset();
    }
  }
  closeModal(){
    this.router.navigate(['/schedule']);
  }
  
  getTeams(){
    this.teamService.getTeams().subscribe(teams=>{
      console.log(teams);
      this.teams=teams;
    })
  }
}
