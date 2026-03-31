import { Role } from '@/data/models/models';
import { Search } from 'lucide-react';

export default function Filters({ 
  searchTerm, setSearchTerm, 
  roleFilter, setRoleFilter, uniqueRoles,
  itemsPerPage, setItemsPerPage
}: {searchTerm: string, setSearchTerm: any, roleFilter: number | "Tous les rôles", setRoleFilter: any, uniqueRoles: Role[], itemsPerPage: number, setItemsPerPage: any}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 mb-8 items-center">
      
      <div className="flex-1 flex items-center bg-[#ff00ff]/5 rounded-xl px-4 w-full">
        <Search className="text-primary/50 shrink-0" size={20} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher par nom..." 
          className="w-full bg-transparent py-4 pl-3 outline-none border-none focus:ring-0 text-primary"
        />
      </div>

      <select 
        value={roleFilter || "Tous les rôles"}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="bg-gray-50 rounded-xl px-4 py-4 text-gray-700 font-semibold border-none outline-none focus:ring-0 cursor-pointer w-full sm:w-auto"
      >
         <option key="all" value="Tous les rôles">Tous les rôles</option>
        {uniqueRoles.map((role: any) => (
          <option key={role.id} value={role.id}>{role.nom}</option>
        ))}
      </select>

      <select 
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="bg-gray-50 rounded-xl px-4 py-4 text-gray-700 font-semibold border-none outline-none focus:ring-0 cursor-pointer w-full sm:w-auto"
      >
        <option value={5}>5 par page</option>
        <option value={10}>10 par page</option>
        <option value={20}>20 par page</option>
        <option value={50}>50  par page</option>
        {/* <option value={50}>50 par page</option> */}
      </select>
    
      
    </div>
  );
}