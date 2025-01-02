import type { Metadata } from "next";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { useGetUser } from "@/api/users";
import { getTokenFromCookies } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Alva Portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();

  const user = await useGetUser({
    token: getTokenFromCookies(cookiesStore),
  });

  if (user) {
    return redirect("/");
  }

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
