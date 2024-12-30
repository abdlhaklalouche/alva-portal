import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alva Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-row bg-gray-100">
        <main className="grow flex flex-col items-start">{children}</main>
      </body>
    </html>
  );
}
