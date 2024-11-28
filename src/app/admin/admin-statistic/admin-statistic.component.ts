import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsistsDto } from 'src/app/models/asistsDto';
import { PlayerSatistic } from 'src/app/models/playerStatistic';
import { ScheduleStatisticDto } from 'src/app/models/scheduleStatisticDto';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';
import { StatisticService } from 'src/app/services/statistic/statistic.service';

@Component({
  selector: 'app-admin-statistic',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-statistic.component.html',
  styleUrl: './admin-statistic.component.css'
})
export class AdminStatisticComponent {
  constructor(private statisticsService: StatisticService, private route: ActivatedRoute,private signalRService: SignalRService) {}

  teamTitle: string = 'Domaćin';
  displayedPlayers: PlayerSatistic[] = [];
  scheduleStatistics: ScheduleStatisticDto | null | undefined = null;
  selectedTeam: 'home' | 'guest' = 'home';
  scheduleId: number =0;
  noDataAvailable: boolean = false; // Flag to show "No data available"

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: { [x: string]: string | number; }) => {
      this.scheduleId = +params['id']; // Extract the 'id' parameter from the URL
      if (this.scheduleId) {
        await this.GetStatistic(); // Call GetStatistic with the extracted scheduleId
      }
    });
    this.signalRService.startConnection();
    
    // Start listening for statistics updates
    this.signalRService.listenForStatisticsUpdates();

    // Subscribe to updated statistics from SignalR service
    this.signalRService.statistics$.subscribe(updatedStatistics => {
      if (updatedStatistics && updatedStatistics.scheduleId === this.scheduleId) {
        this.scheduleStatistics = updatedStatistics;
      }
    });
  }

  async GetStatistic() {
    try {
      if (this.scheduleId) {
        const data = await this.statisticsService.getStatisticsByScheduleId(this.scheduleId).toPromise();
        this.scheduleStatistics = data;
        console.log(data); // Print loaded data
        this.processScheduleStatistics(); // Process the data
      }
    } catch (err) {

         this.noDataAvailable = true; 

    }
  }

  processScheduleStatistics(): void {
    if (this.scheduleStatistics) {
      console.log('Učitani podaci:', this.scheduleStatistics);
    }
  }

  selectTeam(team: 'home' | 'guest'): void {
    this.selectedTeam = team;
  }
  async updateAsists(playerId: number, asists: number) {
    const asistDto: AsistsDto = { playerId, asists };
    await this.statisticsService.updateAsists(this.scheduleId, asistDto)
      .subscribe(response => {
        console.log('Asists updated successfully!', response);
      }, error => {
        console.error('Error updating assists:', error);
      });
  }
  async updateRebounds(playerId: number, rebounds: number) {
    const reboundsDto = { playerId, rebounds }; // Kreiranje DTO-a sa odgovarajućim podacima
    await this.statisticsService.updateRebounds(this.scheduleId, reboundsDto) // Poziv servisa za ažuriranje
      .subscribe(response => {
        console.log('Rebounds updated successfully!', response);
      }, error => {
        console.error('Error updating rebounds:', error);
      });
  }
  async updatePoints(playerId: number, points: number, isHomePlayer:boolean) {
    const pointsDto = { playerId, points }; // Kreiranje DTO-a sa odgovarajućim podacima
    await this.statisticsService.updatePoints(this.scheduleId, pointsDto) // Poziv servisa za ažuriranje
      .subscribe(response => {
        console.log('Points updated successfully!', response);
      }, error => {
        console.error('Error updating points:', error);
      });
      console.log(isHomePlayer);

      await this.updateMatch(pointsDto.playerId,pointsDto.points, isHomePlayer);
  }
  async updateFouls(playerId: number, fouls: number) {
    const foulsDto = { playerId, fouls }; // Kreiranje DTO-a sa odgovarajućim podacima
    await this.statisticsService.updateFouls(this.scheduleId, foulsDto) // Poziv servisa za ažuriranje
      .subscribe(response => {
        console.log('Fouls updated successfully!', response);
      }, error => {
        console.error('Error updating fouls:', error);
      });

  }
  async updateMatch(playerId: number, points: number, IsHomePlayer:boolean) {
    const pointsDto = { playerId, points, IsHomePlayer }; // Kreiranje DTO-a sa odgovarajućim podacima
    await this.statisticsService.updateMatch(this.scheduleId, pointsDto) // Poziv servisa za ažuriranje
      .subscribe(response => {
        console.log('Points updated successfully!', response);
      }, error => {
        console.error('Error updating points:', error);
      });
      console.log(IsHomePlayer);
  }
      
  

}
