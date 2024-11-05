

export interface ScheduleDto {
    id: number;           // ID utakmice
    homeId: number;      // ID domaćina
    homeTeam: string;      // Domaći tim
    guestId: number;     // ID gosta
    guestTeam: string;     // Gosti tim
    gameTime: Date;      // Vreme utakmice
    homeScore?: number;  // Rezultat domaćina (opciono)
    guestScore?: number;
    homeLogo: string;
    guestLogo:string;
  }