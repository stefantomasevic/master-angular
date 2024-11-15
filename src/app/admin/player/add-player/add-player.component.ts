import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerDto } from 'src/app/models/playerDto';
import { ModalService } from 'src/app/services/modal.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  player : PlayerDto = {
    firstName: '',
    lastName: '',
    age: 0,
    position: '',
    nationality: '',
    teamId: 0,
    logo: null
  };
  // teams = [
  //   { id: 1, name: 'Partizan' },
  //   { id: 2, name: 'Crvena Zvezda' },
  //   { id: 3, name: 'Bayern Munich' },
  // ];
  teams: any[] = [];

  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() playerAdded = new EventEmitter<void>();
  constructor( private playerService: PlayerService, private teamService:TeamService) { }

  ngOnInit(): void {
    this.getTeams();

  }
  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (response: any[]) => {
        this.teams = response;
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
      }
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.player.logo = file;
  }

  onSubmit() {
    const formData = new FormData();
    
    formData.append('FirstName', this.player.firstName);
    formData.append('LastName',  this.player.lastName);
    formData.append('Age', this.player.age.toString());
    formData.append('Position',  this.player.position);
    formData.append('Nationality',  this.player.nationality);
    formData.append('TeamId',  this.player.teamId.toString());
    
    if (this.player.logo) {
      formData.append('logo', this.player.logo);
    }
    this.playerService.addPlayer(formData).subscribe({
      next: (response) => {
        console.log('Player added successfully:', response);
        this.playerAdded.emit();
        this.resetForm();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error adding player:', error);
      }
    });
  
  }


  closeModal() {
    this.resetForm(); 
    this.close.emit();
  }
  resetForm() {
    this.player = {
        firstName: '',
        lastName: '',
        age: 0,
        position: '',
        nationality: '',
        teamId: 0,
        logo: null
    };
}
}
