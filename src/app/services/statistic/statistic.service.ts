import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleStatisticDto } from 'src/app/models/scheduleStatisticDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {


  private apiUrl = environment.apiUrl+'/statistic/getStatisticByScheduleId';

  
  

  constructor(private http: HttpClient) { }

  getStatisticsByScheduleId(scheduleId: number): Observable<ScheduleStatisticDto> {
    return this.http.get<ScheduleStatisticDto>(`${this.apiUrl}/${scheduleId}`);
  }
}
