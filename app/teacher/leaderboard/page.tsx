"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Crown, Medal, Star, 
  Search, ArrowUp, Loader2, Flame 
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
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  // Разделяем на топ-3 и остальных
  const topThree = leaders.slice(0, 3);
  const theRest = leaders.slice(3);

  return (
    <div className="p-10 bg-[#F4F7FE] min-h-screen">
      {/* HEADER */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[32px] shadow-xl mb-6 border border-slate-100">
          <Trophy className="text-amber-500" size={40} />
        </div>
        <h1 className="text-5xl font-black text-[#0F1035] uppercase tracking-tighter mb-2">Hall of Fame</h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">The greatest legends of AlgoPro Guild</p>
      </header>

      {/* PODIUM (TOP 3) */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-20">
        {/* SECOND PLACE */}
        {topThree[1] && <PodiumStep player={topThree[1]} rank={2} height="h-64" color="bg-slate-300" icon={<Medal className="text-slate-500" />} />}
        
        {/* FIRST PLACE */}
        {topThree[0] && <PodiumStep player={topThree[0]} rank={1} height="h-80" color="bg-amber-400" icon={<Crown className="text-white" size={32} />} isMain />}
        
        {/* THIRD PLACE */}
        {topThree[2] && <PodiumStep player={topThree[2]} rank={3} height="h-48" color="bg-orange-400" icon={<Medal className="text-orange-700" />} />}
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="grid grid-cols-12 px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-1">Rank</div>
          <div className="col-span-7">Warrior</div>
          <div className="col-span-2">Class / Rank</div>
          <div className="col-span-2 text-right">Experience</div>
        </div>

        {theRest.map((player, index) => (
          <div 
            key={player.id} 
            className="grid grid-cols-12 items-center bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="col-span-1 font-black text-slate-400">#{index + 4}</div>
            <div className="col-span-7 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center font-black text-[#6C5CE7] border border-slate-50">
                {player.username.charAt(0)}
              </div>
              <div>
                <h4 className="font-black text-[#0F1035] uppercase text-sm leading-none">{player.username}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">Active Participant</p>
              </div>
            </div>
            <div className="col-span-2">
              <span className="px-3 py-1 bg-purple-50 text-[#6C5CE7] text-[9px] font-black uppercase rounded-lg">
                {player.rank || 'Recruit'}
              </span>
            </div>
            <div className="col-span-2 text-right flex items-center justify-end gap-2">
              <span className="font-black text-slate-800 tracking-tighter">{player.experience.toLocaleString()}</span>
              <Flame size={14} className="text-orange-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PodiumStep({ player, rank, height, color, icon, isMain = false }: any) {
  return (
    <div className={`flex flex-col items-center group transition-all ${isMain ? 'z-10' : 'z-0'}`}>
      <div className="mb-4 relative">
        <div className={`w-20 h-20 rounded-[28px] ${isMain ? 'bg-[#0F1035] border-4 border-[#6C5CE7]' : 'bg-white border-2 border-slate-100'} flex items-center justify-center shadow-2xl relative overflow-hidden`}>
          <span className={`font-black text-2xl ${isMain ? 'text-white' : 'text-slate-800'}`}>
            {player.username.charAt(0)}
          </span>
          {isMain && <div className="absolute inset-0 bg-gradient-to-t from-[#6C5CE7]/40 to-transparent"></div>}
        </div>
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 drop-shadow-lg`}>
          {icon}
        </div>
      </div>
      
      <div className={`w-48 ${height} ${isMain ? 'bg-[#6C5CE7]' : 'bg-white border border-slate-100'} rounded-t-[40px] shadow-2xl flex flex-col items-center pt-8 px-4 text-center`}>
        <h3 className={`font-black uppercase text-sm tracking-tight ${isMain ? 'text-white' : 'text-[#0F1035]'}`}>
          {player.username}
        </h3>
        <p className={`text-[10px] font-bold uppercase mt-1 ${isMain ? 'text-white/60' : 'text-slate-400'}`}>
          {player.experience.toLocaleString()} XP
        </p>
        <div className={`mt-auto mb-4 w-10 h-10 rounded-full flex items-center justify-center font-black ${isMain ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'}`}>
          {rank}
        </div>
      </div>
    </div>
  );
}