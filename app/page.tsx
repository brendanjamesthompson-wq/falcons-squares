import PublicBoard from '@/components/PublicBoard';
import { getLatestBoard } from '@/lib/data';
export default async function Home(){const {board,squares}=await getLatestBoard();return <PublicBoard board={board} squares={squares}/>}
