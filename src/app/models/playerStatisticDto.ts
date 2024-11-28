import { StatisticDto } from "./statisticDto";

export interface PlayerStatisticDto {
    playerId: number;          // ID igrača
    playerName: string;        // Ime i prezime igrača
     statistics: StatisticDto;  // Statistika igrača
  }