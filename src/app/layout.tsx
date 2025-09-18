import { ReactNode } from "react";
import '../globals.css';
import { AuthProvider } from "../components/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

