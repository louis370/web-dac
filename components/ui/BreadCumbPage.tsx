import { Plus } from 'lucide-react';
import BreadCumbCustomise from './BreadCumbCustomise';
import { ReactNode } from 'react';

export default function BreadCumbPage({ children, pageTitle, title, subtitle }: {children?:ReactNode, pageTitle?:string, title:string, subtitle:string}) {
  return (
    <div className="mb-4">
    
    <BreadCumbCustomise title={pageTitle}/>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-500 font-medium">
            {subtitle}
          </p>
        </div>
       {children}
      </div>
    </div>
  );
}