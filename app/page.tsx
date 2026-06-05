"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Читаем куки авторизации напрямую из браузера
    const cookies = document.cookie.split('; ');
    
    const isLoggedInCookie = cookies.find(row => row.startsWith('is_logged_in='));
    const userRoleCookie = cookies.find(row => row.startsWith('user_role='));

    const isLoggedIn = isLoggedInCookie ? isLoggedInCookie.split('=')[1] === 'true' : false;
    const userRole = userRoleCookie ? decodeURIComponent(userRoleCookie.split('=')[1]).trim().toLowerCase() : '';

    // Если не авторизован — отправляем на логин
    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    // Список учительских рангов для сверки
    const teacherRanks = [
      'isus', 
      'admin', 
      'teacher', 
      'senior python developer', 
      'absolute system creator'
    ];

    // Распределяем в зависимости от роли/ранга из куки
    const isTeacher = teacherRanks.includes(userRole) || userRole === 'admin' || userRole === 'teacher';

    if (isTeacher) {
      router.replace('/teacher');
    } else {
      router.replace('/student');
    }
  }, [router]);

  // Пока идет мгновенное распределение, показываем аккуратный лоадер
  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#6C5CE7] mx-auto mb-4" size={40} />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Loading Guild Space...
        </p>
      </div>
    </div>
  );
}