"use client";
import React from 'react';
import { ScrollText } from 'lucide-react';

export default function QuestsPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 sm:p-8 lg:p-12 lg:ml-[280px] font-sans transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* ХЕДЕР СТРАНИЦЫ */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 text-[#0F1035]">
          <ScrollText className="text-[#6C5CE7] w-7 h-7 sm:w-8 sm:h-8 shrink-0" /> 
          Available Quests
        </h2>
        
        {/* КАРТОЧКА С КВЕСТАМИ (ЗАГЛУШКА С АДАПТИВНЫМ ДИЗАЙНОМ) */}
        {/* Когда будешь делать маппинг из БД, вставляй элементы внутрь этого контейнера */}
        <div className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px]">
          <p className="text-slate-400 font-bold uppercase text-[10px] sm:text-xs tracking-widest max-w-sm sm:max-w-md leading-relaxed">
            Check your scrolls, Recruit. New missions will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}