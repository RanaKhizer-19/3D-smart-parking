import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'MAJU 3D Smart Campus Parking | Mohammad Ali Jinnah University',
  description:
    'Futuristic 3D Isometric Smart Parking System for Mohammad Ali Jinnah University (Shahrah-e-Faisal Campus, Karachi) adjacent to C-Block Building.',
  openGraph: {
    title: 'MAJU 3D Smart Campus Parking',
    description:
      'Interactive 3D Isometric Smart Parking System for MAJU Karachi C-Block.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAJU 3D Smart Campus Parking',
    description:
      'Interactive 3D Isometric Smart Parking System for MAJU Karachi C-Block.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
