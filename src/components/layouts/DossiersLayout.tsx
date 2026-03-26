"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Archive, Users, Settings, LogOut, Bell, GraduationCap } from 'lucide-react';

export default function DossiersLayout({ children, pageTitle, subtitle, headerAction } : any) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinkClass = "flex items-center gap-3 px-4 py-3 font-semibold rounded-xl transition-all duration-200 group";
  
  const activeClass = "bg-[#ff00ff]/10 text-[#ff00ff] shadow-sm";
  
  const inactiveClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-700";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-70 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
        
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#ff00ff] p-2 rounded-xl text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none tracking-tight">Agent DAC</h1>
            <p className="text-[10px] font-bold text-[#ff00ff] uppercase tracking-widest mt-1">Portail Inscription</p>
          </div>
        </div>

        {/* Navigation dynamique */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          
          <Link href="/dossiers" className={`${navLinkClass} ${isActive('/dossiers') ? activeClass : inactiveClass}`}>
            <LayoutDashboard size={20} className={isActive('/dossiers') ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            Tableau de bord
          </Link>

          <Link href="/dossiers/liste_dossiers" className={`${navLinkClass} ${isActive('/dossiers/liste_dossiers') || pathname.includes('/dossiers/liste_dossiers') ? activeClass : inactiveClass}`}>
            <FolderOpen size={20} className={isActive('/dossiers/liste_dossiers') || pathname.includes('/dossiers/liste_dossiers') ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            Dossiers à traiter
          </Link>

          <Link href="#" className={`${navLinkClass} ${isActive('#') ? activeClass : inactiveClass}`}>
            <Archive size={20} className={isActive('#') ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            Archives
          </Link>

          <div className="pt-8 pb-2">
            <p className="px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Administration</p>
          </div>
          
          <Link href="#" className={`${navLinkClass} ${isActive('#') ? activeClass : inactiveClass}`}>
            <Users size={20} className={isActive('#') ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            Agents
          </Link>

          <Link href="#" className={`${navLinkClass} ${isActive('#') ? activeClass : inactiveClass}`}>
            <Settings size={20} className={isActive('#') ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            Paramètres
          </Link>
        </nav>

        {/* Profil Utilisateur (Bas de sidebar) */}
        <div className="p-4 m-4 bg-gray-50 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff00ff]/10 flex items-center justify-center font-bold text-[#ff00ff]">MK</div>
            <div>
              <p className="text-sm font-bold text-gray-900">M. Kasongo</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Agent Senior</p>
            </div>
          </div>
          <button className="text-gray-300 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Reste du contenu */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{pageTitle}</h2>
            {subtitle && <p className="text-sm text-gray-500 font-medium mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-[#ff00ff] transition-colors"><Bell size={24} /></button>
            {headerAction}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          {children}
        </div>
      </main>
    </div>
  );
}