import AdminShell from '@/components/AdminShell';
import NewBoardForm from '@/components/NewBoardForm';
import { requireAdmin } from '@/lib/admin';
export default async function NewBoard(){const auth=await requireAdmin();return <AdminShell><div className="eyebrow">New fundraiser</div><h1>Create Board</h1><p>Each board receives a fresh 10×10 grid. Team numbers can be randomized after squares are assigned.</p><NewBoardForm disabled={auth.demo}/></AdminShell>}
