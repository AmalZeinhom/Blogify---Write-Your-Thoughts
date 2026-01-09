"use client";

import React, { useContext } from "react";
import { SidebarProvider } from "@/app/context/SidebarContext";
import Sidebar from "../../../Components/dashboard/Sidebar";
import SidebarContext from "@/app/context/SidebarContext";
import { Menu } from "lucide-react";

function InnerLayout({ children }) {
  const { open, setOpen } = useContext(SidebarContext);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <header className="md:hidden sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-background">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md bg-muted/10"
            aria-expanded={open}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h3 className="font-semibold">Admin</h3>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <InnerLayout>{children}</InnerLayout>
    </SidebarProvider>
  );
}
