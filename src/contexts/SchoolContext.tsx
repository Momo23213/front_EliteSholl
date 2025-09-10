import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Classe, Eleve, Matiere, AnneeScolaire } from "../types/types";
import { classeService } from "../services/classeService";
import { matiereService } from "../services/matiereService";
import { anneeService } from "../services/anneeService";
import { enseignantService } from "../services/enseignantService";

interface SchoolContextProps {
  classes: Classe[];
  eleves: Eleve[];
  matieres: Matiere[];
  annes: AnneeScolaire[];
  enseignants: any[];
  loading: boolean;
  fetchElevesByClasse: (classeId: string) => Promise<void>;
}

const SchoolContext = createContext<SchoolContextProps | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) throw new Error("useSchool must be used within a SchoolProvider");
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<ProviderProps> = ({ children }) => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [annes, setAnnes] = useState<AnneeScolaire[]>([]);
  const [loading, setLoading] = useState(false);

  const [enseignants, setEnseignants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      const [classesData, anneeData, matieresData, enseignantsData] = await Promise.all([
        classeService.getAll(),
        anneeService.getAll(),
        matiereService.getAll(),
        enseignantService.getAll()
      ]);
      setClasses(classesData);
      setAnnes(anneeData);
      setMatieres(matieresData);
      setEnseignants(enseignantsData);
      setLoading(false);
    }
    fetchInitialData();
  }, []);

  const fetchElevesByClasse = async (classeId: string) => {
    if (!classeId) {
      setEleves([]);
      return;
    }
    setLoading(true);
    try {
      const elevesData = await classeService.getAllEleve(classeId);
      setEleves(elevesData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SchoolContext.Provider value={{ classes, eleves, matieres, annes, enseignants, loading, fetchElevesByClasse }}>
      {children}
    </SchoolContext.Provider>
  );
};