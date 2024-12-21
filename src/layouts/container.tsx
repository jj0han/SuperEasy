import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { cn } from "@/lib/utils";
import type { ClassNameValue } from "tailwind-merge";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: ClassNameValue;
};

export default function Container({ children, className }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="size-10 m-2" />
      <main className={cn("w-full", className)}>{children}</main>
    </SidebarProvider>
  );
}
