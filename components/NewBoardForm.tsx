'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
function slugify(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
export default function NewBoardForm({disabled=false}:{disabled?:boolean}){
  const [saving,setSaving]=useState(false);const [error,setError]=useState('');const router=useRouter();
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(disabled)return;setSaving(true);setError('');const f=new FormData(e.currentTarget);const title=String(f.get('title'));const supabase=createClient();
    const payouts={q1:Number(f.get('q1')),half:Number(f.get('half')),q3:Number(f.get('q3')),final:Number(f.get('final'))};
    const {data:board,error:be}=await supabase.from('boards').insert({title,slug:`${slugify(title)}-${Date.now().toString().slice(-6)}`,team_a:f.get('team_a'),team_b:f.get('team_b'),game_date:f.get('game_date')||null,price:Number(f.get('price')),payouts,status:'draft',axis_a:[0,1,2,3,4,5,6,7,8,9],axis_b:[0,1,2,3,4,5,6,7,8,9],numbers_locked:false,quarter_scores:{}}).select().single();
    if(be||!board){setError(be?.message??'Could not create board');setSaving(false);return}
    const rows=Array.from({length:100},(_,i)=>({board_id:board.id,row_index:Math.floor(i/10),col_index:i%10,buyer_name:null,player_id:null,paid:false,notes:null}));
    const {error:se}=await supabase.from('squares').insert(rows);if(se){setError(se.message);setSaving(false);return}router.push(`/admin/boards/${board.id}`);router.refresh();
  }
  return <form onSubmit={submit} className="panel"><div className="form-grid">
    <div className="field"><label>Board name</label><input name="title" required defaultValue="Super Bowl LXI"/></div>
    <div className="field"><label>Game date</label><input name="game_date" type="date"/></div>
    <div className="field"><label>Team 1</label><input name="team_a" required placeholder="Buffalo Bills"/></div>
    <div className="field"><label>Team 2</label><input name="team_b" required placeholder="Detroit Lions"/></div>
    <div className="field"><label>Price per square (CAD)</label><input name="price" type="number" min="0" step="1" defaultValue="50"/></div><div/>
    <div className="field"><label>1st Quarter payout</label><input name="q1" type="number" min="0" defaultValue="375"/></div>
    <div className="field"><label>Halftime payout</label><input name="half" type="number" min="0" defaultValue="500"/></div>
    <div className="field"><label>3rd Quarter payout</label><input name="q3" type="number" min="0" defaultValue="375"/></div>
    <div className="field"><label>Final payout</label><input name="final" type="number" min="0" defaultValue="1250"/></div>
  </div><div style={{height:18}}/><button className="btn btn-primary" disabled={saving||disabled}>{disabled?'Connect Supabase to save':saving?'Creating…':'Create Board'}</button>{error?<p className="small">{error}</p>:null}</form>
}
