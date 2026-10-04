import { redirect } from 'next/navigation';
import { createClient, isConfigured } from './supabase/server';
export async function requireAdmin(){
  if(!isConfigured()) return {demo:true,user:{email:process.env.ADMIN_EMAIL ?? 'brendanjamesthompson@gmail.com'}};
  const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser();
  if(!user) redirect('/admin/login');
  const admin=(process.env.ADMIN_EMAIL ?? 'brendanjamesthompson@gmail.com').toLowerCase();
  if((user.email??'').toLowerCase()!==admin) redirect('/admin/login?error=unauthorized');
  return {demo:false,user};
}
