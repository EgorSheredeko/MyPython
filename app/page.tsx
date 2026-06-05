"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      // Читаем куки авторизации напрямую из браузера
      const cookies = document.cookie.split('; ');
      
      const isLoggedInCookie = cookies.find(row => row.startsWith('is_logged_in='));
      const userRoleCookie = cookies.find(row => row.startsWith('user_role='));

      const isLoggedIn = isLoggedInCookie ? isLoggedInCookie.split('=')[1] === 'true' : false;
      
      // Если не авторизован — сразу отправляем на логин
      if (!isLoggedIn) {
        router.replace('/login');
        return;
      }

      // Декодируем роль, переводим в нижний регистр и очищаем от возможных кавычек и пробелов
      let userRole = '';
      if (userRoleCookie) {
        const rawRole = userRoleCookie.split('=')[1];
        userRole = decodeURIComponent(rawRole)
          .trim()
          .toLowerCase()
          .replace(/^"|"$/g, ''); // Удаляет кавычки на концах строки, если они есть
      }

      // Список учительских рангов / ролей для сверки
      const teacherRanks = [
        'isus', 
        'admin', 
        'teacher', 
        'senior python developer', 
        'absolute system creator'
      ];

      // Проверяем, входит ли роль в список разрешенных для админ-панели
      const isTeacher = teacherRanks.includes(userRole);

      if (isTeacher) {
        router.replace('/teacher');
      } else {
        router.replace('/student');
      }
    } catch (error) {
      console.error("Critical error during guild space routing:", error);
      // В случае непредвиденного сбоя парсинга кук сбрасываем на страницу логина
      router.replace('/login');
    }
  }, [router]);

  // Пока идет мгновенное распределение, показываем аккуратный лоадер в стиле RPG
  return (
    <div className="min-h-screen bg-[#F4F7FE] flex items-center justify-center p-4">
      <div className="text-center animate-pulse">
        <Loader2 className="animate-spin text-[#6C5CE7] mx-auto mb-4" size={40} />
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
          Loading Guild Space...
        </p>
      </div>
    </div>
  );
}