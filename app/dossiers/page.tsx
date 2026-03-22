"use client";

import React from 'react';
import { 
  FileText, CheckCircle, Clock, TrendingUp, 
  AlertCircle, Calendar, ArrowRight, BarChart3 
} from 'lucide-react';
import DossiersLayout from '@/components/layouts/DossiersLayout';

export default function DashboardDossiers() {
  
  const stats = [
    { 
      label: "TOTAL DOSSIERS REÇUS", 
      value: "1,482", 
      trend: "+12% ce mois", 
      icon: <FileText size={24} />, 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      label: "DOSSIERS TRAITÉS", 
      value: "945", 
      trend: "64% du total complété", 
      icon: <CheckCircle size={24} />, 
      color: "text-green-500", 
      bg: "bg-green-50" 
    },
    { 
      label: "DOSSIERS EN ATTENTE", 
      value: "537", 
      trend: "Action requise", 
      icon: <Clock size={24} />, 
      color: "text-[#ff00ff]", 
      bg: "bg-[#ff00ff]/10",
      urgent: true 
    },
  ];

  const activities = [
    { name: "M. Jean-Paul Bakary", action: "Dossier #DAC-2024-0892 validé", time: "IL Y A 12 MIN", color: "bg-green-500" },
    { name: "Mlle. Sarah Mukala", action: "Dossier incomplet (Pièces jointes)", time: "IL Y A 45 MIN", color: "bg-[#ff00ff]" },
    { name: "M. David Umba", action: "Nouveau dossier soumis", time: "IL Y A 1 HEURE", color: "bg-blue-500" },
    { name: "Mlle. Clarisse Tshimanga", action: "Paiement frais vérifié", time: "IL Y A 2 HEURES", color: "bg-green-500" },
    { name: "Archive Automatique", action: "24 dossiers transférés", time: "IL Y A 4 HEURES", color: "bg-gray-300" },
  ];

  const HeaderAction = (
    <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
      Générer Rapport Journalier
    </button>
  );

  return (
    <DossiersLayout
      pageTitle="Bonjour, M. Kasongo" 
      subtitle="Voici l'état actuel des inscriptions pour l'année académique 2024-2025."
      headerAction={HeaderAction}
    >
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h3>
              <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 ${stat.urgent ? 'text-orange-500' : 'text-gray-400'}`}>
                {stat.urgent && <AlertCircle size={12} />} {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-gray-900">Dossiers traités par jour</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">Statistiques des 7 derniers jours ouvrables</p>
            </div>
            <div className="bg-gray-50 p-1 rounded-xl flex gap-1">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold text-gray-900">Semaine</button>
              <button className="px-4 py-1.5 text-xs font-bold text-gray-400 hover:text-gray-600">Mois</button>
            </div>
          </div>

          <div className="h-75 w-full relative flex items-end justify-between px-4 pb-8">
            <div className="absolute inset-0 flex flex-col justify-between py-2">
               {[1,2,3,4].map(l => <div key={l} className="w-full border-t border-gray-50"></div>)}
            </div>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
              <div key={day} className="relative flex flex-col items-center gap-4 z-10 w-full">
                <div 
                  className={`w-3 rounded-full transition-all duration-500 ${day === 'Mer' ? 'bg-[#2d3748] h-48' : 'bg-gray-100 h-24 hover:bg-[#ff00ff]/20'}`}
                >
                  {day === 'Mer' && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2d3748] text-white text-[10px] font-black py-1 px-3 rounded-lg shadow-xl">
                      84 dossiers
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold text-gray-400">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-gray-900">Activités récentes</h3>
            <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">Voir tout</button>
          </div>

          <div className="space-y-8 relative">

            <div className="absolute left-0.75 top-2 bottom-2 w-px bg-gray-50"></div>
            
            {activities.map((act, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`w-2 h-2 rounded-full ${act.color} mt-1.5 shrink-0`}></div>
                <div>
                  <p className="text-sm font-extrabold text-gray-900 leading-tight">{act.name}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{act.action}</p>
                  <p className="text-[9px] font-black text-gray-300 mt-1 uppercase tracking-tighter">{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-4 bg-gray-50 hover:bg-[#ff00ff]/5 text-primary rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            Historique complet <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50/50 border border-blue-100 p-6 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600">Dernière synchronisation effectuée avec le serveur central de l'Université</p>
            <p className="text-[10px] font-black text-blue-500">à 08:30 GMT+1. <span className="underline cursor-pointer">Toutes les données sont à jour.</span></p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Session active</p>
            <p className="text-xs font-bold text-gray-900">04h 22min</p>
          </div>
          <button className="bg-white p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-gray-600 shadow-sm transition-colors">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          © 2024 DAC - Portail Agent • Direction des Affaires Académiques
        </p>
      </footer>

    </DossiersLayout>
  );
}