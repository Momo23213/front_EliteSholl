import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Loader2, X } from 'lucide-react';

interface AnneeScolaire {
  _id: string;
  libelle: string;
}

interface ClassCreationFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

interface ClassData {
  nom: string;
  niveau: string;
  anneeScolaireId: string;
  effMax: number;
}

export default function ClassCreationForm({ onSuccess, onCancel, onError }: ClassCreationFormProps) {
  const [formData, setFormData] = useState<ClassData>({
    nom: '',
    niveau: '',
    anneeScolaireId: '',
    effMax: 0,
  });
  const [anneesScolaires, setAnneesScolaires] = useState<AnneeScolaire[]>([]);
  const [loadingAnnees, setLoadingAnnees] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnneesScolaires = async () => {
      try {
        const response = await axios.get<AnneeScolaire[]>('http://localhost:3002/api/annees');
        setAnneesScolaires(response.data);
      } catch (err) {
        onError('Impossible de charger les années scolaires.');
      } finally {
        setLoadingAnnees(false);
      }
    };
    fetchAnneesScolaires();
  }, [onError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'effMax' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nom || !formData.niveau || !formData.anneeScolaireId || formData.effMax <= 0) {
      onError('Veuillez remplir tous les champs correctement.');
      return;
    }
    setLoadingSubmit(true);

    try {
      await axios.post('http://localhost:3002/api/classe/creer', formData);
      onSuccess();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        onError(err.response.data.message || 'Erreur lors de la création.');
      } else {
        onError('Une erreur inattendue est survenue.');
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 transform transition-transform duration-300 scale-95 md:scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Créer une Classe</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom de la classe</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="niveau" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Niveau</label>
            <input
              type="text"
              id="niveau"
              name="niveau"
              value={formData.niveau}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="anneeScolaireId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Année Scolaire</label>
            <div className="relative">
              <select
                id="anneeScolaireId"
                name="anneeScolaireId"
                value={formData.anneeScolaireId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                required
                disabled={loadingAnnees}
              >
                {loadingAnnees ? (
                  <option value="">Chargement...</option>
                ) : (
                  <>
                    <option value="" disabled>Sélectionner une année</option>
                    {anneesScolaires.map((annee) => (
                      <option key={annee._id} value={annee._id}>
                        {annee.libelle}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="effMax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Effectif maximum</label>
            <input
              type="number"
              id="effMax"
              name="effMax"
              value={formData.effMax}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              min="1"
            />
          </div>

          <button
            type="submit"
            disabled={loadingSubmit || loadingAnnees}
            className="w-full flex justify-center items-center px-4 py-2 text-white bg-purple-600 rounded-lg shadow-sm hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loadingSubmit ? (
              <span>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Création en cours...
              </span>
            ) : (
              <span>
                <Plus className="w-5 h-5 mr-2" />
                Créer la Classe
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}