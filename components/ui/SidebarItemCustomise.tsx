import { SidebarItem } from 'flowbite-react'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { IconType } from 'react-icons'
import { HiDatabase } from 'react-icons/hi'

export default function SidebarItemCustomise({label, href='#', icon=HiDatabase, isCollapsed=false}:{label:string, href?:string, isLinked?:boolean, icon?:IconType, isCollapsed:boolean}) {
   const pathname = usePathname();
  
    const isActive = (path: string) => pathname === path;
  

    const nativeLinkClass=`flex items-center px-4 py-3 font-semibold rounded-xl transition-all duration-400 ${!isCollapsed ? 'gap-3' : ''}`
    const activeClass = "bg-[#ff00ff]/10 text-[#ff00ff] shadow-sm";
    
    const inactiveClass = "text-gray-500 hover:bg-gray-50 hover:text-gray-700";

    const Icon : IconType = icon
  
  return (
        <Link href={href} title={label} className={`${nativeLinkClass} ${isActive(href) ? activeClass : inactiveClass}`}>
            <Icon size={20} className={isActive(href) ? "text-[#ff00ff]" : "text-gray-400 group-hover:text-gray-600"} />
            <span className={`${isCollapsed ? 'hidden' : ''} transition-all duration-400`}>{label}</span>
        </Link> )
}
