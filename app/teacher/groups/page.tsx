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
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для строки поиска
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Загружаем сданные работы со связями
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

        if (!error && data) setSubmissions(data);
      } catch (err) {
        console.error("Error loading quests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [supabase]);

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('submissions')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setSubmissions(prev => prev.filter(s => s.id !== id));
    }
  };

  // ЛОГИКА ЖИВОГО ПОИСКА
  const filteredSubmissions = submissions.filter(sub => {
    const questTitle = sub.quests?.title?.toLowerCase() || '';
    const studentName = sub.profiles?.username?.toLowerCase() || '';
    const query = searchQuery.toLowerCase().trim();
    
    // Ищем совпадения либо в названии квеста, либо в имени студента
    return questTitle.includes(query) || studentName.includes(query);
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F7FE] w-full lg:pl-[280px]">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 sm:p-8 lg:p-10 lg:ml-[280px] font-sans text-slate-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ScrollText className="text-[#6C5CE7] w-7 h-7 sm:w-8 sm:h-8" size={32} />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F1035] uppercase tracking-tighter">Quest Board</h1>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Review submissions and grant XP</p>
          </div>

          <div className="w-full sm:w-auto bg-white px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Verification:</span>
            {/* Показываем количество именно отфильтрованных элементов */}
            <span className="text-lg sm:text-xl font-black text-[#6C5CE7]">{filteredSubmissions.length}</span>
          </div>
        </header>

        {/* FILTER BAR */}
        <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 flex items-center border border-slate-100 shadow-sm focus-within:ring-2 ring-purple-100 transition-all">
            <Search className="text-slate-300 shrink-0" size={18} />
            <input 
              type="text" 
              placeholder="Search by student or quest name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Привязываем ввод к стейту
              className="bg-transparent outline-none ml-3 sm:ml-4 text-xs sm:text-sm w-full font-bold text-slate-700 placeholder-slate-300" 
            />
          </div>
          <button className="bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 text-slate-400 hover:text-[#6C5CE7] transition-all shadow-sm shrink-0">
            <Filter size={18} />
          </button>
        </div>

        {/* QUEST LIST */}
        <div className="space-y-4 sm:space-y-6">
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-[24px] sm:rounded-[40px] p-10 sm:p-20 text-center border-2 border-dashed border-slate-200">
              <Sparkles className="mx-auto text-amber-400 mb-4 sm:mb-6" size={40} />
              <h3 className="text-lg sm:text-xl font-black text-slate-800 uppercase">
                {searchQuery ? "No Results Found" : "All Quests Completed!"}
              </h3>
              <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-2">
                {searchQuery ? "Try refining your search query" : "You've cleared the board, Master."}
              </p>
            </div>
          ) : (
            filteredSubmissions.map((sub) => (
              <div key={sub.id} className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Side: Info */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F4F7FE] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#6C5CE7] group-hover:bg-[#6C5CE7] group-hover:text-white transition-all shrink-0">
                    <ScrollText size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-lg sm:text-xl font-black text-[#0F1035] uppercase tracking-tight leading-none">{sub.quests?.title}</h3>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[8px] font-black uppercase rounded-md tracking-tighter shrink-0">
                        +{sub.quests?.reward_xp} XP
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Clock size={11} /> {new Date(sub.created_at).toLocaleDateString()}
                      </p>
                      <span className="w-1 h-1 bg-slate-200 rounded-full hidden sm:inline-block"></span>
                      <p className="text-[9px] sm:text-[10px] font-black text-[#6C5CE7] uppercase tracking-widest">{sub.profiles?.username}</p>
                      <span className="w-1 h-1 bg-slate-200 rounded-full hidden sm:inline-block"></span>
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Party: {sub.groups?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
                  {sub.content_url && (
                    <a 
                      href={sub.content_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all flex items-center gap-2"
                    >
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Review Code</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(sub.id, 'rejected')}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
                    >
                      <XCircle size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(sub.id, 'approved')}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#6C5CE7] text-white hover:bg-[#5A4AD1] transition-all shadow-lg shadow-purple-200 active:scale-90"
                    >
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}