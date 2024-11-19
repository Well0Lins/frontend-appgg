import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../core/services/player.Service'; 
import { PlayerData } from '../../models/player-data.interface'; 

@Component({
  selector: 'app-history-player',
  standalone: true,  
  imports: [CommonModule,], 
  templateUrl: './history-player.component.html',
  styleUrls: ['./history-player.component.scss']
})
export class HistoryPlayerComponent implements OnInit, OnDestroy {

  nickname: string = '';
  riotId: string = '';
  playerData: PlayerData | null = null;
  loading: boolean = true;
  error: boolean = false;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {

    // Event att
    this.subscription.add(
      this.playerService.updateTable$.subscribe(() => {
        this.loadPlayerData(); // recarregar os dados
      })
    )

    // Url params
    this.route.params.subscribe(params => {
      this.nickname = params['nickname'];
      this.riotId = params['riotId'];
      this.loadPlayerData();

      // Service
      this.playerService.getPlayerData(this.nickname, this.riotId).subscribe(
        (data: PlayerData) => {
          
          this.playerData = { 
            ...data,
            
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

  loadPlayerData(): void {
    this.loading = true;
    this.error = false;

    this.playerService.getPlayerData(this.nickname, this.riotId).subscribe(
      (data: PlayerData) => {
        this.playerData = { 
          ...data,
          matchHistory: data.matchHistory ?? []  
        };
        this.loading = false;
        console.log('Att table')
      },
      (error) => {
        console.error('Erro ao buscar dados do jogador', error);
        this.error = true;
        this.loading = false;
      }

    );
  }

  ngOnDestroy(): void {
    // Evitar vazamentos de memória
    this.subscription.unsubscribe();
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
