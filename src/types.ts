
export enum CardTypes {
    culture = "culture",
    production = "production",
    utility = "utility",
    deed = "deed"
}
export enum LocationTypes {
  core = "core",
  deed = "deed",
  advanced = "advanced"
}
export const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
export type Room = {
      author: string,
      name: string,
      password: string,
      players: number,
      difficult: boolean,
      publico: boolean,
      users: string[],
    };

export type Card = {
    id:string,
    name:string,
    value:number,
    active:boolean,
    stars:number,
    type:CardTypes
  };

export type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards:(Card | undefined)[];
    stars: number;
    first: boolean;
    color: number;
    cursor: {
        x: number,
        y: number
      } | null
  };
  
export type PresenceRoom = {
    focusedId: string | null;
    username: string;
    check: boolean;
    color: number;
    cursor: {
      x: number,
      y: number
    } | null
  };

export type Logo = {
    check: boolean;
  };