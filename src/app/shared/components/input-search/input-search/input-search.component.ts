
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  nickname: string = '';
  riotId: string = '';
  playerData: { nickname: string; riotId: string } | null = null;

  onSearch() {
    if (this.nickname && this.riotId) {
      // Aqui você pode integrar com uma API que busque as informações do jogador.
      // Por enquanto, estamos simulando a resposta.

      this.playerData = {
        nickname: this.nickname,
        riotId: this.riotId
      };

      console.log('Jogador encontrado:', this.playerData);
    } else {
      alert('Por favor, preencha tanto o Nome quanto o Riot ID.');
    }
  }
}
