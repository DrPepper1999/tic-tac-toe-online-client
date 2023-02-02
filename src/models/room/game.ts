import { IMap } from './map';
export interface IGame {
    id: string,
    playerTurnId: string,
    map: IMap,
    playerIds: Array<string>,
    createdDateTime: Date | null,
    updateDateTime: Date | null
}