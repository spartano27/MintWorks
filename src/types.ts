export enum CardTypes {
    culture = "culture",
    production = "production",
    utility = "utility",
    deed = "deed"
}

export type Presence = {
    focusedId: string | null;
    username: string;
    mint: number;
    cards: any[];
    stars: number;
    first: boolean;
    cursor: {
        x: number,
        y: number
      } | null
  };

  
export type PresenceRoom = {
    focusedId: string | null;
    username: string;
    check: boolean;
    cursor: {
      x: number,
      y: number
    } | null
  };

export type Logo = {
    check: boolean;
  };