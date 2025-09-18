// src/app/layout.tsx
import { ReactNode } from 'react';
import '../globals.css';    // optional: global styles if you create this file
import { AuthProvider } from '../components/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
