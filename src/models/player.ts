export interface IPlayer {
    id: string,
    name: string,
    role: Role,
    profileImage: string | null,
    isPlayerTurn: boolean
};

export type Role = "Creator" | "Joined" | null;
export type Mark = "Empty" | "Cross" | "Circle";
