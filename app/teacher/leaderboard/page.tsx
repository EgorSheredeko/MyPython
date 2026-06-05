"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Crown, Medal, Loader2, Flame 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function HallOfFamePage() {
  const supabase = createClient();
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // Загружаем только учеников, сортируем по XP
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, experience, rank, avatar_url')
          .eq('role', 'student')
          .order('experience', { ascending: false })
          .limit(50); // Топ 50

        if (!error) setLeaders(data || []);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, [supabase]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F7FE] w-full lg:pl-[280px]">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  // Разделяем на топ-3 и остальных
  const topThree = leaders.slice(0, 3);
  const theRest = leaders.slice(3);

  // Меняем порядок для классического десктопного подиума: 2-е, 1-е, 3-е место
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  return (
    <div className="p-4 sm:p-8 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-slate-900 transition-all duration-500 lg:ml-[280px]">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-[32px] shadow-xl mb-4 sm:mb-6 border border-slate-100">
            <Trophy className="text-amber-500 w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F1035] uppercase tracking-tighter mb-1.5">Hall of Fame</h1>
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">The greatest legends of AlgoPro Guild</p>
        </header>

        {/* PODIUM (TOP 3) - DESKTOP VIEW */}
        <div className="hidden md:flex items-end justify-center gap-4 lg:gap-6 mb-16 lg:mb-20">
          {topThree[1] && <PodiumStep player={topThree[1]} rank={2} height="h-60" color="bg-slate-300" icon={<Medal className="text-slate-400" size={26} />} />}
          {topThree[0] && <PodiumStep player={topThree[0]} rank={1} height="h-76" color="bg-amber-400" icon={<Crown className="text-amber-400" size={32} />} isMain />}
          {topThree[2] && <PodiumStep player={topThree[2]} rank={3} height="h-48" color="bg-orange-400" icon={<Medal className="text-orange-600" size={26} />} />}
        </div>

        {/* PODIUM (TOP 3) - MOBILE VIEW */}
        <div className="flex md:hidden flex-col gap-3 mb-10">
          {topThree.map((player, idx) => {
            const rank = idx + 1;
            const isFirst = rank === 1;
            return (
              <div 
                key={player.id}
                className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm ${
                  isFirst ? 'bg-[#0F1035] text-white border-purple-900/50' : 'bg-white text-slate-900 border-slate-100'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black shrink-0 relative ${
                    isFirst ? 'bg-[#6C5CE7] text-white' : 'bg-[#F4F7FE] text-[#6C5CE7] border border-slate-100'
                  }`}>
                    {player.username.charAt(0).toUpperCase()}
                    <div className="absolute -top-2.5 -left-1.5 drop-shadow">
                      {rank === 1 && <Crown className="text-amber-400 fill-amber-400" size={16} />}
                      {rank === 2 && <Medal className="text-slate-400 fill-slate-400" size={16} />}
                      {rank === 3 && <Medal className="text-orange-500 fill-orange-500" size={16} />}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-black uppercase text-xs sm:text-sm tracking-tight break-words ${isFirst ? 'text-white' : 'text-[#0F1035]'}`}>
                      {player.username}
                    </h4>
                    <p className={`text-[9px] font-bold uppercase mt-0.5 ${isFirst ? 'text-purple-300' : 'text-slate-400'}`}>
                      {player.rank || 'Recruit'}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 flex items-center gap-1.5">
                  <span className={`font-black text-xs sm:text-sm tracking-tighter ${isFirst ? 'text-amber-400' : 'text-slate-800'}`}>
                    {player.experience.toLocaleString()} XP
                  </span>
                  <Flame size={14} className={isFirst ? "text-amber-400" : "text-orange-500"} />
                </div>
              </div>
            );
          })}
        </div>

        {/* LEADERBOARD LIST */}
        <div className="space-y-2.5 sm:space-y-3">
          {/* Table Header (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-12 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-1">Rank</div>
            <div className="col-span-6">Warrior</div>
            <div className="col-span-3 text-center">Class / Rank</div>
            <div className="col-span-2 text-right">Experience</div>
          </div>

          {/* Table Body */}
          {theRest.map((player, index) => (
            <div 
              key={player.id} 
              className="flex md:grid md:grid-cols-12 items-center justify-between bg-white px-4 py-3.5 sm:px-8 sm:py-5 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all gap-4 min-w-0"
            >
              {/* Rank & Profile Block */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 md:col-span-7">
                <div className="font-black text-xs sm:text-sm text-slate-400 w-6 shrink-0">
                  #{index + 4}
                </div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center font-black text-[#6C5CE7] text-sm sm:text-base border border-slate-50 shrink-0">
                  {player.username.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-[#0F1035] uppercase text-xs sm:text-sm leading-tight break-words max-w-full">
                    {player.username}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter md:block hidden">Active Participant</p>
                    {/* Badge inline on Mobile layout */}
                    <span className="md:hidden px-1.5 py-0.5 bg-purple-50 text-[#6C5CE7] text-[8px] font-black uppercase rounded">
                      {player.rank || 'Recruit'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Class/Rank Badge (Desktop only) */}
              <div className="hidden md:block md:col-span-3 text-center">
                <span className="px-3 py-1 bg-purple-50 text-[#6C5CE7] text-[9px] font-black uppercase rounded-lg tracking-wider">
                  {player.rank || 'Recruit'}
                </span>
              </div>

              {/* XP Counter */}
              <div className="md:col-span-2 md:text-right flex items-center justify-end gap-1.5 shrink-0">
                <span className="font-black text-xs sm:text-sm text-slate-800 tracking-tighter">
                  {player.experience.toLocaleString()}
                </span>
                <Flame size={13} className="text-orange-500 sm:size-[14px]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS (DESKTOP ONLY) ---

function PodiumStep({ player, rank, height, icon, isMain = false }: any) {
  return (
    <div className={`flex flex-col items-center group transition-all shrink-0 ${isMain ? 'z-10 scale-105' : 'z-0'}`}>
      <div className="mb-4 relative">
        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-[28px] ${isMain ? 'bg-[#0F1035] border-4 border-[#6C5CE7]' : 'bg-white border-2 border-slate-100'} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
          <span className={`font-black text-xl lg:text-2xl ${isMain ? 'text-white' : 'text-slate-800'}`}>
            {player.username.charAt(0).toUpperCase()}
          </span>
          {isMain && <div className="absolute inset-0 bg-gradient-to-t from-[#6C5CE7]/40 to-transparent"></div>}
        </div>
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 drop-shadow-md">
          {icon}
        </div>
      </div>
      
      <div className={`w-36 lg:w-44 ${height} ${isMain ? 'bg-[#6C5CE7]' : 'bg-white border border-slate-100'} rounded-t-[24px] lg:rounded-t-[32px] shadow-2xl flex flex-col items-center pt-6 lg:pt-8 px-3 text-center min-w-0`}>
        <h3 className={`font-black uppercase text-xs lg:text-sm tracking-tight truncate w-full ${isMain ? 'text-white' : 'text-[#0F1035]'}`}>
          {player.username}
        </h3>
        <p className={`text-[9px] lg:text-[10px] font-bold uppercase mt-0.5 lg:mt-1 ${isMain ? 'text-white/70' : 'text-slate-400'}`}>
          {player.experience.toLocaleString()} XP
        </p>
        <div className={`mt-auto mb-4 w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs lg:text-sm font-black ${isMain ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'}`}>
          {rank}
        </div>
      </div>
    </div>
  );
}