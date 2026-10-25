import Image from 'next/image';
import Link from 'next/link';
import { getActiveBoards } from '@/lib/data';

function money(n: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0
  }).format(n);
}

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(`${date}T12:00:00`));
}

export default async function Home() {
  const boards = await getActiveBoards();

  return (
    <main>
      <section className="hero shell">
        <Image
          className="hero-logo"
          src="/falcons-logo.png"
          width={460}
          height={410}
          alt="Niagara Falls Falcons"
          priority
        />

        <div className="eyebrow">
          Niagara Falls Falcons Baseball
        </div>

        <h1>Football Squares</h1>

        <div className="matchup">
          Select a fundraiser below to view available squares
        </div>
      </section>

      <section className="shell section">
        <h2>Active Boards</h2>

        {boards.length === 0 ? (
          <div className="panel">
            <h3>No active boards right now</h3>
            <p className="small">
              Check back soon for our next Falcons fundraiser.
            </p>
          </div>
        ) : (
          <div className="active-board-grid">
            {boards.map(board => {
              const gameDate = formatDate(board.game_date);

              return (
                <div
                  className="active-board-card"
                  key={board.id}
                >
                  <div className="eyebrow">
                    {gameDate ?? 'Falcons Fundraiser'}
                  </div>

                  <h2>{board.title}</h2>

                  <div className="active-matchup">
                    {board.team_a}
                    <span> vs. </span>
                    {board.team_b}
                  </div>

                  <div className="active-board-details">
                    <span className="pill">
                      <strong>{money(board.price)}</strong> / square
                    </span>

                    {board.numbers_locked ? (
                      <span className="pill">
                        Numbers Drawn
                      </span>
                    ) : (
                      <span className="pill">
                        Numbers Not Yet Drawn
                      </span>
                    )}
                  </div>

                  <div className="active-payouts">
                    <div>
                      <span>Q1</span>
                      <strong>
                        {money(board.payouts.q1)}
                      </strong>
                    </div>

                    <div>
                      <span>Half</span>
                      <strong>
                        {money(board.payouts.half)}
                      </strong>
                    </div>

                    <div>
                      <span>Q3</span>
                      <strong>
                        {money(board.payouts.q3)}
                      </strong>
                    </div>

                    <div>
                      <span>Final</span>
                      <strong>
                        {money(board.payouts.final)}
                      </strong>
                    </div>
                  </div>

                  <Link
                    className="btn btn-primary active-board-button"
                    href={`/boards/${board.slug}`}
                  >
                    View Available Squares
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
