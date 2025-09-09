import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  BookOpen,
  Hash,
  User,
  Layers,
  Calendar,
  List
} from 'lucide-react';

// Définition de l'interface pour les entrées du formulaire de classe
export interface ClassFormInputs {
  nom: string;
  niveau?: string;
  anneeScolaireId?: string;
  enseignants?: string[];
  eleves?: string[];
  matieres?: string[];
  effMax: number;
}

// Données fictives pour les menus déroulants
const niveaux = ["Maternelle", "Primaire", "Collège", "Lycée"];
const anneesScolaires = [
  { id: "annee1", nom: "2024-2025" },
  { id: "annee2", nom: "2025-2026" },
];
const enseignantsFictifs = [
  { id: "ens1", nom: "M. Dubois" },
  { id: "ens2", nom: "Mme Martin" },
  { id: "ens3", nom: "Mlle Robert" },
];
const matieresFictives = [
  { id: "mat1", nom: "Mathématiques" },
  { id: "mat2", nom: "Français" },
  { id: "mat3", nom: "Histoire-Géographie" },
];

const ClassForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassFormInputs>();

  const onSubmit: SubmitHandler<ClassFormInputs> = (data) => {
    console.log("Données du formulaire de classe :", data);
    // Ici, tu peux envoyer les données à ton API.
    // Par exemple : await fetch('/api/classes', { method: 'POST', body: JSON.stringify(data) });
    reset(); // Réinitialise le formulaire après une soumission réussie
  };

  const inputStyle = `
    w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white
    border border-gray-300 dark:border-gray-700
    focus:outline-none focus:ring-2 focus:ring-purple-500
    transition-all duration-200
  `;

  const labelStyle = "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";
  const errorStyle = "text-red-500 text-xs mt-1 italic";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-2xl mx-auto my-10 border border-gray-200 dark:border-gray-800">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Créer une nouvelle classe
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Nom de la classe */}
        <div>
          <label htmlFor="nom" className={labelStyle}><BookOpen size={16} />Nom de la classe</label>
          <input
            id="nom"
            type="text"
            {...register("nom", { required: "Le nom de la classe est requis" })}
            className={inputStyle}
          />
          {errors.nom && <p className={errorStyle}>{errors.nom.message}</p>}
        </div>

        {/* Niveau et Effectif Maximum */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="niveau" className={labelStyle}><Layers size={16} />Niveau</label>
            <select
              id="niveau"
              {...register("niveau")}
              className={inputStyle}
            >
              <option value="">Sélectionner un niveau</option>
              {niveaux.map((niveau) => (
                <option key={niveau} value={niveau}>{niveau}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="effMax" className={labelStyle}><Hash size={16} />Effectif maximum</label>
            <input
              id="effMax"
              type="number"
              {...register("effMax", { 
                required: "L'effectif maximum est requis",
                min: { value: 1, message: "L'effectif doit être supérieur à 0" }
              })}
              className={inputStyle}
            />
            {errors.effMax && <p className={errorStyle}>{errors.effMax.message}</p>}
          </div>
        </div>

        {/* Enseignants et Matières */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="enseignants" className={labelStyle}><User size={16} />Enseignants</label>
            <select
              id="enseignants"
              multiple // Permet la sélection multiple
              {...register("enseignants")}
              className={inputStyle + ' h-32'} // Ajuste la hauteur pour la sélection multiple
            >
              {enseignantsFictifs.map(ens => (
                <option key={ens.id} value={ens.id}>{ens.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="matieres" className={labelStyle}><List size={16} />Matières</label>
            <select
              id="matieres"
              multiple
              {...register("matieres")}
              className={inputStyle + ' h-32'}
            >
              {matieresFictives.map(mat => (
                <option key={mat.id} value={mat.id}>{mat.nom}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Année scolaire */}
        <div>
          <label htmlFor="anneeScolaireId" className={labelStyle}><Calendar size={16} />Année scolaire</label>
          <select
            id="anneeScolaireId"
            {...register("anneeScolaireId")}
            className={inputStyle}
          >
            <option value="">Sélectionner une année</option>
            {anneesScolaires.map((annee) => (
              <option key={annee.id} value={annee.id}>{annee.nom}</option>
            ))}
          </select>
        </div>
        
        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Enregistrer la classe
        </button>
      </form>
    </div>
  );
};

export default ClassForm;