import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importando CommonModule para usar ngIf e ngFor
import { PlayerService } from '../../../core/services/player.Service'; // Serviço do jogador
import { PlayerData } from '../../models/player-data.interface'; // Interface dos dados do jogador

@Component({
  selector: 'app-history-player',
  standalone: true,  // Definir o componente como standalone
  imports: [CommonModule], // Importa CommonModule para usar ngIf, ngFor
  templateUrl: './history-player.component.html',
  styleUrls: ['./history-player.component.scss']
})
export class HistoryPlayerComponent implements OnInit {

  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    // Pegando os parâmetros da URL
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
      this.riotId = params['riotId'];

      // Chamando o serviço para buscar os dados
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe(
        (data: PlayerData) => {
          // Garantir que matchHistory nunca seja null ou undefined
          this.playerData = { 
            ...data,
            matchHistory: data.matchHistory ?? []  // Garantir que matchHistory seja sempre um array
          };
          this.loading = false;
        },
        (error) => {
          console.error('Erro ao buscar dados do jogador', error);
          this.error = true;
          this.loading = false;
        }
      );
    });
  }

  // Função de formatação de duração
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  // Função para adicionar zero à frente se o valor for menor que 10
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

 
}
