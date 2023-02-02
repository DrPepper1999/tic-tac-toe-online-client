export interface IMap {
    id: string,
    fields: Array<Array<string>>,
    size: number,
    isAllCellFilled: boolean,
    createdDateTime: Date | null,
    updateDateTime: Date | null
}