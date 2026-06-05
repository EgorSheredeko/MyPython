"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { LogIn, Loader2, ShieldCheck, GraduationCap, Users, Zap } from 'lucide-react';

export default function LoginPage() {
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Ищем профиль по имени и паролю
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username.trim())
        .eq('password_plain', password.trim());

      if (error) throw error;

      const profile = profiles && profiles.length > 0 ? profiles[0] : null;

      if (!profile) {
        setErrorMsg("Invalid credentials");
        setLoading(false);
        return;
      }

      // СОХРАНЯЕМ КУКИ ДЛЯ MIDDLEWARE И ДИНАМИЧЕСКИХ СТРАНИЦ
      document.cookie = `user_role=${encodeURIComponent(profile.rank)}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `is_logged_in=true; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `username=${encodeURIComponent(profile.username)}; path=/; max-age=86400; SameSite=Lax`;

      // НЕУБИВАЕМАЯ ЛОГИКА ОПРЕДЕЛЕНИЯ РОЛИ (Регистронезависимая)
      // Все проверочные ранги пишем строго МАЛЕНЬКИМИ буквами
      const teacherRanks = [
        'isus', 
        'admin', 
        'teacher', 
        'senior python developer', 
        'absolute system creator'
      ];

      // Очищаем данные из базы от случайных пробелов и переводим в нижний регистр
      const userRankNormalized = profile.rank ? profile.rank.trim().toLowerCase() : '';
      const userRoleNormalized = profile.role ? profile.role.trim().toLowerCase() : '';

      // Проверяем, совпадает ли нормализованный ранг или роль администратора
      const isTeacher = teacherRanks.includes(userRankNormalized) || userRoleNormalized === 'admin';

      // ПЕРЕНАПРАВЛЕНИЕ С УЧЕТОМ РОЛИ
      if (isTeacher) {
        window.location.href = '/teacher';
      } else {
        window.location.href = '/student';
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Database error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-800">
      {/* Контейнер карточки */}
      <div className="bg-white w-full max-w-[440px] rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 shadow-2xl border border-slate-100 relative overflow-hidden transition-all duration-300">
        
        {/* Декоративный элемент на фоне */}
        <div className="absolute -top-10 -right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-50 rounded-full blur-3xl pointer-events-none" />
        
        {/* Хедер формы */}
        <div className="text-center mb-8 sm:mb-10 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#6C5CE7] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-200 transition-all">
            <LogIn className="text-white w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic flex items-center justify-center gap-2">
            Algo<span className="text-[#6C5CE7]">Pro</span> 
            <Zap size={22} className="fill-amber-500 text-amber-500 animate-pulse sm:w-6 sm:h-6" />
          </h1>
          <p className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-2">
            System Authorization
          </p>
        </div>

        {/* Форма авторизации */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 relative z-10">
          {errorMsg && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-[10px] sm:text-[11px] font-black py-3 px-4 rounded-xl text-center uppercase tracking-wider">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-400 mb-1.5 sm:mb-2 ml-4">
              Username
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#6C5CE7] focus:bg-white outline-none transition-all font-bold"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-[9px] sm:text-[10px] font-black uppercase text-slate-400 mb-1.5 sm:mb-2 ml-4">
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base focus:border-[#6C5CE7] focus:bg-white outline-none transition-all font-bold"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-xs sm:text-sm tracking-widest shadow-xl shadow-purple-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>

        {/* Адаптивный Футер */}
        <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-6 opacity-40">
           <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[8px] sm:text-[9px] font-black uppercase">
              <ShieldCheck size={12} className="sm:w-3.5 sm:h-3.5" /> Admin
           </div>
           <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[8px] sm:text-[9px] font-black uppercase">
              <GraduationCap size={12} className="sm:w-3.5 sm:h-3.5" /> Teacher
           </div>
           <div className="flex items-center justify-center sm:justify-start gap-1.5 text-slate-500 text-[8px] sm:text-[9px] font-black uppercase">
              <Users size={12} className="sm:w-3.5 sm:h-3.5" /> Student
           </div>
        </div>
      </div>
    </div>
  );
}