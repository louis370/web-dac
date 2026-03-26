"use client" 
import React, { ReactNode, useState } from 'react'
import { AppNavbar } from './AppNavbar'
import { AppSidebar } from './AppSidebar'
import BreadCumbCustomise from '../ui/BreadCumbCustomise'
import BreadCumbPage from '../ui/BreadCumbPage'

export default function AppLayout({children, title, subtitle, pageTitle, actionHeader}:{children:ReactNode, title:string, subtitle:string, pageTitle?:string, actionHeader?:any}) {
    const [isCollapsed, setIsCollapsed]=useState(false)
  return (
          <div className="min-h-screen">
            <AppNavbar onChangeCollapsed={ ()=>setIsCollapsed(!isCollapsed)} isCollapsed={isCollapsed}/>
            <AppSidebar isCollapsed={isCollapsed} /> 
        <main className={`${isCollapsed ? 'ml-20' : 'ml-64'} flex-1 px-6 overflow-y-auto pt-24 transition-all duration-400`}>
          <BreadCumbPage title={title} subtitle={subtitle} pageTitle={pageTitle}>
          {actionHeader}
          </BreadCumbPage>
          {children}
        </main>
        </div>

  )
}
