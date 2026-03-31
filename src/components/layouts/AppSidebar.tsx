"use client";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { FaBedPulse } from "react-icons/fa6";
import { HiChartPie, HiUser, HiShoppingBag, HiArrowSmRight, HiUsers } from "react-icons/hi";
import { RiMenuFoldLine } from "react-icons/ri"; 
import SidebarItemCustomise from "../ui/SidebarItemCustomise";
import { usePathname } from "next/navigation";
import { FolderOpen, icons, LayoutDashboard } from "lucide-react";

export function AppSidebar({isCollapsed,}:{isCollapsed:boolean}) {
  const pathname = usePathname()
  const liens =[
    {id:1,title:"Tableau de bord", link:'/', icon:HiChartPie},
    {id:2,title:"Agents universitaire", link:'/admins/users', icon:HiUsers},
    {id:3,title:"Tableau de bord", link:'/dossiers', icon:LayoutDashboard},
    {id:4,title:"Dossiers à traiter", link:'/dossiers/liste_dossiers', icon:FolderOpen}
  ]
  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} fixed h-screen transition-all duration-400 bg-white/90 backdrop-blur-md shadow-sm `}>
       <div className="py-3">
          <div className="flex justify-center items-center gap-1 ">
                    <Image src={"/favicon.svg"} alt={""} 
                    width={60}
                    height={60}
                    priority
                    className="rounded-2xl"
                    />
             <div className={`flex flex-col transition-all duration-500 ${isCollapsed? 'hidden':''}`}>
              <h1 className="font-black text-xl leading-none tracking-tight">DAC Congo</h1>
            <p className="text-[10px] font-bold text-[#ff00ff] uppercase tracking-widest mt-1">Portail academique</p>
            </div>
              
          </div>
          
       </div> 
    <div className="h-full flex flex-col gap-3 px-4 py-6 overflow-x-hidden overflow-y-auto w-full">
        {
                liens.map((l)=>
            <SidebarItemCustomise key={l.id} isCollapsed={isCollapsed} icon={l.icon} href={l.link} label={l.title} isLinked={pathname==l.link}/>)
              }
    </div>
       </aside>

  
    
  );
}