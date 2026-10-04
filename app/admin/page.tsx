import Link from 'next/link';
import AdminShell from '@/components/AdminShell';
import { requireAdmin } from '@/lib/admin';
import { createClient, isConfigured } from '@/lib/supabase/server';

export default async function AdminHome(){
  const auth=await requireAdmin();
  let boards:any[]=[];
  if(isConfigured()){const s=await createClient();const {data}=await s.from('boards').select('*').order('created_at',{ascending:false});boards=data??[]}
  return <AdminShell><div className="toolbar"><div><div className="eyebrow">Falcons Squares</div><h1>Boards</h1></div><Link className="btn btn-primary" href="/admin/boards/new">+ Create Board</Link></div>
  {auth.demo?<div className="notice">Demo mode is active. The interface is ready, but saving requires the Supabase setup included with the project.</div>:null}
  <div className="panel"><table className="table"><thead><tr><th>Board</th><th>Matchup</th><th>Status</th><th>Price</th><th></th></tr></thead><tbody>
  {boards.length?boards.map(b=><tr key={b.id}><td><strong>{b.title}</strong></td><td>{b.team_a} vs. {b.team_b}</td><td>{b.status}</td><td>${Number(b.price).toFixed(0)}</td><td><Link href={`/admin/boards/${b.id}`}>Manage →</Link></td></tr>):<tr><td colSpan={5}>No saved boards yet. Create the first one.</td></tr>}
  </tbody></table></div></AdminShell>
}
