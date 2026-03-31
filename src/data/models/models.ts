export interface User {
  id: string;
  nom: string;
  prenom: string;
  postnom: string;
  matricule?: string;
  email: string;
  phone: string;
  status: UserStatus;
  sexe: Sexe;
  roles: Role[];
  created_at: Date;
}

export interface Role {
  id: number;
  nom: string;
  description: string;
  status: boolean;
  created_at: Date;
}

export enum UserStatus {
  EN_COURS,
  ACTIVE,
  DESACTIVE,
  SUPPRIME,
}

export enum Sexe {
  MALE,
  FEMALE,
}
