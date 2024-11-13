import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   ScheduleDto } from '../models/scheduleDto';
import { Observable } from 'rxjs';
import { CreateScheduleDto } from '../models/createScheduleDto';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://euroleague-api-master.onrender.com/api/Schedule';

  
  

  constructor(private http: HttpClient) { }

  getSchedule(selectedDate:Date): Observable<ScheduleDto[]> {
    const formatedDate = selectedDate.toISOString().slice(0, 10);
    return this.http.get<ScheduleDto[]>(`${this.apiUrl}/${formatedDate}`);
}
createSchedule(data: CreateScheduleDto) : Observable<CreateScheduleDto>  {
  return this.http.post<CreateScheduleDto>(`${this.apiUrl}/createSchedule`, data);
}





}
