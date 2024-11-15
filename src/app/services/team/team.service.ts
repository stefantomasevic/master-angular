import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { TeamManipulation } from 'src/app/models/teamManipulation';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // private apiUrl = 'https://euroleague-api-master.onrender.com/api/Team';
  private apiUrl = environment.apiUrl+ '/Team';
  

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }
  addTeam(formData: FormData): Observable<Team> {
    console.log(formData);
    return this.http.post<Team>(`${this.apiUrl}/postTeam`, formData);
  }

  selectTeamById(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${teamId}`);
  }
  editTeam(id: number, formData: FormData): Observable<Team> {
    console.log(formData);
    return this.http.put<Team>(`${this.apiUrl}/${id}`, formData);
  }
  deleteTeam(id:number){
    return this.http.delete<Team>(`${this.apiUrl}/${id}`);
  }
}
