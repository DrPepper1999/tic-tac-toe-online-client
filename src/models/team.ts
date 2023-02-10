import { Mark } from './player';
export interface ITeam {
    id: string,
    playerIds: string[],
    mark: Mark,
    score: number,
    isTeamTurn: boolean,

    createdDateTime: Date | null,
    updateDateTime: Date | null
}