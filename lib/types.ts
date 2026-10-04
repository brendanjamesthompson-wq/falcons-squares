export type Player = {
  id: string;
  jersey_number: number;
  first_name: string;
  active: boolean;
};

export type Board = {
  id: string;
  slug: string;
  title: string;
  team_a: string;
  team_b: string;
  game_date: string | null;
  price: number;
  payouts: { q1: number; half: number; q3: number; final: number };
  axis_a: number[];
  axis_b: number[];
  numbers_locked: boolean;
  status: 'draft' | 'open' | 'closed' | 'complete';
  quarter_scores: {
    q1?: [number, number];
    half?: [number, number];
    q3?: [number, number];
    final?: [number, number];
  };
  created_at?: string;
};

export type Square = {
  id: string;
  board_id: string;
  row_index: number;
  col_index: number;
  buyer_name: string | null;
  player_id: string | null;
  paid: boolean;
  notes: string | null;
  player?: Player | null;
};
