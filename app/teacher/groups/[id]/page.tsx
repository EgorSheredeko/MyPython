"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, MessageSquare } from 'lucide-react';

export default function GroupDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // В будущем тут будет запрос к Supabase по id группы
  const students = [
    { id: 1, name: 'Мухаммед Исмаилов', progress: 85, tasks: 12, rank: 'Senior' },
    { id: 2, name: 'Алексей Смирнов', progress: 40, tasks: 5, rank: 'Junior' },
    { id: 3, name: 'Мария Иванова', progress: 95, tasks: 15, rank: 'Pro' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-4 sm:p-8 lg:p-10 lg:ml-[280px] font-sans transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* КНОПКА НАЗАД */}
        <button 
          onClick={() => router.push('/teacher/groups')}
          className="flex items-center gap-2 text-slate-400 hover:text-[#6C5CE7] font-black uppercase text-[10px] tracking-widest mb-6 sm:mb-8 transition-colors active:scale-95"
        >
          <ChevronLeft size={16} /> К списку групп
        </button>

        {/* ХЕДЕР ГРУППЫ */}
        <div className="bg-[#0F1035] rounded-3xl sm:rounded-[40px] p-6 sm:p-10 text-white mb-6 sm:mb-10 shadow-xl relative overflow-hidden">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter break-words relative z-10">
            Управление группой: <span className="text-[#6C5CE7]">{id?.toString().toUpperCase()}</span>
          </h1>
          <p className="text-slate-400 font-bold mt-1.5 uppercase text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] relative z-10">
            Список курсантов и успеваемость
          </p>
        </div>

        {/* СПИСОК СТУДЕНТОВ */}
        <div className="space-y-4">
          {students.map((student) => (
            <div 
              key={student.id} 
              className="bg-white rounded-2xl sm:rounded-[30px] p-5 sm:p-6 border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:shadow-lg transition-all"
            >
              {/* Информация о студенте */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-[#6C5CE7] text-lg sm:text-xl border border-slate-100 shrink-0">
                  {student.name[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-tight break-words mb-1">
                    {student.name}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-black bg-[#6C5CE7]/10 text-[#6C5CE7] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
                    {student.rank}
                  </span>
                </div>
              </div>

              {/* Метрики и Кнопки действий */}
              <div className="flex flex-col sm:flex-row md:items-center justify-between gap-4 md:gap-8 lg:gap-12 border-t border-slate-50 md:border-t-0 pt-4 md:pt-0">
                {/* Метрики (Прогресс / Задания) */}
                <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8 md:gap-10 text-center shrink-0">
                  <div className="bg-slate-50/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-50 sm:border-0">
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-widest">Прогресс</p>
                    <p className="text-lg sm:text-xl font-black text-slate-800">{student.progress}%</p>
                  </div>
                  <div className="bg-slate-50/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-50 sm:border-0">
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase mb-0.5 tracking-widest">Заданий</p>
                    <p className="text-lg sm:text-xl font-black text-slate-800">{student.tasks}</p>
                  </div>
                </div>

                {/* Действия */}
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    className="p-3.5 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl text-slate-400 hover:text-[#6C5CE7] hover:bg-purple-50 transition-all flex items-center justify-center shrink-0 active:scale-95"
                    title="Написать сообщение"
                  >
                    <MessageSquare size={18} className="sm:size-5" />
                  </button>
                  <button className="flex-1 sm:flex-none px-5 py-3.5 sm:px-6 sm:py-4 bg-[#6C5CE7] text-white rounded-xl sm:rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#5A4AD1] transition-all text-center whitespace-nowrap active:scale-95 shadow-lg shadow-purple-100">
                    Поставить оценку
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}