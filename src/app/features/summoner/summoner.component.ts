import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../core/services/player.Service';
import { PlayerData } from '../../shared/models/player-data.interface';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../shared/components/navbar/navbar/navbar.component";
import { HistoryPlayerComponent } from "../../shared/components/history-player/history-player.component";

@Component({
  selector: 'app-summoner',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HistoryPlayerComponent ],
  templateUrl: './summoner.component.html' ,
  styleUrl: './summoner.component.scss'
})
export class SummonerComponent implements OnInit{
  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ){}

  ngOnInit(){
    // Parametros da rota
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
      this.riotId = params['riotId'];

      // Dados dos players
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe((data: PlayerData) => {
        this.playerData = data;
      }, error => {
        console.error('Erro ao buscar dados do jogador', error)
      });
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
