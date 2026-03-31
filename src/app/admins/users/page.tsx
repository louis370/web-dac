"use client";

import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { allAgents, stats } from '@/data/mock';
import UsersHeader from '@/components/ui/BreadCumbPage'
import Filters from '@/components/ui/Filters';
import AgentsTable from '@/components/ui/UsersTable';
import StatsGrid from '@/components/ui/StatsGrid';
import AddUsersModal from '@/components/ui/AddUsersModal'; 
import AppLayout from '@/components/layouts/AppLayout';
import BreadCumbPage from '@/components/ui/BreadCumbPage';
import { Plus } from 'lucide-react';
import { Role, User } from '@/data/models/models';
import { getUsersAction } from '@/data/actions/admins';
import FullPageLoader from '@/components/ui/FullPageLoader';



export default function AgentsPage() {
  const [agents, setAgents] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | "Tous les rôles">("Tous les rôles");
  const [deptFilter, setDeptFilter] = useState("Tous les départements");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.postnom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.matricule?.toLowerCase().includes(searchTerm.toLowerCase()); 
        const rolesId = agent.roles.map((r)=>r.id)
      const matchesRole =
        roleFilter === "Tous les rôles" || rolesId.includes(Number(roleFilter));
      // const matchesDept =
      //   deptFilter === "Tous les départements" || agent.dept === deptFilter;
      return matchesSearch && matchesRole /* && matchesDept; */
    });
  }, [searchTerm, agents, roleFilter, /* deptFilter */]);

  const fetchAgents = async () => {
      setIsLoading(true);
      const agents = await getUsersAction(); 
      if (agents) {
        setAgents(agents.agents);
        setRoles(agents.roles);
      }
      setIsLoading(false);
    };


    const updateListAgents = (agent:User) => {
      setAgents((prevAgents) => {
         const updatedAgents = [...prevAgents];
        const existingAgentIndex = prevAgents.findIndex((a) => a.id === agent.id);
        if (existingAgentIndex !== -1) {
          updatedAgents[existingAgentIndex] = agent;
          return updatedAgents;
        }
        updatedAgents.unshift(agent);
        return updatedAgents;
      });
    };


  useEffect(() => {
    setCurrentPage(1);
    fetchAgents();
  }, [searchTerm, roleFilter, deptFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + itemsPerPage);

  const actionHeader = (
    <button 
          onClick={()=>setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          Ajouter un agent
        </button>
        )


  return (
    <AppLayout onRefresh={fetchAgents} pageTitle="Gestion d'utilisateur" actionHeader={actionHeader} title="Gestion d'utilisateur" subtitle="Consultez et gérez les professeurs, caissiers et le personnel administratif de l'institution.">
    <main className="max-w-6xl mx-auto w-full grow">
        <Filters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          roleFilter={roleFilter || "Tous les rôles"} setRoleFilter={setRoleFilter}
          uniqueRoles={roles}
          itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}
        />

          <AgentsTable
            agents={paginatedAgents}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={filteredAgents.length}
            totalPages={Math.ceil(filteredAgents.length / itemsPerPage)}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
          />

        <StatsGrid stats={stats} />
        <AddUsersModal 
          isOpen={isModalOpen} 
          roles={roles}
          updateAgentsList={updateListAgents}
          onClose={() => setIsModalOpen(false)} 
        />
      </main>
    <FullPageLoader loading={isLoading} />
    </AppLayout>
  );
}
