import AdminShell from '@/components/AdminShell';
import PlayersEditor from '@/components/PlayersEditor';
import { requireAdmin } from '@/lib/admin';
import { createClient, isConfigured } from '@/lib/supabase/server';
import { roster } from '@/lib/demo';
export default async function PlayersPage(){const auth=await requireAdmin();let players=roster;if(isConfigured()){const s=await createClient();const {data}=await s.from('players').select('*').order('jersey_number');if(data)players=data}return <AdminShell><div className="eyebrow">Team setup</div><h1>Players / Sellers</h1><p>Roster entries are reusable across every board. Historical squares keep their original seller relationship.</p><PlayersEditor initialPlayers={players} disabled={auth.demo}/></AdminShell>}
