
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BtnSearchComponent } from "../../btn-search/btn-search/btn-search.component";
import { PlayerService } from '../../../../core/services/player.Service';  // Importe seu serviço de API
import { PlayerData } from '../../../models/player-data.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule, CommonModule, BtnSearchComponent],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})


export class InputSearchComponent {
  searchQuery: string = '';  //Campo de busca
  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;  // Dados do jogador

  constructor(private playerService: PlayerService, private router: Router) {}

// Formatar tempo 
formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);      // Calcula os minutos
  const remainingSeconds = seconds % 60;         // Calcula os segundos restantes
  return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`; // Formata para mm:ss
}

// Adicionar 0 esquerda
padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`; // Adiciona o zero à esquerda se necessário
}

  onSearch() {
    const parts = this.searchQuery.split('#');
    if (parts.length === 2) {
      this.nickname = parts[0].trim();  // Nome do invocador (antes do #)
      this.riotId = parts[1].trim();    // Riot ID (depois do #)

      // Chama a função de busca para obter os dados do jogador e o histórico
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe((data: PlayerData) => {
        this.playerData = data;  // Armazena os dados do jogador

        //Redireciona a rota url
        this.router.navigate(['/summoner', this.nickname, this.riotId]);

      }, error => {
        console.error('Erro ao buscar dados do jogador', error);
      });
    } else {
      console.error('Formato inválido. Use "nomeDoInvocador#riotID".');
    }
  }

 
}
