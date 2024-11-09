import { Routes } from '@angular/router';

// Component Pages
import { HomeComponent } from './features/home/home.component';
import { SummonerComponent } from './features/summoner/summoner.component';

export const routes: Routes = [
    {path: '',component: HomeComponent},

    {path: 'summoner/:nickname/:riotId',component: SummonerComponent}
];
