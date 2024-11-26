import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleDto } from 'src/app/models/scheduleDto';
import { ScheduleService } from 'src/app/services/schedule.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

  scheduleForm!: FormGroup;
  isModalOpen = false;
  schedule:ScheduleDto[]=[];
  selectedDate: string = '';
  private apiUrl = environment.apiUrl;
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().slice(0, 10); 
    this.getSchedule(today);
    this.isLoggedIn = !!localStorage.getItem('token');

  }
  constructor(private router: Router, private scheduleService:ScheduleService) {}
  openAddScheduleModal() {
    this.router.navigate(['/add-schedule']);
  }
  closeAddScheduleModal() {
    this.isModalOpen = false; // Zatvorite modal
  } 
  onScheduleAdded(scheduleData: any) {
    console.log('Schedule added:', scheduleData);
    this.closeAddScheduleModal();
    // Dodajte logiku za čuvanje rasporeda
  }
  
  getSchedule(selectedDate: Date){
    this.scheduleService.getSchedule(selectedDate).subscribe(schedule=>{
      console.log(schedule);
      console.log("usao");
      this.schedule=schedule;
    })
  }
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.getSchedule(new Date(this.selectedDate)); 
  }
  getImageUrl(imagePath: string): string {
    // Dodajte dinamički deo putanje ovde
    // const baseUrl = 'https://euroleague-api-master.onrender.com/';
    const baseUrl = this.apiUrl.substring(0, this.apiUrl.lastIndexOf('api'));;
    

    return `${baseUrl}${imagePath}`;
  }
}
