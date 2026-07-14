import "./globals.css";

import type { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Navbar />
      </body>
    </html>
  );
}