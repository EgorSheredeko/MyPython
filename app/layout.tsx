"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; 
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
      <body className="min-h-full bg-[#F4F7FE] text-slate-900 antialiased selection:bg-purple-100">
        {isLoginPage ? (
          // Если страница логина — рендерим контент на весь экран
          <main className="min-h-screen w-full relative">{children}</main>
        ) : (
          // Если любая другая страница — добавляем Sidebar и гибкий контейнер
          <div className="flex min-h-screen w-full relative">
            {/* Сайдбар (внутри себя должен иметь fixed lg:w-[280px] и скрываться на мобилках) */}
            <Sidebar />
            
            {/* 
              Основной контент. 
              Убран жесткий ml-[280px]. Теперь за отступ отвечает сам контент страниц 
              (как мы сделали в TeacherDashboard через lg:ml-[280px]), 
              что предотвращает баги с версткой на смартфонах.
            */}
            <main className="flex-1 w-full min-w-0 relative">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}