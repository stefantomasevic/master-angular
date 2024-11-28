import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsistsDto } from 'src/app/models/asistsDto';
import { FoulsDto } from 'src/app/models/foulsDto';
import { PointsDto } from 'src/app/models/pointsDto';
import { ReboundsDto } from 'src/app/models/reboundsDto';
import { ScheduleStatisticDto } from 'src/app/models/scheduleStatisticDto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {


  private apiUrl = environment.apiUrl+'/statistic';

  
  

  constructor(private http: HttpClient) { }

  getStatisticsByScheduleId(scheduleId: number): Observable<ScheduleStatisticDto> {
    return this.http.get<ScheduleStatisticDto>(`${this.apiUrl}/getStatisticByScheduleId/${scheduleId}`);
  }
  updateAsists(scheduleId: number, asistDto: AsistsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateAsists/${scheduleId}`, asistDto);
  }

  // PUT za ažuriranje poena
  updatePoints(scheduleId: number, pointsDto: PointsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePoints/${scheduleId}`, pointsDto);
  }

  // PUT za ažuriranje faula
  updateFouls(scheduleId: number, foulsDto: FoulsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateFouls/${scheduleId}`, foulsDto);
  }

  // PUT za ažuriranje skokova
  updateRebounds(scheduleId: number, reboundsDto: ReboundsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateRebounds/${scheduleId}`, reboundsDto);
  }
  updateMatch(scheduleId: number, pointsDto: PointsDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateGame/${scheduleId}`, pointsDto);
  }
}
