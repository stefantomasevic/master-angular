import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerSatistic } from 'src/app/models/playerStatistic';
import { ScheduleStatisticDto } from 'src/app/models/scheduleStatisticDto';
import { SignalRService } from 'src/app/services/signalR/signal-r.service';
import { StatisticService } from 'src/app/services/statistic/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {

  constructor(private statisticsService: StatisticService, private route: ActivatedRoute, private signalRService: SignalRService) {}

  teamTitle: string = 'Domaćin';
  displayedPlayers: PlayerSatistic[] = [];
  scheduleStatistics: ScheduleStatisticDto | null | undefined = null;
  selectedTeam: 'home' | 'guest' = 'home';
  scheduleId: number | undefined = undefined;
  noDataAvailable: boolean = false; // Flag to show "No data available"

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async params => {
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
        this.processScheduleStatistics(); // Process updated data
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

  ngOnDestroy(): void {
    this.signalRService.stopConnection(); // Clean up SignalR connection when component is destroyed
  }
}
