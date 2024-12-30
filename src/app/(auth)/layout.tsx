import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/sidebar/app-sidebar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col bg-stone-50">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="bg-transparent overflow-hidden flex flex-col h-full grow">
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
