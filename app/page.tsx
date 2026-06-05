"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Добавили роутер
import { createClient } from '@/utils/supabase/client'; // Добавили клиент Supabase
import { 
  Home, BookOpen, Award, User, MessageSquare, 
  ChevronRight, Play, Star, Zap, Rocket, CheckCircle2,
  LogOut // Добавили иконку выхода
} from 'lucide-react';

export default function AlgoProDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();
  const supabase = createClient();

  // Функция выхода
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Выход из сессии Supabase
    router.push('/login'); // Редирект на страницу входа
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans text-[#2D3748]">
      
      {/* --- HEADER BANNER SECTION --- */}
      <div className="relative bg-[#0F1035] h-[320px] mx-4 mt-4 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 p-10 font-mono text-[10px] text-cyan-400 leading-tight">
            def python_magic():<br/>&nbsp;&nbsp;return "AlgoPro"<br/><br/>class Master(Developer):<br/>&nbsp;&nbsp;pass
          </div>
          <div className="absolute top-10 right-20 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold mb-2">Профиль пользователя</p>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-4">Егор Шеpедеко</h1>
          
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-amber-500/50 p-1 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              <div className="w-full h-full rounded-full bg-[#1A1B4B] flex items-center justify-center overflow-hidden border-2 border-white/10">
                <User size={48} className="text-white/80" />
              </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-[#0F1035] px-4 py-0.5 rounded-full text-[10px] font-black shadow-lg">
              Level 4
            </div>
          </div>
          <p className="text-[10px] text-amber-500/80 font-bold mt-4 uppercase tracking-widest">Intermediate</p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-12 pb-8 flex justify-between items-end">
          <div className="flex flex-col gap-2 w-72">
             <div className="flex justify-between text-white text-[11px] font-black uppercase italic">
               <span>AlgoPro</span>
               <span className="text-slate-400">Level 5 <span className="text-[9px] lowercase font-normal ml-2">Advanced</span></span>
             </div>
             <div className="h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full w-[70%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
             </div>
             <div className="flex justify-between text-[10px] font-bold">
                <span className="text-amber-500">2850 XP</span>
                <span className="text-slate-500">650 XP до след. уровня</span>
             </div>
          </div>

          <div className="flex gap-4">
             <AchievementIcon icon={<Award size={16}/>} label="Python Master" color="bg-blue-500" />
             <AchievementIcon icon={<Zap size={16}/>} label="Problem Solver" color="bg-cyan-500" />
             <AchievementIcon icon={<Star size={16}/>} label="Daily Streak" color="bg-orange-500" />
             <AchievementIcon icon={<Rocket size={16}/>} label="Fast Learner" color="bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex gap-8 px-8 py-10 max-w-7xl mx-auto">
        
        {/* Sidebar Navigation */}
        <aside className="w-64 flex flex-col justify-between min-h-[400px]">
          <div className="space-y-2">
            <NavItem icon={<Home size={18}/>} label="Home" active={false} />
            <NavItem icon={<BookOpen size={18}/>} label="Мои Курсы" active={false} />
            <NavItem icon={<Award size={18}/>} label="Сертификаты" active={false} />
            <NavItem icon={<User size={18}/>} label="Профиль" active={true} />
            <NavItem icon={<MessageSquare size={18}/>} label="Форум" active={false} />
          </div>

          {/* КНОПКА ВЫХОДА ВНИЗУ САЙДБАРА */}
          <div className="pt-10 border-t border-slate-200">
            <div 
              onClick={handleLogout}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all text-red-400 hover:bg-red-50 hover:text-red-600 group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-black tracking-tight uppercase">Выйти</span>
            </div>
          </div>
        </aside>

        {/* Courses Section */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
            <h2 className="font-black text-slate-800 uppercase text-sm tracking-tighter">Мои Платные Курсы <span className="text-slate-400 ml-1 font-normal">(3 Courses)</span></h2>
            <h2 className="font-black text-[#6C5CE7] uppercase text-sm tracking-tighter border-b-2 border-[#6C5CE7] pb-2">Текущий Курс</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex gap-6 group hover:shadow-xl transition-all">
            <div className="w-48 h-32 bg-[#0F172A] rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
               <div className="relative text-white font-black text-center">
                  <p className="text-[8px] opacity-60">PYTHON</p>
                  <p className="text-xl tracking-tighter">2026</p>
               </div>
            </div>
            <div className="flex-1 py-2">
              <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight mb-1">Курс: Алгоритмы и структуры данных (Python)</h3>
              <div className="flex items-center gap-2 mb-4">
                 <span className="bg-amber-100 text-amber-600 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">В процессе</span>
                 <span className="text-[11px] font-bold text-slate-400">55% Завершено</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mb-4">
                <div className="bg-[#6C5CE7] h-full w-[55%]"></div>
              </div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">Урок 12: <span className="text-slate-800">Сортировка Слиянием (Merge Sort)</span></p>
            </div>
            <div className="flex items-center">
              <button className="bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-200 transition-all active:scale-95">
                Продолжить обучение
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <SmallCourseCard 
              title="Основы Программирования на C++" 
              progress={85} 
              lesson="Модуль 5: Указатели" 
              color="bg-blue-600"
            />
            <SmallCourseCard 
              title="Введение в искусственный интеллект" 
              progress={10} 
              lesson="Модуль 1: Введение" 
              color="bg-cyan-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательные компоненты остались без изменений
function AchievementIcon({ icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-help">
      <div className={`${color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-[8px] text-white font-bold uppercase tracking-tighter opacity-70">{label}</span>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: any, label: string, active: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-white text-[#6C5CE7] shadow-sm border border-slate-100' : 'text-slate-400 hover:bg-white/50'}`}>
      <span className={active ? 'text-[#6C5CE7]' : 'text-slate-300'}>{icon}</span>
      <span className="text-sm font-black tracking-tight">{label}</span>
    </div>
  );
}

function SmallCourseCard({ title, progress, lesson, color }: any) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 flex gap-4 shadow-sm hover:shadow-md transition-all">
      <div className={`w-24 h-24 ${color} rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner`}>
         <Rocket size={32} className="opacity-40" />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div>
          <h4 className="text-[11px] font-black text-slate-800 uppercase leading-tight mb-1">{title}</h4>
          <p className="text-[10px] font-bold text-slate-400">{progress}% Завершено</p>
        </div>
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
          <div className="bg-[#6C5CE7] h-full" style={{width: `${progress}%`}}></div>
        </div>
        <button className="bg-[#6C5CE7]/10 text-[#6C5CE7] text-[9px] font-black uppercase py-1.5 rounded-xl hover:bg-[#6C5CE7] hover:text-white transition-all">
          Перейти к уроку
        </button>
      </div>
    </div>
  );
}