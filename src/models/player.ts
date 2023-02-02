export interface IPlayer {
    id: string,
    name: string,
    role: Role,
    isAuth: boolean,
    mark: Mark,
    isPlayerTurn: boolean
};

export type Role = "Creator" | "Joined" | null;
export type Mark = "Empty" | "Cross" | "Circle";
