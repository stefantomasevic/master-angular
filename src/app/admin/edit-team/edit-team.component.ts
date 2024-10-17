import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamManipulation } from 'src/app/models/teamManipulation';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent {
  

  teamData:Team=new Team(0,'','','','','','',null);
  teamId: number = 0;
   

  



  constructor(private teamService: TeamService, private route: ActivatedRoute,private router: Router) {
    
  }
   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      
    });
      this.selectTeamById();
  }
  

    selectTeamById(){
        this.teamService.selectTeamById(this.teamId).subscribe({
          next: (team) => {
            this.teamData = team;
           
         console.log('Team selected:', team);
        
        },
          error: (error) => {
            console.error('Error selected team:', error);
          }
        });
    }
    

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.teamData.logo = file;
  }

   getImageUrl(imagePath: string): string {
   
   if (!imagePath) {
    return ''; // Povratak praznog niza ako nema slike, da ne bi vracao 404 not found
  }
     const baseUrl = 'http://localhost:5053/';
    return `${baseUrl}${imagePath}`;
   }

  editTeam(){
    const formData = new FormData();
    formData.append('name', this.teamData.name);
    formData.append('city', this.teamData.city);
    formData.append('country', this.teamData.country);
    formData.append('coach', this.teamData.coach);
    formData.append('arena', this.teamData.arena);

    if (this.teamData.logo) {
      formData.append('logo', this.teamData.logo);
    } 

    console.log("dosao edit");
    this.teamService.editTeam(this.teamId,formData).subscribe({
      next: (editedTeam) => {
        console.log('Team edited:', editedTeam);
        this.router.navigate(['/']); // Primer: nakon izmene, vrati se na listu timova
      },
      error: (error) => {
        console.error('Error editing team:', error);
      }
    });
  }
}
