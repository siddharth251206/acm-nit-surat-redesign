"use client";

import AdminSidebar from "./components/AdminSidebar";
import { ToastProvider } from "./components/Toast";
import { notFound } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return (
    <ToastProvider>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#0A0A0A",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#f5f0e8",
        }}
      >
        <AdminSidebar />
        <main
          style={{
            marginLeft: "240px",
            flex: 1,
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </ToastProvider>
  );
}
