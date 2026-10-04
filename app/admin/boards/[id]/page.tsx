import AdminShell from '@/components/AdminShell';
import BoardEditor from '@/components/BoardEditor';
import { requireAdmin } from '@/lib/admin';
import { createClient, isConfigured } from '@/lib/supabase/server';
import { demoBoard, demoSquares, roster } from '@/lib/demo';
import type { Board, Player, Square } from '@/lib/types';

export default async function ManageBoard({params}:{params:Promise<{id:string}>}){
  const auth=await requireAdmin();const {id}=await params;
  let board:Board=demoBoard,squares:Square[]=demoSquares,players:Player[]=roster;
  if(isConfigured()){
    const s=await createClient();
    const [{data:b},{data:sq},{data:p}]=await Promise.all([
      s.from('boards').select('*').eq('id',id).single(),
      s.from('squares').select('*, player:players(*)').eq('board_id',id).order('row_index').order('col_index'),
      s.from('players').select('*').eq('active',true).order('jersey_number')
    ]);
    if(b) board=b as Board;if(sq) squares=sq as Square[];if(p) players=p as Player[];
  }
  return <AdminShell><BoardEditor initialBoard={board} initialSquares={squares} players={players} disabled={auth.demo}/></AdminShell>
}
