import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ScheduleStatisticDto } from 'src/app/models/scheduleStatisticDto';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection | undefined;
  private statisticsSubject: BehaviorSubject<ScheduleStatisticDto | null> = new BehaviorSubject<ScheduleStatisticDto | null>(null);
  public statistics$ = this.statisticsSubject.asObservable();

  constructor() { }

  // Povezivanje na SignalR Hub
  startConnection(): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:17772/hubs/StatisticHub') // URL SignalR hub-a sa backend servera
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started'))
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  // Slušanje na događaj sa servera
  listenForStatisticsUpdates(): void {
    if (this.hubConnection) {
      this.hubConnection.on('StatisticsUpdated', (updatedStatistics: ScheduleStatisticDto) => {
        console.log('Received updated statistics: ', updatedStatistics);
        this.statisticsSubject.next(updatedStatistics); // Emitujte ažurirane podatke
      });
    }
  }

  // Zaustavljanje SignalR veze
  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('SignalR connection stopped'));
    }
  }
}
