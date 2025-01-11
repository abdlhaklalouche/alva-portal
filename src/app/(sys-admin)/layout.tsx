import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/sidebar/app-sidebar";
import { cookies } from "next/headers";
import { useGetUser } from "@/api/users";
import { getTokenFromCookies } from "@/lib/utils";
import { redirect } from "next/navigation";
import AuthProvider from "@/providers/AuthProvider";
import EntityProvider from "@/providers/EntityProvider";
import { Toaster } from "@/components/ui/toaster";
import SocketProvider from "@/providers/SocketProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const token = getTokenFromCookies(cookiesStore);

  const user = await useGetUser({
    token: token,
  });

  if (!user) {
    return redirect("/login");
  }

  if (!user.is_system_admin) {
    return (
      <html lang="en">
        <body className="h-screen flex flex-col bg-stone-50">
          <div className="h-full flex justify-center items-center p-6 text-center">
            <h1 className="text-3xl font-bold">Access Denied</h1>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-stone-50">
        <AuthProvider user={user} token={token}>
          <SocketProvider token={token}>
            <EntityProvider user={user}>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-transparent overflow-hidden flex flex-col h-full grow">
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </EntityProvider>
            <Toaster />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
