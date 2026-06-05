"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // Убедись, что путь к сайдбару верный
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Условие: не показывать Sidebar на странице входа
  const isLoginPage = pathname === "/login";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F4F7FE] text-slate-900">
        {isLoginPage ? (
          // Если страница логина — просто рендерим контент
          <main className="h-full">{children}</main>
        ) : (
          // Если любая другая страница — добавляем Sidebar
          <div className="flex min-h-screen">
            {/* Сайдбар зафиксирован слева */}
            <Sidebar />
            
            {/* Основной контент с отступом слева (280px — ширина сайдбара) */}
            <main className="flex-1 ml-[280px] relative">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}