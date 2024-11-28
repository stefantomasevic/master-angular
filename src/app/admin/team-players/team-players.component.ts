import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/models/player';
import { ModalService } from 'src/app/services/modal.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {
  
  players: Player []=[];
  teamId : number = 0;
  modalVisible = false;
  private apiUrl = environment.apiUrl;
  isLoggedIn: boolean = false;
  

  constructor( private playerService:PlayerService, private route: ActivatedRoute, private modalService:ModalService) {
    
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      this.isLoggedIn = !!localStorage.getItem('token');
      
    });
    this.getPlayers();
  }
  
  getPlayers(){
    this.playerService.getPlayersByTeamId(this.teamId).subscribe(players=>{
      this.players=players;
      console.log(this.players);
    })
  }
  
  getImageUrl(imagePath: string): string {
    // const baseUrl = 'https://euroleague-api-master.onrender.com/';
    const baseUrl = this.apiUrl.substring(0, this.apiUrl.lastIndexOf('api'));;
    return `${baseUrl}${imagePath}`;
  }
  openModal() {
    this.modalVisible = true;
  } 
  closeModal() {
    this.modalVisible = false;
  }
  onPlayerAdded() {
    this.getPlayers(); 
  }

}
