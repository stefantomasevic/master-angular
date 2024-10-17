import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayerDto } from 'src/app/models/playerDto';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:5053/api/Player';


  constructor(private http: HttpClient) { }


  getPlayersByTeamId(teamId:number):Observable<Player[]>{

    return  this.http.get<Player[]>(`${this.apiUrl}/team/${teamId}`);

  }

  addPlayer(playerDto: FormData) {
    return this.http.post<PlayerDto>(`${this.apiUrl}/PostPlayer`, playerDto)
      .pipe(
        catchError(error => {
          console.error('Error adding player:', error);
          return throwError(error);
        })
      );
  }
  
}
