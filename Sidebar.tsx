"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  ScrollText, 
  Trophy, 
  LogOut, 
  Shield, 
  Loader2, 
  ShoppingBag 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Извлекаем роль пользователя из куки
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || "");
      return null;
    };

    setUserRole(getCookie('user_role'));
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    // Очищаем все куки при выходе
    document.cookie = "is_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = '/login';
  };

  // Логика определения домашней страницы
  const teacherRanks = ['ISUS', 'admin', 'teacher', 'Senior Python Developer', 'Absolute System Creator'];
  const isTeacher = userRole ? teacherRanks.includes(userRole) : false;
  const homePath = isTeacher ? '/teacher' : '/student';

  return (
    <aside className="w-[280px] bg-[#0F1035] p-8 flex flex-col fixed h-full z-50 shadow-2xl">
      <div 
        className="flex items-center gap-3 mb-12 cursor-pointer group" 
        onClick={() => router.push(homePath)}
      >
        <div className="w-12 h-12 bg-[#6C5CE7] rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">
          <Shield className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
            Algo<span className="text-[#6C5CE7]">Pro</span>
          </h1>
          <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">
            {isTeacher ? "Guild Master Edition" : "Recruit Edition"}
          </p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {/* Динамический Sanctum */}
        <SidebarItem 
          icon={<Home size={20}/>} 
          label="Sanctum" 
          active={pathname === homePath} 
          onClick={() => router.push(homePath)} 
        />
        
        {/* War Parties (только для учителя или общая логика) */}
        <SidebarItem 
          icon={<Users size={20}/>} 
          label="War Parties" 
          active={pathname.includes('/groups')} 
          onClick={() => router.push(isTeacher ? '/teacher/groups' : '/student/groups')} 
        />

        <SidebarItem 
          icon={<ScrollText size={20}/>} 
          label="Quest Board" 
          active={pathname.includes('/check') || pathname === '/student'} 
          onClick={() => router.push(isTeacher ? '/teacher/check' : '/student')} 
        />
        
        <SidebarItem 
          icon={<ShoppingBag size={20}/>} 
          label="Royal Treasury" 
          active={pathname === '/shop'} 
          onClick={() => router.push('/shop')} 
        />

        <SidebarItem 
          icon={<Trophy size={20}/>} 
          label="Hall of Fame" 
          active={pathname.includes('/leaderboard')} 
          onClick={() => router.push(isTeacher ? '/teacher/leaderboard' : '/student/leaderboard')} 
        />
      </nav>

      <button 
        onClick={handleLogout} 
        disabled={isLoggingOut}
        className="flex items-center gap-4 px-6 py-4 mt-auto text-slate-500 hover:text-rose-400 transition-all group disabled:opacity-50"
      >
        {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
        <span className="font-black text-[11px] uppercase tracking-widest">Abandon Mission</span>
      </button>
    </aside>
  );
}

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${
        active 
          ? 'bg-[#6C5CE7] text-white shadow-lg shadow-purple-500/20 translate-x-2' 
          : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
      }`}
    >
      <div className={active ? 'text-white' : 'text-slate-600'}>{icon}</div>
      <span className={`text-[11px] uppercase tracking-widest font-black`}>
        {label}
      </span>
    </div>
  );
}