"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Star, CheckCircle, MessageSquare } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F8FAFF] p-10">
      <button 
        onClick={() => router.push('/teacher/groups')}
        className="flex items-center gap-2 text-slate-400 hover:text-[#6C5CE7] font-black uppercase text-[10px] tracking-widest mb-8"
      >
        <ChevronLeft size={16} /> К списку групп
      </button>

      <div className="bg-[#0F1035] rounded-[40px] p-10 text-white mb-10 shadow-xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Управление группой: {id?.toString().toUpperCase()}</h1>
        <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em]">Список курсантов и успеваемость</p>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-[30px] p-6 border border-slate-100 flex items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-[#6C5CE7] text-xl border border-slate-100">
                {student.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{student.name}</h3>
                <span className="text-[10px] font-black bg-[#6C5CE7]/10 text-[#6C5CE7] px-3 py-1 rounded-full uppercase">
                  {student.rank}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-12">
               <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Прогресс</p>
                  <p className="text-xl font-black text-slate-800">{student.progress}%</p>
               </div>
               <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest">Заданий</p>
                  <p className="text-xl font-black text-slate-800">{student.tasks}</p>
               </div>
               <div className="flex gap-2">
                  <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#6C5CE7] hover:bg-purple-50 transition-all">
                    <MessageSquare size={20} />
                  </button>
                  <button className="px-6 py-4 bg-[#6C5CE7] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-lg transition-all">
                    Поставить оценку
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}