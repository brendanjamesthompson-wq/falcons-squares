import Image from 'next/image';
import type { Board, Square } from '@/lib/types';

function money(n:number){return new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n)}
function last(n:number){return Math.abs(n)%10}

export default function PublicBoard({board,squares}:{board:Board;squares:Square[]}){
  const sold=squares.filter(s=>s.buyer_name).length;
  const winners = Object.entries(board.quarter_scores ?? {}).map(([period,score])=>{
    if(!score) return null;
    const [a,b]=score as [number,number];
    const col=board.axis_a.indexOf(last(a));
    const row=board.axis_b.indexOf(last(b));
    const sq=squares.find(s=>s.row_index===row&&s.col_index===col);
    return {period,score,buyer:sq?.buyer_name ?? 'Unassigned',row,col};
  }).filter(Boolean) as {period:string;score:[number,number];buyer:string;row:number;col:number}[];
  const winSet=new Set(winners.map(w=>`${w.row}-${w.col}`));
  const payoutLabels=[['Q1',board.payouts.q1],['Half',board.payouts.half],['Q3',board.payouts.q3],['Final',board.payouts.final]];
  return <main>
    <section className="hero shell">
      <Image className="hero-logo" src="/falcons-logo.png" width={460} height={410} alt="Niagara Falls Falcons" priority />
      <div className="eyebrow">Niagara Falls Falcons Baseball</div>
      <h1>{board.title}</h1>
      <div className="matchup">{board.team_a} vs. {board.team_b}</div>
      <div className="meta-row"><span className="pill"><strong>{money(board.price)}</strong> / square</span><span className="pill"><strong>{sold}</strong> sold</span><span className="pill"><strong>{100-sold}</strong> available</span>{board.numbers_locked?<span className="pill">Numbers locked</span>:<span className="pill">Numbers not drawn</span>}</div>
      <div className="stats">{payoutLabels.map(([l,v])=><div className="stat" key={String(l)}><span>{l}</span><strong>{money(Number(v))}</strong></div>)}</div>
    </section>
    <section className="shell section">
      <div className="board-wrap"><div className="board-grid">
        <div className="corner">{board.team_b}<br/>↓ / {board.team_a} →</div>
        {board.axis_a.map((n,i)=><div className="axis" key={`c-${i}`}>{board.numbers_locked?n:'–'}</div>)}
        {Array.from({length:10},(_,row)=><div style={{display:'contents'}} key={row}>
          <div className="axis"><span className="row-label">{board.team_b}</span>&nbsp;{board.numbers_locked?board.axis_b[row]:'–'}</div>
          {Array.from({length:10},(_,col)=>{
            const s=squares.find(x=>x.row_index===row&&x.col_index===col);
            const available=!s?.buyer_name;
            const squareLabel = `${String.fromCharCode(65 + col)}${row + 1}`;

return <div
  className={`square ${available?'available':''} ${winSet.has(`${row}-${col}`)?'winner':''}`}
  key={`${row}-${col}`}
  title={available
    ? `${squareLabel} — Available`
    : `${squareLabel} — ${s?.buyer_name} — sold by ${s?.player?.first_name ?? '—'}`
  }
>
  <div className="square-label">{squareLabel}</div>

  {!available && !s?.paid
    ? <span className="unpaid" title="Payment pending"/>
    : null
  }

  <div className="buyer">{s?.buyer_name ?? 'AVAILABLE'}</div>

  {!available
    ? <div className="seller">Sold by {s?.player?.first_name ?? '—'}</div>
    : null
  }
</div>
          })}
        </div>)}
      </div></div>
    </section>
    <section className="shell section"><h2>Game Results</h2><div className="cards">
      {['q1','half','q3','final'].map(p=>{const w=winners.find(x=>x.period===p); return <div className="result-card" key={p}><div className="label">{({q1:'1st Quarter',half:'Halftime',q3:'3rd Quarter',final:'Final'} as Record<string,string>)[p]}</div><strong>{w?`${w.score[0]} – ${w.score[1]}`:'TBD'}</strong><div className="small">{w?`Winner: ${w.buyer}`:'Winner will appear automatically'}</div></div>})}
    </div></section>
  </main>
}
