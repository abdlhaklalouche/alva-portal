import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Alva Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-row bg-gray-100">
        <main className="grow flex flex-col items-start">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
