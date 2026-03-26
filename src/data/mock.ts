import { GraduationCap, Banknote, Users } from 'lucide-react';

export const allAgents = [
  { id: 'AG-2024-001', name: 'Jean Dupont', initials: 'JD', role: 'Professeur', dept: "Sciences de l'Informatique", email: 'j.dupont@dac.edu', status: 'active' },
  { id: 'AG-2024-042', name: 'Marie Lambert', initials: 'ML', role: 'Caissier', dept: 'Services Financiers', email: 'm.lambert@dac.edu', status: 'active' },
  { id: 'AG-2023-112', name: 'Paul Martin', initials: 'PM', role: 'Administration', dept: 'Ressources Humaines', email: 'p.martin@dac.edu', status: 'inactive' },
  { id: 'AG-2024-088', name: 'Sophie Petit', initials: 'SP', role: 'Professeur', dept: 'Mathématiques Appliquées', email: 's.petit@dac.edu', status: 'active' },
  { id: 'AG-2024-089', name: 'Marc Tremblay', initials: 'MT', role: 'Administration', dept: 'Direction', email: 'm.tremblay@dac.edu', status: 'active' },
  { id: 'AG-2024-090', name: 'Julie Dubois', initials: 'JD', role: 'Caissier', dept: 'Services Financiers', email: 'j.dubois@dac.edu', status: 'active' },
  { id: 'AG-2024-091', name: 'Lucie Bernard', initials: 'LB', role: 'Professeur', dept: 'Physique', email: 'l.bernard@dac.edu', status: 'active' },
  { id: 'AG-2024-092', name: 'Thomas Leroy', initials: 'TL', role: 'Professeur', dept: "Sciences de l'Informatique", email: 't.leroy@dac.edu', status: 'inactive' },
];

export const stats = [
  { title: 'Total Professeurs', count: '84', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-100' },
  { title: 'Total Caissiers', count: '12', icon: Banknote, color: 'text-green-500', bg: 'bg-green-100' },
  { title: 'Administration', count: '32', icon: Users, color: 'text-[#ff00ff]', bg: 'bg-[#ff00ff]/10' },
];