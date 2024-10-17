import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  teamData = {
    name: '',
    city: '',
    country: '',
    coach: '',
    arena: '',
    logo: null
  };
 


  constructor(private teamService: TeamService,private router: Router) {
     
  }
   ngOnInit(): void {

  }
  addNewTeam(){
    const formData = new FormData();
    formData.append('name', this.teamData.name);
    formData.append('city', this.teamData.city);
    formData.append('country', this.teamData.country);
    formData.append('coach', this.teamData.coach);
    formData.append('arena', this.teamData.arena);

  if (this.teamData.logo) {
    formData.append('logo', this.teamData.logo);
  }
      this.teamService.addTeam(formData).subscribe({
        next: (formData) => {
       console.log('Team created successfully:', formData);
       this.router.navigate(['/']);
      },
        error: (error) => {
          console.error('Error creating team:', error);
        }
      });
    
    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      this.teamData.logo = file;
    }


}


