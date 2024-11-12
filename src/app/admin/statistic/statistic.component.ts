import { Component } from '@angular/core';
import { PlayerSatistic } from 'src/app/models/playerStatistic';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  teamTitle: string = 'Domaćin';
  displayedPlayers: PlayerSatistic[] = [];

  // Podaci za domaćina
  homePlayers: PlayerSatistic[] = [
    { name: 'Marko Petrović', points: 15, assists: 5, rebounds: 7, fouls: 2 },
    { name: 'Nikola Jovanović', points: 20, assists: 3, rebounds: 10, fouls: 3 },
    { name: 'Petar Ilić', points: 8, assists: 7, rebounds: 4, fouls: 1 }
  ];

  // Podaci za goste
  guestPlayers: PlayerSatistic[] = [
    { name: 'Ivan Marković', points: 12, assists: 6, rebounds: 8, fouls: 2 },
    { name: 'Stefan Antić', points: 18, assists: 4, rebounds: 5, fouls: 3 },
    { name: 'Jovan Simić', points: 10, assists: 2, rebounds: 6, fouls: 1 }
  ];

  ngOnInit(): void {
    this.showHome();
  }

  // Funkcija za prikaz domaćina
  showHome(): void {
    this.teamTitle = 'Domaćin';
    this.displayedPlayers = this.homePlayers;
  }

  // Funkcija za prikaz gostiju
  showGuest(): void {
    this.teamTitle = 'Gost';
    this.displayedPlayers = this.guestPlayers;
  }
}
