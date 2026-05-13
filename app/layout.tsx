import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: {
    default: 'Notehub',
    template: '%s | Notehub',
  },
  description: 'Notehub — notes and authentication.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
