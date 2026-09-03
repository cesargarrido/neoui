import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeoUI - Librería de componentes cyberpunk",
  description:
    "Demo interactiva de una librería de componentes UI futurista para dashboards de alta densidad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
