"use client";
import React, { useState, useEffect } from 'react';
import { 
  Zap, Star, Trophy, Target, 
  ChevronRight, Lock, Layout, 
  FlaskConical, Swords, Loader2 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

// Утилита для конвертации валюты 100:100:100
const formatMedievalCurrency = (total: number) => {
  const gold = Math.floor(total / 10000);
  const silver = Math.floor((total % 10000) / 100);
  const copper = total % 100;
  return { gold, silver, copper };
};

// Расчет прогресса внутри уровня (база: 1000 XP на 1 уровень)
const calculateLevelProgress = (xp: number) => {
  const xpPerLevel = 1000;
  return (xp % xpPerLevel) / 10; 
};

export default function StudentSanctum() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      // 1. Извлекаем имя текущего пользователя из куки
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || "");
        return null;
      };

      const currentUserName = getCookie('username');

      if (currentUserName) {
        // 2. Подтягиваем профиль из базы данных по имени
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', currentUserName)
          .single();

        if (!error) setProfile(data);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [supabase]);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#F4F7FE] w-full lg:pl-[280px]">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  // Если профиль не найден, выводим заглушку
  if (!profile) return (
    <div className="flex h-screen items-center justify-center bg-[#F4F7FE] w-full lg:pl-[280px] font-black uppercase text-slate-400 p-6 text-center text-xs tracking-widest">
      Profile not found in the archives...
    </div>
  );

  const wallet = formatMedievalCurrency(profile.coins || 0);
  const xpProgress = calculateLevelProgress(profile.xp || 0);

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 sm:p-8 lg:p-12 lg:ml-[280px] font-sans transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* БЛОК ПРОФИЛЯ И КОШЕЛЬКА */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-10 mb-6 lg:mb-12">
          
          {/* Главная карточка профиля */}
          <div className="col-span-12 lg:col-span-8 bg-[#0F1035] rounded-3xl sm:rounded-[56px] p-5 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 sm:gap-8 lg:gap-12">
              
              {/* Визуализация Уровня */}
              <div className="relative shrink-0 mt-2 sm:mt-0">
                <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-[#6C5CE7] rounded-2xl sm:rounded-[40px] flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-700 shadow-2xl shadow-purple-500/40">
                  <Star className="fill-white w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-yellow-500 text-[#0F1035] font-black px-2.5 py-1 sm:px-5 sm:py-2 rounded-lg sm:rounded-2xl text-[11px] sm:text-base shadow-xl border-2 sm:border-4 border-[#0F1035] whitespace-nowrap">
                  LVL {profile.level}
                </div>
              </div>

              {/* Имя, Ранг и XP */}
              <div className="flex-1 w-full text-center sm:text-left min-w-0">
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4 justify-center sm:justify-start mb-1 sm:mb-2">
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter break-all max-w-full">
                    {profile.username}
                  </h2>
                  <Zap size={18} className="text-yellow-500 fill-yellow-500 animate-pulse shrink-0 sm:size-6" />
                </div>
                
                <p className="text-[#6C5CE7] font-black uppercase text-[10px] sm:text-sm tracking-[0.25em] sm:tracking-[0.5em] mb-5 sm:mb-8 truncate">
                  {profile.rank}
                </p>
                
                {/* Шкала опыта */}
                <div className="relative w-full h-3.5 sm:h-5 bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6C5CE7] via-indigo-500 to-cyan-400 shadow-[0_0_25px_rgba(108,92,231,0.6)] transition-all duration-1000 ease-out"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-1 mt-2.5 sm:mt-4 text-[9px] sm:text-[10px] font-black uppercase text-slate-500 tracking-[0.15em] sm:tracking-[0.3em]">
                  <span className="flex items-center justify-center sm:justify-start gap-1">
                    Current XP: <span className="text-white">{profile.xp}</span>
                  </span>
                  <span>{Math.round(xpProgress)}% to Rank Up</span>
                </div>
              </div>
            </div>
            
            {/* Фоновый декор */}
            <Layout className="absolute -top-10 -right-10 opacity-5 rotate-12 pointer-events-none w-[120px] sm:w-[250px] lg:w-[300px]" />
          </div>

          {/* КОШЕЛЕК (100:100:100) */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl sm:rounded-[56px] p-5 sm:p-10 lg:p-12 shadow-xl border border-slate-100 flex flex-col justify-center relative overflow-hidden">
            <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-5 sm:mb-10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" /> Royal Assets
            </h3>
            <div className="space-y-4 sm:space-y-8">
              <CurrencyDisplay amount={wallet.gold} label="Gold Sovereigns" color="bg-yellow-500" />
              <CurrencyDisplay amount={wallet.silver} label="Silver Shillings" color="bg-slate-300" />
              <CurrencyDisplay amount={wallet.copper} label="Copper Pennies" color="bg-orange-400" />
            </div>
            <div className="absolute -bottom-20 -right-20 w-36 h-36 sm:w-48 sm:h-48 bg-[#F4F7FE] rounded-full blur-3xl opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* СЕКЦИЯ КЛАССОВ И ДОСТИЖЕНИЙ */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-10">
          
          {/* Прогресс мастерства */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl sm:rounded-[56px] p-5 sm:p-10 lg:p-12 border border-slate-100">
            <h4 className="text-lg sm:text-2xl font-black uppercase italic tracking-tighter mb-5 sm:mb-8 flex items-center gap-2 sm:gap-4">
              <Trophy className="text-[#6C5CE7] w-5 h-5 sm:w-6 sm:h-6" /> Mastery Progress
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 opacity-30 cursor-not-allowed">
              <div className="h-24 sm:h-32 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-[32px] flex items-center justify-center font-black uppercase text-[9px] sm:text-[10px] tracking-widest text-slate-400 p-4 text-center">
                Class Data Locked
              </div>
              <div className="h-24 sm:h-32 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-[32px] flex items-center justify-center font-black uppercase text-[9px] sm:text-[10px] tracking-widest text-slate-400 p-4 text-center">
                Achievements Locked
              </div>
            </div>
          </div>

          {/* Интерактивная карточка Training Grounds */}
          <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-[#6C5CE7] to-[#5A4AD1] rounded-3xl sm:rounded-[56px] p-5 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden group cursor-pointer min-h-[200px] sm:min-h-auto flex flex-col justify-between">
            <div className="relative z-10">
              <h4 className="text-lg sm:text-2xl font-black uppercase italic tracking-tighter mb-1.5 sm:mb-4">The Training Grounds</h4>
              <p className="text-[10px] sm:text-[11px] font-bold text-white/50 uppercase mb-5 sm:mb-10 tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed max-w-[280px]">
                Prepare for the 150-level ascension challenge
              </p>
            </div>
            <div className="relative z-10 mt-auto">
              <button className="bg-white text-[#6C5CE7] px-6 py-3.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-[24px] font-black uppercase text-[10px] sm:text-xs tracking-widest flex items-center gap-3 sm:gap-4 group-hover:gap-6 transition-all shadow-xl shadow-black/10 min-h-[44px]">
                Enter <ChevronRight size={16} />
              </button>
            </div>
            <Swords className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 opacity-20 rotate-12 group-hover:scale-110 sm:group-hover:scale-125 transition-transform duration-700 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}

function CurrencyDisplay({ amount, label, color }: any) {
  return (
    <div className="flex items-center justify-between group gap-3">
      <div className="flex items-center gap-2.5 sm:gap-5 min-w-0">
        <div className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full ${color} shadow-lg shadow-current/20 shrink-0 group-hover:scale-125 transition-all duration-300`} />
        <span className="text-[10px] sm:text-[11px] font-black uppercase text-slate-500 tracking-tight truncate">{label}</span>
      </div>
      <span className="text-xl sm:text-3xl lg:text-4xl font-black italic text-[#0F1035] tracking-tighter shrink-0">{amount}</span>
    </div>
  );
}