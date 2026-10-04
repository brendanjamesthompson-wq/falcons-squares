import PublicBoard from '@/components/PublicBoard';
import { getBoardBySlug } from '@/lib/data';
export default async function BoardPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {board,squares}=await getBoardBySlug(slug);return <PublicBoard board={board} squares={squares}/>}
