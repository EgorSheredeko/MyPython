"use client";
import React, { useState, useEffect } from 'react';
import { 
  Plus, CalendarDays, Users, Search, Bell, Zap, Sword, Wand2, 
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

        // Тянем данные по имени "Egor" (как в твоей базе)
        // Если логин через username, это единственный способ без стандартной сессии
        const { data: prof, error: profError } = await supabase
          .from('profiles')
          .select('username, level, experience, rank, coins')
          .eq('username', 'Egor') 
          .single();

        if (profError) {
          console.error("Ошибка профиля:", profError.message);
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
        console.error("Ошибка загрузки:", error);
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
      <div className="flex items-center justify-center min-h-screen bg-[#F4F7FE]">
        <Loader2 className="animate-spin text-[#6C5CE7]" size={48} />
      </div>
    );
  }

  return (
    <div className="p-10 font-sans text-slate-900 bg-[#F4F7FE] min-h-screen">
      
      {/* HEADER */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center bg-white rounded-[20px] px-6 py-3 shadow-sm w-96 border border-slate-100 focus-within:ring-2 ring-purple-100 transition-all">
          <Search className="text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search recruits..." 
            className="bg-transparent outline-none ml-3 text-sm w-full font-bold text-slate-700 uppercase" 
          />
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pr-6 border-r border-slate-200">
            <div className="text-right">
              <p className="text-[12px] font-black uppercase leading-none tracking-tight">{userName}</p>
              <p className="text-[9px] font-black text-[#6C5CE7] uppercase mt-1 flex items-center justify-end gap-1">
                <Zap size={10} className="fill-[#6C5CE7]" /> {currentRank}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#0F1035] border-2 border-[#6C5CE7]/20 flex items-center justify-center text-white font-black text-lg shadow-lg uppercase">
              {userName.charAt(0)}
            </div>
          </div>
          <Bell size={24} className="text-slate-400 cursor-pointer hover:text-[#6C5CE7] transition-colors" />
        </div>
      </header>

      {/* HERO BANNER */}
      <div className="relative bg-[#0F1035] rounded-[48px] p-12 overflow-hidden shadow-2xl mb-12 border-b-8 border-[#6C5CE7]">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-6 mb-8">
              <div className="bg-[#6C5CE7] px-6 py-2 rounded-2xl shadow-lg">
                <span className="text-white font-black text-xl italic uppercase tracking-tighter">LVL {currentLevel}</span>
              </div>
              
              <div className="flex-1 max-w-sm">
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">
                  <span>EXP Progress</span>
                  <span className="text-white">{currentXP.toLocaleString()} XP</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#8E82EF] rounded-full transition-all duration-1000"
                    style={{ width: `${rpgProgress.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-10 italic">
               {currentRank} <span className="text-[#6C5CE7]">{userName}</span>
            </h1>

            <div className="flex gap-12">
              <StatItem label="Gold Coins" value={currentCoins.toLocaleString()} icon={<Coins size={16} className="text-yellow-500" />} />
              <StatItem label="Active Raids" value={raids.length} icon={<Sword size={16} className="text-[#6C5CE7]"/>} />
              <StatItem label="Pending Loot" value={pendingQuests} icon={<ScrollText size={16} className="text-rose-400" />} />
            </div>
          </div>
          
          <button className="bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white px-10 py-6 rounded-[32px] font-black uppercase text-[12px] tracking-[0.2em] transition-all active:scale-95 shadow-xl flex items-center gap-3">
            <Plus size={20} strokeWidth={3}/> New Party
          </button>
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
              <Sword size={14} /> Active Conquests
            </h2>
            <MoreHorizontal className="text-slate-300 cursor-pointer" size={20} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl sticky top-10">
            <h3 className="text-[13px] font-black text-slate-800 uppercase mb-8 flex items-center gap-3 tracking-widest">
              <CalendarDays size={18} className="text-rose-500" /> Quest Log
            </h3>
            <div className="space-y-6">
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
  );
}

// Вспомогательные компоненты (Статистика, Карточки, Строки лога)
function StatItem({ label, value, icon, color = "text-white" }: any) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-1 opacity-60">
        {icon}
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-4xl font-black ${color} tracking-tighter`}>{value}</span>
    </div>
  );
}

function RPGCourseCard({ title, party, level, classType, progress, color }: any) {
  return (
    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer border-b-2 border-transparent hover:border-[#6C5CE7]/20">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="w-14 h-14 bg-[#0F1035] rounded-2xl flex items-center justify-center text-white group-hover:bg-[#6C5CE7] transition-colors shadow-lg">
          {classType?.toLowerCase().includes('mage') ? <Wand2 size={24} /> : <Sword size={24} />}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[#6C5CE7] uppercase tracking-wide">{level}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-0.5">{classType}</p>
        </div>
      </div>
      <h3 className="text-2xl font-black text-[#0F1035] uppercase mb-1 leading-tight group-hover:text-[#6C5CE7] transition-colors">{title}</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{party}</p>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-end mt-6">
        <ChevronRight size={20} className="text-[#6C5CE7] group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

function BattleRow({ time, title, party, type, isTomorrow }: any) {
  return (
    <div className="flex gap-5 group cursor-pointer items-center border-b border-slate-50 pb-4 last:border-0 hover:pl-2 transition-all">
      <div className="text-center min-w-[50px]">
        <p className="text-[14px] font-black text-slate-800 tracking-tighter">{time}</p>
        <p className="text-[8px] font-bold text-slate-400 uppercase leading-none">{isTomorrow ? 'Next' : 'Today'}</p>
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-black text-slate-800 uppercase group-hover:text-[#6C5CE7] transition-colors leading-tight">{title}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{party} • {type}</p>
      </div>
    </div>
  );
}