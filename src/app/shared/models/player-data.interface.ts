export interface MatchHistory {
    date: string;
    result: 'win' | 'loss';
    duration: number;
    gameMode: string;
    champion: string;
    kda: string;
  }
  
  export interface PlayerData {
    nickname: string;
    riotId: string;
    matchHistory: MatchHistory[];
  }