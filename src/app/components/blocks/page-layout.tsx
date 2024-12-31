import React, { ReactNode } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Ribbon, { RibbonActionItem } from "./ribbon";

interface BreadcrumbItemProps {
  name: string;
  link?: string;
}

interface PageLayoutProps {
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItemProps[];
  actions?: RibbonActionItem[];
  children?: ReactNode;
}

export default function PageLayout({
  name,
  description,
  breadcrumbs,
  actions = [],
  children,
}: PageLayoutProps) {
  return (
    <>
      <header className="flex bg-white h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {breadcrumb.link ? (
                      <BreadcrumbLink href="/">
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index + 1 < breadcrumbs.length && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="h-full flex flex-1 flex-col">
        <Ribbon actions={actions} />
        <div className="max-w-lg p-4 space-y-1">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ScrollArea className="grow h-full overflow-auto px-4">
          {children}
        </ScrollArea>
      </div>
    </>
  );
}
