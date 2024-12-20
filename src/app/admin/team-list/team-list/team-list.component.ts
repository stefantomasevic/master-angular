import { Component, ElementRef, EventEmitter } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team/team.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {

  teams:Team[]=[];
  private apiUrl = environment.apiUrl;
  isLoggedIn: boolean = false;


 

  constructor(private teamService:TeamService,private modalService: NgbModal) {
    
  }
  

  ngOnInit(): void {

    this.getTeams();
    this.isLoggedIn = !!localStorage.getItem('token');
  
    
  }


  getTeams(){
    this.teamService.getTeams().subscribe(teams=>{
      console.log(teams);
      this.teams=teams;
    })
  }

  getImageUrl(imagePath: string): string {

    const baseUrl = this.apiUrl.substring(0, this.apiUrl.lastIndexOf('api'));;

    return `${baseUrl}${imagePath}`;
  }
  deleteTeam(teamId: number) {
    this.teamService.deleteTeam(teamId).subscribe(
      {
        next: () => {
          console.log('Team deleted successfully.');
          this.getTeams();
        },
        error: (error) => {
          console.error('Error deleting team:', error);
        }
      }        
    ); 
  }

  openModal(teamId: number) {
    // Dodaj logiku za otvaranje modala sa određenim timom
    // Možeš koristiti teamId u modalu ako je potrebno
    var modal = document.getElementById('deleteModal');
    modal!.style.display = 'block';

    var hiddenInput = document.getElementById('teamIdInput') as HTMLInputElement;
    hiddenInput.value = teamId.toString();
  }

  closeModal() {
    var modal = document.getElementById('deleteModal');
    modal!.style.display = 'none';
  }

  confirmDelete() {

    var hiddenInput = document.getElementById('teamIdInput') as HTMLInputElement;
    const teamId = +hiddenInput.value; 
    // Implementiraj logiku za brisanje tima
    console.log(teamId);
    this.deleteTeam(teamId);
    console.log('Team deleted successfully');
    this.closeModal();
  }
}
