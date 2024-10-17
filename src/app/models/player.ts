export class Player{
    id: number;
    firstname: string;
    lastname: string;
    age: number;
    position: string;
    nationality: string;
    imagePath: string;
  
   
    
    constructor(  id: number, firstname: string,lastname: string,age: number,position: string,nationality: string,imagePath: string) {
        this.id=id,
        this.firstname=firstname,
        this.lastname=lastname,
        this.age=age,
        this.position=position,
        this.nationality=nationality,
        this.imagePath=imagePath
    }

}