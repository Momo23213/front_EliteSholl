// types.ts

// ======================== ANNEE SCOLAIRE ========================
export interface AnneeScolaire {
  _id: string;
  libelle: string;
  debut: string;
  fin: string;
  createdAt?: string;
  updatedAt?: string;
}

// ======================== ELEVE ========================
export interface Parcours {
      classeId: {_id?:string,nom:string};
      anneeScolaire:  {_id?:string,libelle:string};
      dateInscription: string;
      dateSortie?: string; // remplie si l'élève change de classe
      typeInscription: string
    }
   
       export interface Eleve {
      _id: string;
      matricule?:string
      nom: string;
      prenom: string;
      lieuNaissance?:string;
      dateNaissance?: string;
      sexe?: "M" | "F";
      photo?: FileList;
      classeId: {_id?:string,nom:string};
      anneeScolaireId?:string;
      parcours?: Parcours[];
      statut: "inscrit" | "reinscrit";
    }
    
    // ======================== CLASSE ========================
    export interface Classe {
      _id: string;
      nom: string; // ex: CP1, 6ème A
      niveau?: string; // maternelle, primaire, collège, lycée
      enseignants?: string[];
      eleves?: string[];
      matieres?: string[];
      anneeScolaireId?: string;
      effMax?:number;
    }
    
    
    // ======================== MATIERE ========================
    export interface Matiere {
      _id: string;
      nom: string;
      coef: number;
    }
    // ======================== ENSEIGNANT ========================
    
    export interface Enseignant {
      _id: string;
      nom: string;
      prenom: string;
      email?: string;
      telephone?: string;
      matieres: string[];
      // classes: string[];
    }
 
// ======================== NOTE ========================
export interface Note {
  _id: string;
  eleveId: Eleve[];
  matiereId: {_id?:string,nom:string} ;
  enseignantId: Enseignant[];
  trimestre?: string;
  sequence?: string;
  valeur: number;
  anneeScolaireId: {_id?:string,libele:string};
  moyenne?:number;
  rang?:number;
  appreciation?:string
}
export interface TrimestreData {
  nom: string;
  sequences: Note[];
  moyenne: number;
}
// ======================== FRAIS SCOLARITE ========================
export interface FraisScolarite {
  _id: string;
  classeId: { _id?: string, nom:string};
  anneeScolaireId:{ _id?: string, libelle:string};
  inscription: number;
  reinscription: number;
  tranche1: number;
  tranche2: number;
  tranche3: number;
  montantTotal: number;
  createdAt?: string;
}

// ======================== PAIEMENT ========================
export interface Paiement {
  _id: string;
  eleveId: Eleve[];
  classeId:  {_id?:string,nom:string};
  anneeScolaireId: string;
  montantTotal: number;
  montantPaye: number;
  montantRestant: number;
  paiements: Array<{
    typePaiement: string;
    montant: number;
    datePaiement: string;
  }>;
  datePaiement?: string; // for compatibility, but not used in backend model
  methode?: string; // cash, mobile money, etc.
  createdAt: string;
  updatedAt?: string;
}

// ======================== PRESENCE ========================
export interface Presence {
  _id: string;
  eleveId: string;
  date: string;
  statut: "present" | "absent" | "retard";
  anneeScolaireId: string;
}

// ======================== EMPLOI DU TEMPS ========================
export interface Emploi {
  _id: string;
  classeId: string;
  anneeScolaireId: string;
  seances: {
    jour: string;
    matiereId: string;
    enseignantId: string;
    heureDebut: string;
    heureFin: string;
  }[];
}

// ======================== UTILISATEUR ========================
export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "admin" | "professeur" | "eleve";
  password?: string;
}

// ======================== NOTIFICATION ========================
export interface Notification {
  _id: string;
  userId: string;
  message: string;
  lu: boolean;
  createdAt: string;
}

// ======================== MESSAGE ========================
// export interface Message {
//   _id: string;
//   senderId: string;
//   receiverId?: string;
//   room?: string;
//   content: string;
//   createdAt: string;
//   updatedAt?: string;
// }

export interface Message {
  _id?: string;
  from: string;        // ID de l'expéditeur
  toRoom: string;      // nom de la salle ou "private:userId1-userId2"
  message: string;
  createdAt?: string;
  readBy?: string[];   // IDs des utilisateurs ayant lu le message
}

export interface TypingStatus {
  userId: string;
  room: string;
  isTyping: boolean;
}