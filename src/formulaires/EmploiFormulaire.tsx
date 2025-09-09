import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Layers, Calendar, Clock, Plus, Trash, Book, GraduationCap, Grid } from 'lucide-react';

// Données fictives
const classesFictives = [
    { id: "classe1", nom: "6ème A" },
    { id: "classe2", nom: "5ème B" },
    { id: "classe3", nom: "4ème C" },
];
const anneesScolaires = [
    { id: "annee1", nom: "2024-2025" },
    { id: "annee2", nom: "2025-2026" },
];
const matieresFictives = [
    { id: "mat1", nom: "Mathématiques" },
    { id: "mat2", nom: "Français" },
    { id: "mat3", nom: "Histoire-Géographie" },
];
const enseignantsFictifs = [
    { id: "ens1", nom: "M. Albert" },
    { id: "ens2", nom: "Mme Claire" },
];
const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

// Définition de l'interface pour les entrées du formulaire
export interface EmploiDuTempsFormInputs {
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

const EmploiDuTempsForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<EmploiDuTempsFormInputs>({
        defaultValues: {
            seances: [{
                jour: '',
                matiereId: '',
                enseignantId: '',
                heureDebut: '',
                heureFin: ''
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "seances",
    });

    const onSubmit: SubmitHandler<EmploiDuTempsFormInputs> = (data) => {
        console.log("Données d'emploi du temps soumises :", data);
        reset();
    };

    const inputStyle = `
        w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white
        border border-gray-300 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
    `;
    const labelStyle = "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1";
    const errorStyle = "text-red-500 text-xs mt-1 italic";

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 max-w-4xl mx-auto my-10 border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                Créer un emploi du temps
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Sélection de la classe et de l'année scolaire */}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="classeId" className={labelStyle}><Layers size={16} />Classe</label>
                        <select id="classeId" {...register("classeId", { required: "La classe est requise" })} className={inputStyle}>
                            <option value="">Sélectionner une classe</option>
                            {classesFictives.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                        </select>
                        {errors.classeId && <p className={errorStyle}>{errors.classeId.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="anneeScolaireId" className={labelStyle}><Calendar size={16} />Année scolaire</label>
                        <select id="anneeScolaireId" {...register("anneeScolaireId", { required: "L'année scolaire est requise" })} className={inputStyle}>
                            <option value="">Sélectionner une année</option>
                            {anneesScolaires.map(a => <option key={a.id} value={a.id}>{a.nom}</option>)}
                        </select>
                        {errors.anneeScolaireId && <p className={errorStyle}>{errors.anneeScolaireId.message}</p>}
                    </div>
                </div>

                {/* Tableau de saisie des séances */}
                <div className="overflow-x-auto mt-8">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-4">
                        <Grid size={20} />Séances
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">Jour</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">Matière</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/4">Enseignant</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">Début</th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/6">Fin</th>
                                <th className="px-3 py-3 w-10"></th> {/* Colonne pour le bouton de suppression */}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {fields.map((field, index) => (
                                <tr key={field.id}>
                                    <td className="p-2">
                                        <select
                                            {...register(`seances.${index}.jour`, { required: true })}
                                            className={inputStyle}
                                        >
                                            <option value="">Jour</option>
                                            {joursSemaine.map(jour => <option key={jour} value={jour}>{jour}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <select
                                            {...register(`seances.${index}.matiereId`, { required: true })}
                                            className={inputStyle}
                                        >
                                            <option value="">Matière</option>
                                            {matieresFictives.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <select
                                            {...register(`seances.${index}.enseignantId`, { required: true })}
                                            className={inputStyle}
                                        >
                                            <option value="">Enseignant</option>
                                            {enseignantsFictifs.map(e => <option key={e.id} value={e.id}>{e.nom}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="time"
                                            {...register(`seances.${index}.heureDebut`, { required: true })}
                                            className={inputStyle}
                                        />
                                    </td>
                                    <td className="p-2">
                                        <input
                                            type="time"
                                            {...register(`seances.${index}.heureFin`, { required: true })}
                                            className={inputStyle}
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200"
                                            title="Supprimer la séance"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bouton pour ajouter une séance */}
                <button
                    type="button"
                    onClick={() => append({ jour: '', matiereId: '', enseignantId: '', heureDebut: '', heureFin: '' })}
                    className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                    <Plus size={18} /> Ajouter une séance
                </button>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 mt-6"
                >
                    Enregistrer l'emploi du temps
                </button>
            </form>
        </div>
    );
};

export default EmploiDuTempsForm;