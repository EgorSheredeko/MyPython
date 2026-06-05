"use client";
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, ArrowLeftRight, Shield, Sword, FlaskConical, 
  Coins, Zap, Gem, ChevronRight, Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

// Функция конвертации по курсу 100:100:100
const formatMedievalCurrency = (totalCopper: number) => {
  const gold = Math.floor(totalCopper / 10000);
  const silver = Math.floor((totalCopper % 10000) / 100);
  const copper = totalCopper % 100;
  return { gold, silver, copper };
};

export default function MedievalShop() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Динамическое извлечение имени текущего пользователя из куки
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || "");
        return null;
      };

      const currentUserName = getCookie('username');

      if (currentUserName) {
        const { data } = await supabase
          .from('profiles')
          .select('username, coins, rank')
          .eq('username', currentUserName)
          .single();
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [supabase]);

  const wallet = formatMedievalCurrency(profile?.coins || 0);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#F4F7FE] w-full lg:pl-[280px]">
      <Loader2 className="animate-spin text-[#6C5CE7]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 sm:p-8 lg:p-10 lg:ml-[280px] font-sans text-slate-900 transition-all duration-500">
      
      {/* ВЕРХНЯЯ ПАНЕЛЬ КОШЕЛЬКА */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 lg:mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-[#0F1035]">
            Royal <span className="text-[#6C5CE7]">Treasury</span>
          </h1>
          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2 leading-relaxed">
            Welcome, {profile?.rank || 'Recruit'} <span className="text-[#0F1035]">{profile?.username || 'Guest'}</span>
          </p>
        </div>
        
        {/* Адаптивный кошелек: сужается на мобильных экранах */}
        <div className="flex gap-1 sm:gap-2 bg-[#0F1035] p-1.5 sm:p-2 rounded-[24px] sm:rounded-[32px] shadow-2xl border-b-4 border-[#6C5CE7] max-w-full overflow-x-auto">
          <CurrencySlot amount={wallet.gold} label="Gold" color="text-yellow-500" />
          <div className="w-px h-8 sm:h-10 bg-white/10 self-center" />
          <CurrencySlot amount={wallet.silver} label="Silver" color="text-slate-300" />
          <div className="w-px h-8 sm:h-10 bg-white/10 self-center" />
          <CurrencySlot amount={wallet.copper} label="Copper" color="text-orange-400" />
        </div>
      </div>

      {/* ОСНОВНАЯ СЕТКА */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 lg:gap-10">
        
        {/* ВИТРИНА ТОВАРОВ */}
        <div className="col-span-12 lg:col-span-8 order-2 lg:order-1">
          <h2 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-6 lg:mb-8 flex items-center gap-2 justify-center sm:justify-start">
            <ShoppingBag size={14} /> Legendary Artifacts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <ArtifactCard title="Blade of Production" price={15000} desc="CNC router speed +20%" icon={<Sword />} color="bg-rose-500" />
            <ArtifactCard title="Loft Shield" price={8500} desc="UI/UX design protection" icon={<Shield />} color="bg-blue-500" />
            <ArtifactCard title="Logic Elixir" price={120} desc="Refreshes API calls instantly" icon={<FlaskConical />} color="bg-purple-500" />
            <ArtifactCard title="Supabase Scroll" price={10000} desc="Unlock 10 extra DB tables" icon={<Gem />} color="bg-emerald-500" />
          </div>
        </div>

        {/* ОБМЕННИК И ОБЩЕЕ БОГАТСТВО */}
        <div className="col-span-12 lg:col-span-4 space-y-6 lg:space-y-8 order-1 lg:order-2">
          {/* Карточка монетного двора */}
          <div className="bg-white rounded-[32px] sm:rounded-[44px] p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <ArrowLeftRight className="text-[#6C5CE7]" size={20} />
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase italic tracking-tight text-[#0F1035]">Mint Exchange</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <ExchangeRule from="1 Gold" to="100 Silver" fromColor="text-yellow-500" toColor="text-slate-400" />
                <ExchangeRule from="1 Silver" to="100 Copper" fromColor="text-slate-400" toColor="text-orange-500" />
              </div>

              <button className="w-full mt-6 sm:mt-8 bg-[#6C5CE7] hover:bg-[#5A4AD1] text-white py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black uppercase text-[10px] sm:text-[11px] tracking-[0.2em] transition-all active:scale-[0.98] shadow-lg shadow-purple-100">
                Forge Coins
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
          </div>

          {/* Информационный индиткатор общего баланса */}
          <div className="bg-[#0F1035] rounded-[32px] sm:rounded-[44px] p-6 sm:p-8 text-center border-b-8 border-[#6C5CE7] shadow-xl">
             <Coins size={36} className="mx-auto mb-3 text-[#6C5CE7]" />
             <p className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-widest mb-1.5">Current Wealth</p>
             <p className="text-2xl sm:text-3xl font-black text-white italic tracking-tighter">
               {(profile?.coins || 0).toLocaleString()} <span className="text-[#6C5CE7]">C</span>
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Компоненты-хелперы с адаптивной версткой
function CurrencySlot({ amount, label, color }: any) {
  return (
    <div className="px-3 sm:px-6 py-1.5 sm:py-2 text-center min-w-[70px] sm:min-w-[90px]">
      <p className={`text-xl sm:text-2xl font-black leading-none tracking-tight ${color}`}>{amount}</p>
      <p className="text-[7px] sm:text-[8px] font-bold text-white/40 uppercase mt-1 tracking-tighter">{label}</p>
    </div>
  );
}

function ArtifactCard({ title, price, desc, icon, color }: any) {
  const p = formatMedievalCurrency(price);
  return (
    <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer border-b-2 border-transparent hover:border-[#6C5CE7]/20 flex flex-col justify-between min-h-[260px] sm:min-h-auto">
      <div>
        <div className={`w-12 h-12 sm:w-16 sm:h-16 ${color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-lg text-white group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
        </div>
        <h4 className="text-xl sm:text-2xl font-black uppercase italic mb-1.5 tracking-tight text-[#0F1035]">{title}</h4>
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase mb-6 leading-relaxed">{desc}</p>
      </div>
      
      <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-50 mt-auto">
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          {p.gold > 0 && <span className="text-[11px] sm:text-[12px] font-black text-yellow-600">{p.gold}G</span>}
          {p.silver > 0 && <span className="text-[11px] sm:text-[12px] font-black text-slate-400">{p.silver}S</span>}
          {p.copper > 0 && <span className="text-[11px] sm:text-[12px] font-black text-orange-500">{p.copper}C</span>}
        </div>
        <div className="bg-slate-50 p-1.5 sm:p-2 rounded-full text-[#6C5CE7] group-hover:bg-[#6C5CE7] group-hover:text-white transition-colors shrink-0">
          <ChevronRight size={14} className="sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
}

function ExchangeRule({ from, to, fromColor, toColor }: any) {
  return (
    <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 gap-2">
      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-tight ${fromColor}`}>{from}</span>
      <ArrowLeftRight size={12} className="text-slate-300 shrink-0" />
      <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-tight ${toColor}`}>{to}</span>
    </div>
  );
}