import { createClient, isConfigured } from './supabase/server';
import { demoBoard, demoSquares, roster } from './demo';
import type { Board, Square, Player } from './types';

export async function getLatestBoard(): Promise<{ board: Board; squares: Square[]; players: Player[] }> {
  if (!isConfigured()) return { board: demoBoard, squares: demoSquares, players: roster };
  const supabase = await createClient();
  const { data: board, error } = await supabase.from('boards').select('*').in('status', ['open','closed','complete']).order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (error || !board) return { board: demoBoard, squares: demoSquares, players: roster };
  return getBoardBySlug(board.slug);
}

export async function getBoardBySlug(slug: string): Promise<{ board: Board; squares: Square[]; players: Player[] }> {
  if (!isConfigured()) return { board: demoBoard, squares: demoSquares, players: roster };
  const supabase = await createClient();
  const { data: board } = await supabase.from('boards').select('*').eq('slug', slug).single();
  if (!board) return { board: demoBoard, squares: demoSquares, players: roster };
  const [{ data: squares }, { data: players }] = await Promise.all([
    supabase.from('squares').select('*, player:players(*)').eq('board_id', board.id).order('row_index').order('col_index'),
    supabase.from('players').select('*').eq('active', true).order('jersey_number')
  ]);
  return { board: board as Board, squares: (squares ?? []) as Square[], players: (players ?? []) as Player[] };
}
