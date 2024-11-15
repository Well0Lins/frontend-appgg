import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/player.Service'; 
import { PlayerData } from '../../models/player-data.interface'; 

@Component({
  selector: 'app-history-player',
  standalone: true,  
  imports: [CommonModule], 
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
    // Url param
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
      this.riotId = params['riotId'];

      // Service
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe(
        (data: PlayerData) => {
          // Para o matchHistory nunca ser null ou undef
          this.playerData = { 
            ...data,
            // Garantir que matchHistory seja sempre um array
            matchHistory: data.matchHistory ?? []  
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

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
  }

  
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

 
}
