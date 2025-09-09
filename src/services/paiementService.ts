import api from "./api";
import { Paiement } from "../types/types";

export const paiementService = {
  creer: async (data: Partial<Paiement>): Promise<Paiement> => {
    const res = await api.post("/creer", data);
    return res.data;
  },

  ajouter: async (data: Partial<Paiement>): Promise<Paiement> => {
    const res = await api.post("/ajouter", data);
    return res.data;
  },

  getByEleve: async (eleveId: string): Promise<Paiement[]> => {
    const res = await api.get(`/eleve/${eleveId}`);
    return res.data;
  },
  getAllPaiements: async (): Promise<Paiement[]> => {
    const res = await api.get(`/affichesPaiement`);
    return res.data;
  },

  getByClasseAnnee: async (eleveId: string, classeId: string, anneeScolaireId: string): Promise<Paiement[]> => {
    const res = await api.get(`/${eleveId}/${classeId}/${anneeScolaireId}`);
    return res.data;
  },

  remove: async (paiementId: string): Promise<void> => {
    await api.delete(`/${paiementId}`);
  },
};
