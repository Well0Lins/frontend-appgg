import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';  // 'of' é usado para retornar um Observable com dados mockados

interface MatchHistory {
  date: string;
  result: 'win' | 'loss';
  duration: number;
  gameMode: string;
  champion: string;
  kda: string;
}

interface PlayerData {
  nickname: string;
  riotId: string;
  matchHistory: MatchHistory[];
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() {}

  // Função simulada para retornar os dados do jogador
  getPlayerData(nickname: string, riotId: string): Observable<PlayerData> {
    // Simulando os dados que a API retornaria
    const mockData: PlayerData = {
      nickname: nickname,
      riotId: riotId,
      matchHistory: [
        {
          date: '2024-11-06',
          result: 'win',
          duration: 1524, // 30 minutos em segundos
          gameMode: 'Aram',
          champion: 'Ekko',
          kda: '21/13/26'
        },
        {
          date: '2024-11-6',
          result: 'loss',
          duration: 2124, // 33 minutos e 20 segundos em segundos
          gameMode: 'Flex',
          champion: 'Kindred',
          kda: '18/10/5'
        },
        {
          date: '2024-11-5',
          result: 'win',
          duration: 2310, // 25 minutos em segundos
          gameMode: 'Flex',
          champion: 'Ekko',
          kda: '18/3/13'
        }
      ]
    };

    // Retornando o dado mockado usando 'of()' para simular um Observable
    return of(mockData);
  }
}