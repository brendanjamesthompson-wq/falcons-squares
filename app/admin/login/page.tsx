import LoginForm from '@/components/LoginForm';
import { isConfigured } from '@/lib/supabase/server';
export default function Login(){return <main className="shell"><div className="login-card"><h1>Falcons Admin</h1><p>Secure access for board management.</p>{isConfigured()?<LoginForm/>:<div className="notice">Supabase is not connected yet. The local preview runs in demo mode; connect Supabase before deployment.</div>}</div></main>}
