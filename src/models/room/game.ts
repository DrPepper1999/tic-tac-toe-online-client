import { IMap } from './map';
export interface IGame {
    id: string,
    teamIds: string[],
    map: IMap,
    createdDateTime: Date | null,
    updateDateTime: Date | null
}