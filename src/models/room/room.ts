import { IGame } from './game';

export interface IRoom {
    id: string,
    password: string,
    status: RoomStatus,
    playersForStart: number,
    gameResult: GameResult,
    game: IGame,
    score: { my: 0, enemy: 0 }
    createdDateTime: Date | null,
    updateDateTime: Date | null
}

export type RoomStatus = "Init" | "Wait" | "Run" | "End" | null;
export type GameResult = "Draw" | "CrossWin" | "CircleWin" | null;
