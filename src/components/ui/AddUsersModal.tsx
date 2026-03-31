import { useActionState, useEffect, useState } from 'react';
import { X, User, Mail, Briefcase, Building2, Fingerprint, Key, ArrowRight, Phone } from 'lucide-react';
import { Controller, useForm } from "react-hook-form";
import { Role } from '@/data/models/models';
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectMultiple } from './forms/SelectMultiple';
import { createUserAction } from '@/data/actions/admins';
import { CreateUserFormSchema } from '@/lib/validators';
import FullPageLoader from './FullPageLoader';
import { Radio, } from 'flowbite-react';

export default function AddUsersModal({ isOpen, onClose, roles=[], updateAgentsList }: {isOpen: boolean, onClose: () => void, roles?: Role[], updateAgentsList?: (agent: any) => void}) { 

  const [isLoading, setIsLoading] = useState(false);
  const {control, register, handleSubmit, formState: { errors }  } = useForm({
    resolver: zodResolver(CreateUserFormSchema),
   
    // Optionnel : garder les valeurs par défaut
    // defaultValues: { matricule: "", email: "" } 
  });
     

    const onSubmit = async (data:any) => {
      console.log("Données du formulaire :", data);
    try {
      setIsLoading(true);
      const result = await createUserAction(data);
      if (result) {
        updateAgentsList && updateAgentsList(result);
        onClose();
        console.log("Agent créé avec succès :", result);
        // showSuccessNotification("Agent créé avec succès !");
      } else {
        // Échec : afficher une notification d'erreur
        // showErrorNotification("Échec de la création de l'agent. Veuillez réessayer.");
      }
    } catch (error) {
      // Si ça échoue ici, React Hook Form garde naturellement 
      // les valeurs dans les inputs car l'état n'a pas changé.
    }
      setIsLoading(false);
  };

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
    <div 
      className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto py-6 sm:py-12 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">Ajouter un nouvel agent</h2>
            <p className="text-primary text-sm font-semibold mt-1">Remplissez les informations pour créer un accès académique.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
            <X size={28} />
          </button>
        </div>

        {/* Formulaire */}
        <form className="p-8 pt-2 space-y-6" onSubmit={handleSubmit(onSubmit)}>
           <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Nom</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <User size={20} className="text-primary/40 shrink-0" />
              <input {...register('nom')} name='nom' id='nom' type="text" placeholder="ex: Mopao" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
            {errors?.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Postnom</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <User size={20} className="text-primary/40 shrink-0" />
              <input {...register('postnom')} name='postnom' id='postnom' type="text" placeholder="ex: Kilolo" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
            {errors?.postnom && <p className="text-red-500 text-sm mt-1">{errors.postnom.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Prénom</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <User size={20} className="text-primary/40 shrink-0" />
              <input {...register('prenom')} name='prenom' id='prenom' type="text" placeholder="ex: Jean" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
            {errors?.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
          </div>
          </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Genre</label>
              <div className="flex items-center bg-primary/5 rounded-2xl py-2 px-5 gap-2">
                    <div className="flex items-center">
                  <input {...register('sexe')} id="sexe-1" type="radio" value="MALE" name="sexe" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
                        <label htmlFor="sexe-1" className="select-none ms-2 text-sm font-medium text-heading">Masculin</label>
                    </div>
                    <div className="flex items-center">
                        <input {...register('sexe')} id="sexe-2" type="radio" value="FEMALE" name="sexe" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
                        <label htmlFor="sexe-2" className="select-none ms-2 text-sm font-medium text-heading">Féminin</label>
                    </div>

            </div>
             {errors?.sexe && <p className="text-red-500 text-sm mt-1">{errors.sexe.message}</p>}
        </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Adresse e-mail</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5 transition-all">
              <Mail size={20} className="text-primary/40 shrink-0" />
              <input {...register('email')} name='email' id='email' type="email" placeholder="nom.prenom@dac.edu" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
            {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Numéro de téléphone</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5 transition-all">
              <Phone size={20} className="text-primary/40 shrink-0" />
              <input {...register('telephone')} name='telephone' id='telephone' type="tel" placeholder="ex: +243 999 999 999" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
            {errors?.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Rôle</label>
              <div className="flex items-center bg-primary/5 rounded-2xl px-5">
              
              <Controller
              name="roles"
              control={control}
             render={({ field }) => (
          <SelectMultiple 
            roles={roles}
            // 'field.value' remplace votre state 'selectedRoles'
            selectedRoles={field.value} 
            // On intercepte le toggle pour mettre à jour React Hook Form
            toggleRole={(roleId) => {
              const currentRoles = field.value || [];
              const nextRoles = currentRoles.includes(roleId)
                ? currentRoles.filter(id => id !== roleId)
                : [...currentRoles, roleId];
              
              field.onChange(nextRoles); // Met à jour Zod et React Hook Form
            }}
          />
        )}/>

              </div>
              {errors?.roles && <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>}
            </div>
            {/* <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Département</label>
              <div className="flex items-center bg-primary/5 rounded-2xl px-5">
                <Building2 size={20} className="text-primary/40 shrink-0" />
                <select className="w-full bg-transparent py-4 pl-2 outline-none border-none ring-0 focus:ring-0 text-gray-700 cursor-pointer appearance-none font-medium">
                  <option>Choisir...</option>
                  <option>Informatique</option>
                  <option>Mathématiques</option>
                </select>
              </div>
            </div>
          </div> */}

          {/* <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Matricule / ID Agent</label>
            <div className="flex items-center bg-primary/5 rounded-2xl px-5">
              <Fingerprint size={20} className="text-primary/40 shrink-0" />
              <input type="text" placeholder="ex: AG-2024-XXX" className="w-full bg-transparent py-4 pl-3 outline-none border-none ring-0 focus:ring-0 text-gray-700 placeholder:text-primary/20 font-medium" />
            </div>
          </div> */}

          <div className="flex items-center justify-between bg-primary/5 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Key size={22} className="text-primary" />
              <span className="text-sm font-bold text-gray-700">Envoyer les identifiants par e-mail</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-10 pt-6">
            <button type="button" onClick={onClose} className="text-sm font-black text-gray-900 uppercase tracking-[0.15em] hover:opacity-50 transition-all">
              Annuler
            </button>
            <button type="submit" className="flex items-center gap-3 bg-primary hover:bg-hover text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl shadow-primary/30 transition-all active:scale-95">
              Créer le compte
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </form>
      </div>
    </div>
    <FullPageLoader loading={isLoading} message="Création du compte en cours..." />
    </>
    
  );
}