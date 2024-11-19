import { Component, OnInit } from '@angular/core';
import { PlayerData } from '../../models/player-data.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/player.Service'; // Verifique se o caminho está correto
import { MatIconModule } from '@angular/material/icon'


@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit {
  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;
  profileIconId: number = 0;
  isFavorite: boolean = false;
  isUpdate : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    // URL params
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
      this.riotId = params['riotId'];
      this.profileIconId = params['profileIconId']
      // Service
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe(
        (data: PlayerData) => {

          
          this.playerData = data;
        },
        (error) => {
          console.error('Erro ao carregar dados do jogador:', error);
        }
      );
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // console.log('favoritado')
  }

  notifyUpdate(): void {
    this.playerService.notifyTableUpdate();
  }
}
