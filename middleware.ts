import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 1. Освежаем сессию Supabase
  await supabase.auth.getUser();

  // 2. ЛОГИКА РОЛЕЙ И РЕДИРЕКТОВ
  const isLoggedIn = request.cookies.get('is_logged_in')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // ВСЕ РАНГИ СТРОГО МАЛЕНЬКИМИ БУКВАМИ ДЛЯ НАДЕЖНОСТИ
  const teacherRanks = [
    'absolute system creator', 
    'admin', 
    'teacher', 
    'senior python developer', 
    'isus'
  ];

  // Безопасно очищаем куку от пробелов и переводим в нижний регистр
  const userRoleNormalized = userRole ? decodeURIComponent(userRole).trim().toLowerCase() : '';

  // Теперь проверка регистра не боится!
  const isTeacher = teacherRanks.includes(userRoleNormalized);

  // Если пользователь не залогинен и пытается зайти на защищенные страницы
  if (!isLoggedIn && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Если залогинен и пытается зайти на страницу логина
  if (isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL(isTeacher ? '/teacher' : '/student', request.url));
  }

  // Защита раздела учителя от учеников
  if (pathname.startsWith('/teacher') && !isTeacher) {
    return NextResponse.redirect(new URL('/student', request.url));
  }

  // Защита раздела ученика от учителей
  if (pathname.startsWith('/student') && isTeacher) {
    return NextResponse.redirect(new URL('/teacher', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};