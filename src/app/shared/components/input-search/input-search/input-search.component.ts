
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BtnSearchComponent } from "../../btn-search/btn-search/btn-search.component";
import { PlayerService } from '../../../../core/services/player.Service';  // Importe seu serviço de API


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

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule, CommonModule, BtnSearchComponent],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  searchQuery: string = '';  // Variável para armazenar o texto do campo de busca
  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;  // Dados do jogador, incluindo o histórico de partidas

  constructor(private playerService: PlayerService) {}

  onSearch() {
    const parts = this.searchQuery.split('#');
    if (parts.length === 2) {
      this.nickname = parts[0].trim();  // Nome do invocador (antes do #)
      this.riotId = parts[1].trim();    // Riot ID (depois do #)

      // Chama a função de busca para obter os dados do jogador e o histórico
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe((data: PlayerData) => {
        this.playerData = data;  // Armazena os dados do jogador
      }, error => {
        console.error('Erro ao buscar dados do jogador', error);
      });
    } else {
      console.error('Formato inválido. Use "nomeDoInvocador#riotID".');
    }
  }

 
}
