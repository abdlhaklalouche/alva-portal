import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <QueryProvider>{children}</QueryProvider>;
}
