import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'Falcons Squares', description: 'Niagara Falls Falcons fundraising squares' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <header className="header"><div className="shell header-inner">
      <Link href="/" className="brand"><Image src="/falcons-logo.png" width={72} height={72} alt="Niagara Falls Falcons" /><div className="brand-copy"><strong>FALCONS SQUARES</strong><span>Niagara Falls Falcons Baseball</span></div></Link>
      <nav className="nav"><Link className="hide-mobile" href="/">Current Board</Link><Link href="/admin">Admin</Link></nav>
    </div></header>
    {children}
  </body></html>;
}
