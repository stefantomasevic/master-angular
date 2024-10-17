import { SafeUrl } from "@angular/platform-browser";

export class Team {
    id: number;
    name: string;
    city: string;
    country: string;
    coach: string;
    arena: string;
    logoPath: string;
    logo: File | null;
  
   
    
    constructor(  id: number, name: string,city: string,country: string,coach: string,arena: string,logoPath: string, logo: File | null) {
        this.id=id,
        this.name=name,
        this.city=city,
        this.country=country,
        this.coach=coach,
        this.arena=arena,
        this.logoPath=logoPath,
        this.logo = logo
    }

   
    
 
}
