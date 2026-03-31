
import { Role } from "@/data/models/models";
import { Checkbox, Label } from "flowbite-react"; 

export function SelectMultiple({roles = [], toggleRole, selectedRoles=[]}: {roles?: Role[], toggleRole: (roleId: number) => void, selectedRoles?:number[]}) {
    
  return (
    <div className="flex max-w-md flex-col gap-4 p-2" id="checkbox">
      {roles.map((r)=><div className="flex flex-wrap items-center gap-2">
        <Checkbox checked={selectedRoles.includes(r.id)} onChange={() => toggleRole(r.id)} id={r.id.toString()} color="pink" className="border-primary"/>
        <Label htmlFor={r.id.toString()} className="flex">
            {r.nom}
        </Label>
      </div> 
    )} 
    </div>
  );
}
