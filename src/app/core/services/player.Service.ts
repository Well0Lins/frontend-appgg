import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PlayerData } from '../../shared/models/player-data.interface';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private updateTableSubject = new Subject<void>();
  updateTable$ = this.updateTableSubject.asObservable();

  getPlayerData(nickname: string, riotId: string): Observable<PlayerData> {

    const mockData: PlayerData = {
      nickname: nickname,
      riotId: riotId,
      profileIconId: 978,
      matchHistory: [
          
        {
          date: '2024-11-06', // need url icon profile
          result: 'win',
          duration: 1524,
          gameMode: 'Aram',
          champion: 'Ekko',
          kda: '21/13/26',
          
    
        },
        {
          date: '2024-11-6',
          result: 'loss',
          duration: 2124, 
          gameMode: 'Flex',
          champion: 'Kindred',
          kda: '18/10/5',
          

        },
        {
          date: '2024-11-5',
          result: 'win',
          duration: 2310, 
          gameMode: 'Flex',
          champion: 'Ekko',
          kda: '18/3/13',
          

        },
        {
          date: "2024-11-07",
          result: "win",
          duration: 1782,
          gameMode: "SoloQ",
          champion: "Zed",
          kda: "12/4/8",
          

        },
        {
          date: "2024-11-07",
          result: "loss",
          duration: 1940,
          gameMode: "Aram",
          champion: "Sivir",
          kda: "10/9/14",
         

        },
        {
          date: "2024-11-04",
          result: "win",
          duration: 2200,
          gameMode: "Flex",
          champion: "Lux",
          kda: "15/2/12",
          

        },
        {
          date: "2024-11-03",
          result: "win",
          duration: 1890,
          gameMode: "Aram",
          champion: "Miss Fortune",
          kda: "22/6/10",
         

        },
        {
          date: "2024-11-02",
          result: "loss",
          duration: 2500,
          gameMode: "SoloQ",
          champion: "Thresh",
          kda: "5/9/23",
          

        },
        {
          date: "2024-11-01",
          result: "win",
          duration: 2100,
          gameMode: "Flex",
          champion: "LeBlanc",
          kda: "14/5/9",
          

        }
      ]
    };

    /*
     const url = ``;  //
     return this.http.get<PlayerData>(url);
    */

    
    return of(mockData);
  }

  notifyTableUpdate(): void {
    this.updateTableSubject.next();
  }
}