import { IMap } from './map';
import { Mark } from './../../components/pages/Game/Mark/Mark';
import { IGame } from './game';

export interface IRoom {
    id: string,
    name: string,
    password: string,
    status: RoomStatus,
    playerIds: string[],
    teamIds: string[],
    gameSetting: IGameSetting,
    gameResult: GameResult,
    score: { my: 0, enemy: 0 }
    createdDateTime: Date | null,
    updateDateTime: Date | null
}

export interface IGameSetting {
    mapSize: number,
    maxPlayers: number,
    teamCount: number,
};
export type RoomStatus = "Init" | "Wait" | "Run" | "End" | null;
export type GameResult = "Draw" | "CrossWin" | "CircleWin" | null;
