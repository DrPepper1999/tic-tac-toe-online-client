import { Mark } from './../player';
export interface IMap {
    id: string,
    fields: Array<Array<Mark>>,
    size: number,
    isAllCellFilled: boolean,
    createdDateTime: Date | null,
    updateDateTime: Date | null
}