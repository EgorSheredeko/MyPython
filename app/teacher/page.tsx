"use client";
import React, { useState, useEffect } from 'react';
import { 
  Plus, CalendarDays, Search, Bell, Zap, Sword, Wand2, 
  ScrollText, Loader2, ChevronRight, MoreHorizontal, Coins 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { getLevelProgress } from '@/utils/rpg-engine';

export default function TeacherDashboard() {
  const supabase = createClient();
  
  // Состояния для данных
  const [profile, setProfile] = useState<any>(null);
  const [raids, setRaids] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [pendingQuests, setPendingQuests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);

        // ДИНАМИЧЕСКИ ЧИТАЕМ ИМЯ ПОЛЬЗОВАТЕЛЯ ИЗ КУК
        const cookies = document.cookie.split('; ');
        const usernameCookie = cookies.find(row => row.startsWith('username='));
        // Если кука есть — декодируем её, если нет — ставим 'Egor' как фоллбек
        const savedUsername = usernameCookie ? decodeURIComponent(usernameCookie.split('=')[1]) : 'Egor';

        // Запрашиваем профиль по динамическому имени
        const { data: prof, error: profError } = await supabase
          .from('profiles')
          .select('username, level, experience, rank, coins')
          .eq('username', savedUsername) 
          .single();

        if (profError) {
          console.error("Ошибка загрузки профиля:", profError.message);
        } else {
          setProfile(prof);
        }

        // Загружаем всё остальное (рейды, квесты, сабмишны)
        const [submissionsRes, raidsRes, scheduleRes] = await Promise.all([
          supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('teacher_courses').select('*'),
          supabase.from('schedule').select('*').order('start_time', { ascending: true })
        ]);

        setPendingQuests(submissionsRes.count || 0);
        if (raidsRes.data) setRaids(raidsRes.data);
        if (scheduleRes.data) setEvents(scheduleRes.data);

      } catch (error) {
        console.error("Ошибка загрузки данных дашборда:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [supabase]);

  // Вычисляемые данные
  const currentXP = profile?.experience || 0;
  const currentLevel = profile?.level || 0;
  const currentRank = profile?.rank || "NO RANK";
  const currentCoins = profile?.coins || 0;
  const userName = profile?.username || "Egor";
  const rpgProgress = getLevelProgress(currentXP);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F7FE] w-full lg:pl-[280px]">
        <Loader2 className="animate-spin text-[#6C5CE7]" size={48} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-10 font-sans text-slate-900 bg-[#F4F7FE] min-h-screen transition-all duration-500 lg:ml-[280px]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center mb-6 sm:mb-10 gap-4">
          <div className="flex items-center bg-white rounded-xl sm:rounded-[20px] px-4 sm:px-6 py-3 shadow-sm w-full sm:w-80 md:w-96 border border-slate-100 focus-within:ring-2 ring-purple-100 transition-all">
            <Search className="text-slate-300 shrink-0" size={18} />
            <input 
              type="text" 
              placeholder="Search recruits..." 
              className="bg-transparent outline-none ml-3 text-xs sm:text-sm w-full font-bold text-slate-700 uppercase placeholder-slate-300" 
            />
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 border-b sm:border-b-0 pb-3 sm:pb-0 border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4 sm:pr-6 sm:border-r border-slate-200 min-w-0">
              <div className="text-left sm:text-right min-w-0">
                <p className="text-[11px] sm:text-[12px] font-black uppercase leading-none tracking-tight truncate max-w-[120px] sm:max-w-none">{userName}</p>
                <p className="text-[8px] sm:text-[9px] font-black text-[#6C5CE7] uppercase mt-1 flex items-center sm:justify-end gap-1">
                  <Zap size={10} className="fill-[#6C5CE7] shrink-0" /> {currentRank}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0F1035] border-2 border-[#6C5CE7]/20 flex items-center justify-center text-white font-black text-base sm:text-lg shadow-lg uppercase shrink-0">
                {userName.charAt(0)}
              </div>
            </div>
            <Bell size={22} className="text-slate-400 cursor-pointer hover:text-[#6C5CE7] transition-colors shrink-0 mr-1 sm:mr-0" />
          </div>
        </header>

        {/* HERO BANNER */}
        <div className="relative bg-[#0F1035] rounded-3xl sm:rounded-[48px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl mb-8 sm:mb-12 border-b-8 border-[#6C5CE7]">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-8">
            <div className="w-full lg:w-2/3 min-w-0">
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-[#6C5CE7] px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg self-start sm:self-auto">
                  <span className="text-white font-black text-base sm:text-xl italic uppercase tracking-tighter">LVL {currentLevel}</span>
                </div>
                
                <div className="w-full max-w-sm">
                  <div className="flex justify-between text-[9px] sm:text-[10px] font-black text-slate-400 uppercase mb-1.5 tracking-widest">
                    <span>EXP Progress</span>
                    <span className="text-white">{currentXP.toLocaleString()} XP</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8E82EF] rounded-full transition-all duration-1000"
                      style={{ width: `${rpgProgress.percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight sm:leading-none mb-6 sm:mb-10 italic break-words max-w-full">
                {currentRank} <span className="text-[#6C5CE7]">{userName}</span>
              </h1>

              {/* Grid Layout for mobile stats spacing */}
              <div className="grid grid-cols-3 gap-3 sm:flex sm:gap-12 pt-2 border-t border-white/5 sm:border-t-0">
                <StatItem label="Gold Coins" value={currentCoins} icon={<Coins size={14} className="text-yellow-500" />} />
                <StatItem label="Active Raids" value={raids.length} icon={<Sword size={14} className="text-[#6C5CE7]"/>} />
                <StatItem label="Pending Loot" value={pendingQuests} icon={<ScrollText size={14} className="text-rose-400" />} />
              </div>
            </div>
            
            <button className="w-full lg:w-auto bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white px-8 py-4 sm:py-5 lg:px-10 lg:py-6 rounded-2xl sm:rounded-[32px] font-black uppercase text-[11px] sm:text-[12px] tracking-[0.2em] transition-all active:scale-98 shadow-xl flex items-center justify-center gap-2.5 shrink-0">
              <Plus size={18} strokeWidth={3}/> New Party
            </button>
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          
          {/* ACTIVE CONQUESTS */}
          <div className="col-span-12 lg:col-span-8 space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2 sm:gap-3">
                <Sword size={14} /> Active Conquests
              </h2>
              <MoreHorizontal className="text-slate-300 cursor-pointer hover:text-slate-500 transition-colors" size={20} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {raids.map((raid) => (
                <RPGCourseCard 
                  key={raid.id}
                  title={raid.title} 
                  party={raid.party_name} 
                  level={`Lvl ${raid.level_tag || 1}+`}
                  classType={raid.class_type || 'Warrior'}
                  progress={raid.progress_percent || 0} 
                  color={raid.color_theme || 'bg-purple-500'}
                />
              ))}
            </div>
          </div>
          
          {/* QUEST LOG */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-3xl sm:rounded-[40px] p-6 sm:p-8 border border-slate-100 shadow-xl lg:sticky lg:top-6">
              <h3 className="text-xs sm:text-[13px] font-black text-slate-800 uppercase mb-6 sm:mb-8 flex items-center gap-2.5 tracking-widest">
                <CalendarDays size={18} className="text-rose-500" /> Quest Log
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {events.map((event) => (
                  <BattleRow 
                    key={event.id}
                    time={event.start_time?.slice(0, 5)} 
                    title={event.title} 
                    party={event.group_name} 
                    type={event.event_type} 
                    isTomorrow={event.is_tomorrow} 
                  />
                ))}
                {events.length === 0 && (
                  <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-4 italic">No active quests</p>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Вспомогательные компоненты
function StatItem({ label, value, icon }: any) {
  return (
    <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-1.5 mb-0.5 opacity-70">
        {icon}
        <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider truncate">{label}</span>
      </div>
      <span className="text-xl sm:text-2xl lg:text-4xl font-black text-white tracking-tighter truncate">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
    </div>
  );
}

function RPGCourseCard({ title, party, level, classType, progress, color }: any) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[40px] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer border-b-2 border-transparent hover:border-[#6C5CE7]/20 flex flex-col justify-between min-w-0">
      <div>
        <div className="flex justify-between items-start mb-6 sm:mb-8 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0F1035] rounded-xl sm:rounded-2xl flex items-center justify-center text-white group-hover:bg-[#6C5CE7] transition-colors shadow-lg shrink-0">
            {classType?.toLowerCase().includes('mage') ? <Wand2 size={22} /> : <Sword size={22} />}
          </div>
          <div className="text-right ml-2 min-w-0">
            <p className="text-[9px] sm:text-[10px] font-black text-[#6C5CE7] uppercase tracking-wide truncate">{level}</p>
            <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase italic mt-0.5 truncate">{classType}</p>
          </div>
        </div>
        <h3 className="text-lg sm:text-2xl font-black text-[#0F1035] uppercase mb-1 leading-tight group-hover:text-[#6C5CE7] transition-colors break-words max-w-full">
          {title}
        </h3>
        <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 sm:mb-8 truncate">
          {party}
        </p>
      </div>
      
      <div>
        <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-end mt-4 sm:mt-6">
          <ChevronRight size={18} className="text-[#6C5CE7] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

function BattleRow({ time, title, party, type, isTomorrow }: any) {
  return (
    <div className="flex gap-4 sm:gap-5 group cursor-pointer items-center border-b border-slate-50 pb-4 last:border-0 hover:pl-2 transition-all min-w-0">
      <div className="text-center min-w-[44px] sm:min-w-[50px] shrink-0">
        <p className="text-xs sm:text-[14px] font-black text-slate-800 tracking-tighter">{time}</p>
        <p className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">{isTomorrow ? 'Next' : 'Today'}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] sm:text-[11px] font-black text-slate-800 uppercase group-hover:text-[#6C5CE7] transition-colors leading-tight break-words max-w-full">
          {title}
        </p>
        <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-tight truncate mt-0.5">
          {party} • {type}
        </p>
      </div>
    </div>
  );
}