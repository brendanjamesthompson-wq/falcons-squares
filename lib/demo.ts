import type { Board, Player, Square } from './types';

export const roster: Player[] = [
  [17,'Dexter'],[6,'Henry'],[8,'Silas'],[9,'Mason'],[10,'George'],[13,'Hudson'],
  [14,'Bryson'],[22,'Colton'],[23,'Eli'],[26,'Jacob'],[27,'Ben'],[37,'Alex']
].map(([jersey_number, first_name]) => ({
  id: String(jersey_number), jersey_number: Number(jersey_number), first_name: String(first_name), active: true
}));

export const demoBoard: Board = {
  id: 'demo',
  slug: 'super-bowl-demo',
  title: 'Super Bowl Squares',
  team_a: 'Team A',
  team_b: 'Team B',
  game_date: null,
  price: 50,
  payouts: { q1: 375, half: 500, q3: 375, final: 1250 },
  axis_a: [7,2,9,0,5,1,8,3,6,4],
  axis_b: [4,8,1,5,9,0,7,3,2,6],
  numbers_locked: true,
  status: 'open',
  quarter_scores: {}
};

const demoNames = ['Matteo','Paul','Kathy','Chris','Sarah','Mike','Dave','Jennifer','Rob','Amanda','Steve','Nicole'];
export const demoSquares: Square[] = Array.from({ length: 100 }, (_, i) => {
  const row = Math.floor(i / 10), col = i % 10;
  const sold = i % 4 !== 2;
  return {
    id: `d-${i}`,
    board_id: 'demo',
    row_index: row,
    col_index: col,
    buyer_name: sold ? `${demoNames[i % demoNames.length]} ${i + 1}` : null,
    player_id: sold ? roster[i % roster.length].id : null,
    paid: sold ? i % 5 !== 0 : false,
    notes: null,
    player: sold ? roster[i % roster.length] : null
  };
});
