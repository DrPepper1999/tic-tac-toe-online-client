import { HubConnection } from '@microsoft/signalr';


export interface IConnectionInfo {
    connection: HubConnection | null,
    isSuccessConnection: boolean,
    errors: Array<string>
}