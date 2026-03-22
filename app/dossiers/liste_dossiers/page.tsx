"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, AlertCircle, GraduationCap, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import DossiersLayout from '@/components/layouts/DossiersLayout';

const mockDossiers = [
  { id: 1, date: "12/10/2023", isUrgent: true, nom: "Dupont", prenom: "Jean", faculte: "Médecine", promo: "2024", statut: "À vérifier" },
  { id: 2, date: "11/10/2023", isUrgent: false, nom: "Curie", prenom: "Marie", faculte: "Sciences Appliquées", promo: "2023", statut: "En cours" },
  { id: 3, date: "10/10/2023", isUrgent: false, nom: "Einstein", prenom: "Albert", faculte: "Physique Quantique", promo: "2024", statut: "À vérifier" },
  { id: 4, date: "09/10/2023", isUrgent: false, nom: "Sankara", prenom: "Thomas", faculte: "Droit International", promo: "2023", statut: "En cours" },
  { id: 5, date: "08/10/2023", isUrgent: false, nom: "de Beauvoir", prenom: "Simone", faculte: "Lettres Modernes", promo: "2024", statut: "À vérifier" },
  { id: 6, date: "07/10/2023", isUrgent: true, nom: "Turing", prenom: "Alan", faculte: "Sciences Informatiques", promo: "2024", statut: "À vérifier" },
  { id: 7, date: "06/10/2023", isUrgent: false, nom: "Lovelace", prenom: "Ada", faculte: "Sciences Informatiques", promo: "2023", statut: "Validé" },
  { id: 8, date: "05/10/2023", isUrgent: false, nom: "Mandela", prenom: "Nelson", faculte: "Droit International", promo: "2024", statut: "En cours" },
  { id: 9, date: "04/10/2023", isUrgent: true, nom: "Parks", prenom: "Rosa", faculte: "Lettres Modernes", promo: "2023", statut: "À vérifier" },
  { id: 10, date: "03/10/2023", isUrgent: false, nom: "Pasteur", prenom: "Louis", faculte: "Médecine", promo: "2024", statut: "En cours" },
  { id: 11, date: "02/10/2023", isUrgent: false, nom: "Tesla", prenom: "Nikola", faculte: "Physique Quantique", promo: "2023", statut: "À vérifier" },
  { id: 12, date: "01/10/2023", isUrgent: true, nom: "Franklin", prenom: "Rosalind", faculte: "Sciences Appliquées", promo: "2024", statut: "En cours" },
];

const ITEMS_PER_PAGE = 5;

export default function ListeDossiersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [urgenceFilter, setUrgenceFilter] = useState('Toutes');
  const [faculteFilter, setFaculteFilter] = useState('Toutes');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDossiers = useMemo(() => {
    return mockDossiers.filter((dossier) => {
      const fullName = `${dossier.prenom} ${dossier.nom}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      
      const matchesUrgence = urgenceFilter === 'Toutes' || 
                            (urgenceFilter === 'Haute' && dossier.isUrgent) ||
                            (urgenceFilter === 'Normale' && !dossier.isUrgent);
      
      const matchesFaculte = faculteFilter === 'Toutes' || dossier.faculte === faculteFilter;

      return matchesSearch && matchesUrgence && matchesFaculte;
    });
  }, [searchTerm, urgenceFilter, faculteFilter]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, urgenceFilter, faculteFilter]);

  const totalPages = Math.ceil(filteredDossiers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDossiers = filteredDossiers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const uniqueFacultes = ['Toutes', ...Array.from(new Set(mockDossiers.map(d => d.faculte)))];

  const HeaderAction = (
    <button className="flex items-center gap-2 bg-primary hover:bg-hover text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#ff00ff]/25 transition-all active:scale-95">
      <Plus size={20} /> Nouveau dossier
    </button>
  );

  return (
    <DossiersLayout 
      pageTitle="Dossiers à traiter" 
      subtitle={`${filteredDossiers.length} dossiers en attente de vérification`}
      headerAction={HeaderAction}
    >
      
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-3 mb-6">
        
        <div className="flex-1 flex items-center bg-gray-50/50 rounded-xl px-4 focus-within:bg-gray-50 transition-colors">
          <Search className="text-gray-400 shrink-0" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher un étudiant, un numéro de dossier..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent py-3.5 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 font-medium placeholder:text-gray-400" 
          />
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap gap-3">
          <div className="flex items-center bg-gray-50/50 rounded-xl px-4 min-w-45">
            <AlertCircle size={18} className="text-primary shrink-0" />
            <select 
              value={urgenceFilter}
              onChange={(e) => setUrgenceFilter(e.target.value)}
              className="bg-transparent py-3.5 pl-2 pr-8 w-full text-gray-900 font-bold border-none outline-none focus:ring-0 cursor-pointer appearance-none"
            >
              <option value="Toutes">Urgence: Toutes</option>
              <option value="Haute">Urgence: Haute</option>
              <option value="Normale">Urgence: Normale</option>
            </select>
          </div>

          <div className="flex items-center bg-gray-50/50 rounded-xl px-4 min-w-50">
            <GraduationCap size={18} className="text-primary shrink-0" />
            <select 
              value={faculteFilter}
              onChange={(e) => setFaculteFilter(e.target.value)}
              className="bg-transparent py-3.5 pl-2 pr-8 w-full text-gray-900 font-bold border-none outline-none focus:ring-0 cursor-pointer appearance-none"
            >
              {uniqueFacultes.map(fac => (
                <option key={fac} value={fac}>{fac === 'Toutes' ? 'Faculté: Toutes' : fac}</option>
              ))}
            </select>
          </div>

          <button className="bg-gray-50/50 hover:bg-gray-100 text-gray-500 px-4 py-3 rounded-xl transition-colors shrink-0 flex items-center justify-center">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Date Réception</th>
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Étudiant</th>
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Faculté Demandée</th>
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Promotion</th>
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Statut</th>
                <th className="py-5 px-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/80">
              {paginatedDossiers.length > 0 ? paginatedDossiers.map((dossier) => (
                <tr key={dossier.id} className="hover:bg-gray-50/30 transition-colors">
                  
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-gray-900">{dossier.date}</span>
                      {dossier.isUrgent && <AlertCircle size={14} className="text-red-500 fill-red-100" />}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#ff00ff]/10 text-primary flex items-center justify-center font-black text-xs shrink-0 uppercase">
                        {dossier.prenom[0]}{dossier.nom[0]}
                      </div>
                      <div className="leading-tight">
                        <p className="font-extrabold text-gray-900 text-sm">{dossier.nom}</p>
                        <p className="font-semibold text-gray-500 text-sm">{dossier.prenom}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className="text-sm font-semibold text-gray-600">{dossier.faculte}</span>
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-gray-100/80 text-gray-500">
                      {dossier.promo}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {dossier.statut === "À vérifier" && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-600 border border-yellow-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> À vérifier
                      </span>
                    )}
                    {dossier.statut === "En cours" && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> En cours
                      </span>
                    )}
                    {dossier.statut === "Validé" && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Validé
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <Link 
                      href={`/dossiers/${dossier.id}`}
                      className="bg-primary hover:bg-hover text-white px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center"
                    >
                      Traiter le dossier
                    </Link>
                  </td>

                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500 font-medium">Aucun dossier trouvé avec ces filtres.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredDossiers.length > 0 && (
          <div className="border-t border-gray-100 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-semibold text-gray-500">
              Affichage de <span className="text-gray-900 font-black">{startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredDossiers.length)}</span> sur <span className="text-gray-900 font-black">{filteredDossiers.length}</span> dossiers
            </p>
            
            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-primary text-white shadow-md shadow-primary/20' 
                      : 'bg-transparent text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          © 2024 DAC - Portail Agent • Direction des Affaires Académiques
        </p>
      </footer>
    </DossiersLayout>
  );
}