"use client";
import React, { useState, useEffect } from 'react';
import { 
  ScrollText, CheckCircle2, XCircle, ExternalLink, 
  Clock, Search, Filter, Loader2, Sparkles 
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function QuestBoardPage() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Загружаем сданные работы со связями (название квеста, имя ученика, имя группы)
        const { data, error } = await supabase
          .from('submissions')
          .select(`
            *,
            quests(title, reward_xp),
            profiles(username),
            groups(name)
          `)
          .eq('status', 'pending')
          .order('created_at', { ascending: true });

        if (!error) setSubmissions(data);
      } catch (err) {
        console.error("Error loading quests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [supabase]);

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    // Логика обновления статуса
    const { error } = await supabase
      .from('submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      // Удаляем из локального списка после проверки
      setSubmissions(prev => prev.filter(s => s.id !== id));
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  return (
    <div className="p-10 bg-[#F4F7FE] min-h-screen">
      {/* HEADER */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ScrollText className="text-[#6C5CE7]" size={32} />
            <h1 className="text-4xl font-black text-[#0F1035] uppercase tracking-tighter">Quest Board</h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Review submissions and grant XP</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Verification:</span>
            <span className="text-xl font-black text-[#6C5CE7]">{submissions.length}</span>
          </div>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-white rounded-2xl px-6 py-4 flex items-center border border-slate-100 shadow-sm focus-within:ring-2 ring-purple-100 transition-all">
          <Search className="text-slate-300" size={18} />
          <input type="text" placeholder="Search by student or quest name..." className="bg-transparent outline-none ml-4 text-sm w-full font-bold" />
        </div>
        <button className="bg-white p-4 rounded-2xl border border-slate-100 text-slate-400 hover:text-[#6C5CE7] transition-all shadow-sm">
          <Filter size={20} />
        </button>
      </div>

      {/* QUEST LIST */}
      <div className="space-y-6">
        {submissions.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
            <Sparkles className="mx-auto text-amber-400 mb-6" size={48} />
            <h3 className="text-xl font-black text-slate-800 uppercase">All Quests Completed!</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">You've cleared the board, Master.</p>
          </div>
        ) : (
          submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between">
              
              {/* Left Side: Info */}
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 bg-[#F4F7FE] rounded-2xl flex items-center justify-center text-[#6C5CE7] group-hover:bg-[#6C5CE7] group-hover:text-white transition-all">
                  <ScrollText size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black text-[#0F1035] uppercase tracking-tight leading-none">{sub.quests?.title}</h3>
                    <span className="px-2 py-1 bg-amber-100 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-tighter">
                      +{sub.quests?.reward_xp} XP
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                      <Clock size={12} /> {new Date(sub.created_at).toLocaleDateString()}
                    </p>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <p className="text-[10px] font-black text-[#6C5CE7] uppercase tracking-widest">{sub.profiles?.username}</p>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Party: {sub.groups?.name}</p>
                  </div>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex items-center gap-4">
                <a 
                  href={sub.content_url} 
                  target="_blank" 
                  className="p-4 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all flex items-center gap-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">Review Code</span>
                  <ExternalLink size={16} />
                </a>
                
                <div className="flex gap-2 ml-4">
                  <button 
                    onClick={() => handleStatusUpdate(sub.id, 'rejected')}
                    className="p-4 rounded-2xl border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                  >
                    <XCircle size={22} />
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(sub.id, 'approved')}
                    className="p-4 rounded-2xl bg-[#6C5CE7] text-white hover:bg-[#5A4AD1] transition-all shadow-lg shadow-purple-200 active:scale-90"
                  >
                    <CheckCircle2 size={22} />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}