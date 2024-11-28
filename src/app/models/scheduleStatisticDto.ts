import { PlayerStatisticDto } from "./playerStatisticDto";


export interface ScheduleStatisticDto {
    scheduleId: number;        // ID rasporeda
    homeScore: number;         // Rezultat domaćeg tima
    guestScore: number;        // Rezultat gostujućeg tima
    homeTeam: string;          // Naziv domaćeg tima
    guestTeam: string;         // Naziv gostujućeg tima
    homePlayers: PlayerStatisticDto[]; // Lista igrača domaćeg tima sa statistikom
    guestPlayers: PlayerStatisticDto[]; // Lista igrača gostujućeg tima sa statistikom
  }