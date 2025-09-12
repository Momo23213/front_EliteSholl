import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

// Types
interface Classe {
  _id: string;
  nom: string;
  niveau?: string;
}

interface Parcours {
  _id: string;
  classeId: Classe;
  anneeScolaireId?: { _id: string; libelle: string };
  dateInscription: string;
  dateSortie?: string;
  typeInscription: string;
}

interface PaiementDetail {
  typePaiement: string;
  montant: number;
  datePaiement: string;
}

interface Paiement {
  _id: string;
  montantTotal: number;
  montantPaye: number;
  montantRestant: number;
  paiements: PaiementDetail[];
  classeId: Classe;
  anneeScolaireId: { _id: string; libelle: string };
}

interface Matiere {
  _id: string;
  nom: string;
  coef?: number;
}

interface Enseignant {
  _id: string;
  nom: string;
  prenom: string;
}

interface Note {
  _id: string;
  valeur: number;
  trimestre: string;
  sequence: string;
  matiereId: Matiere;
  enseignantId: Enseignant;
  anneeScolaireId: { _id: string; libelle: string };
}

interface Eleve {
  _id: string;
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  classeId: Classe;
  parcours: Parcours[];
  statut: string;
  photo?: string;
}

const Historiques: React.FC = () => {
  const { user } = useAuth(); // Typage du user
  const [eleve, setEleve] = useState<Eleve | null>(null);
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const id = user?.id;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [eleveRes, paiementRes, noteRes] = await Promise.all([
          axios.get<Eleve>(`https://schoolelite.onrender.com/api/eleves/${id}`),
          axios.get<Paiement[]>(`https://schoolelite.onrender.com/api/paiement/eleves/${id}`),
          axios.get<Note[]>(`https://schoolelite.onrender.com/api/notes/eleve/${id}`),
        ]);

        setEleve(eleveRes.data);
        setPaiements(paiementRes.data);
        setNotes(
          noteRes.data.sort((a, b) =>
            a.anneeScolaireId.libelle.localeCompare(b.anneeScolaireId.libelle)
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (!eleve) return <p className="p-4">Chargement...</p>;

  return (
    <div className="bg-gray-50 mt-10 w-full dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* En-tête élève */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow">
        {eleve.photo && (
          <img
            src={`https://schoolelite.onrender.com${eleve.photo}`}
            alt="photo élève"
            className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{eleve.nom} {eleve.prenom}</h1>
          <p>Matricule : {eleve.matricule}</p>
          <p>Classe actuelle : {eleve.classeId.nom}</p>
          <p>Statut : {eleve.statut}</p>
          <p>Sexe : {eleve.sexe}</p>
          <p>Date de naissance : {new Date(eleve.dateNaissance).toLocaleDateString("fr-FR")}</p>
          <p>Lieu de naissance : {eleve.lieuNaissance}</p>
        </div>
      </div>

      {/* Parcours scolaire */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Parcours scolaire</h2>
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-fixed bg-gray-100 dark:bg-gray-800 rounded-2xl shadow">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="w-1/5 px-4 py-2 text-left">Classe</th>
                <th className="w-1/5 px-4 py-2 text-left">Année scolaire</th>
                <th className="w-1/5 px-4 py-2 text-left">Date inscription</th>
                <th className="w-1/5 px-4 py-2 text-left">Date sortie</th>
                <th className="w-1/5 px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {eleve.parcours.map((p) => (
                <tr key={p._id} className="border-b border-gray-300 dark:border-gray-600">
                  <td className="px-4 py-2">{p.classeId.nom}</td>
                  <td className="px-4 py-2">{p.anneeScolaireId?.libelle || "-"}</td>
                  <td className="px-4 py-2">{new Date(p.dateInscription).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-2">{p.dateSortie ? new Date(p.dateSortie).toLocaleDateString("fr-FR") : "-"}</td>
                  <td className="px-4 py-2">{p.typeInscription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eleve.parcours.map((p) => (
            <div key={p._id} className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow p-4">
              <p className="font-semibold text-lg">{p.classeId.nom}</p>
              <p>Année scolaire : {p.anneeScolaireId?.libelle || "-"}</p>
              <p>Date inscription : {new Date(p.dateInscription).toLocaleDateString("fr-FR")}</p>
              <p>Date sortie : {p.dateSortie ? new Date(p.dateSortie).toLocaleDateString("fr-FR") : "-"}</p>
              <p>Type : {p.typeInscription}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Paiements */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Paiements</h2>
        {paiements.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paiements.map((p) => (
              <div key={p._id} className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow p-4">
                <p className="font-semibold">{p.anneeScolaireId.libelle} - {p.classeId.nom}</p>
                <p>Total : {p.montantTotal}</p>
                <p>Payé : {p.montantPaye}</p>
                <p>Restant : {p.montantRestant}</p>
                <div className="mt-2 space-y-1">
                  {p.paiements.map((pay, idx) => (
                    <div key={idx} className="text-sm">
                      {pay.typePaiement} : {pay.montant} ({new Date(pay.datePaiement).toLocaleDateString("fr-FR")})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun paiement effectué</p>
        )}
      </div>

      {/* Notes */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Notes</h2>
        {notes.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((n) => (
              <div key={n._id} className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow p-4">
                <p className="font-semibold">{n.matiereId.nom} ({n.matiereId.coef || 1})</p>
                <p>Valeur : {n.valeur}</p>
                <p>Trimestre : {n.trimestre}</p>
                <p>Sequence : {n.sequence}</p>
                <p>Enseignant : {n.enseignantId.nom} {n.enseignantId.prenom}</p>
                <p>Année scolaire : {n.anneeScolaireId.libelle}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune note enregistrée</p>
        )}
      </div>
    </div>
  );
};

export default Historiques;