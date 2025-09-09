import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faUser, faBook, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { classeService } from '../services/classeService';
import { enseignantService } from '../services/enseignantService';
import { matiereService } from '../services/matiereService';
import { emploiService } from '../services/emploiService';
import { Classe, Enseignant, Matiere } from '../types/types';

interface AddTimetableFormProps {
  onTimetableAdded: () => void;
  selectedClassId: string;
}

interface SessionData {
  jour: string;
  matiereId: string;
  enseignantId: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  comment: string;
}

const AddTimetableForm: React.FC<AddTimetableFormProps> = ({ onTimetableAdded, selectedClassId }) => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [teachers, setTeachers] = useState<Enseignant[]>([]);
  const [subjects, setSubjects] = useState<Matiere[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState<SessionData>({
    jour: '',
    matiereId: '',
    enseignantId: '',
    heureDebut: '',
    heureFin: '',
    salle: '',
    comment: ''
  });

  const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [classesData, teachersData, subjectsData] = await Promise.all([
          classeService.getAll(),
          enseignantService.getAll(),
          matiereService.getAll()
        ]);

        setClasses(classesData);
        setTeachers(teachersData);
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Impossible de charger les données nécessaires');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Validation
      if (!formData.jour || !formData.matiereId || !formData.enseignantId || !formData.heureDebut || !formData.heureFin) {
        setError('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (formData.heureDebut >= formData.heureFin) {
        setError('L\'heure de fin doit être après l\'heure de début');
        return;
      }

      // Créer la séance
      const sessionData = {
        classeId: selectedClassId,
        seances: [formData]
      };

      await emploiService.create(sessionData);
      onTimetableAdded();
    } catch (error: any) {
      console.error('Erreur lors de la création de la séance:', error);
      setError(error?.message || 'Erreur lors de la création de la séance');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FontAwesomeIcon icon={faCalendarAlt} spin className="text-2xl text-blue-500 mr-2" />
        <span>Chargement des données...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
        Ajouter une nouvelle séance
      </h3>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="jour" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
              Jour de la semaine *
            </label>
            <select
              id="jour"
              name="jour"
              value={formData.jour}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un jour</option>
              {joursSemaine.map(jour => (
                <option key={jour} value={jour}>{jour}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="matiereId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faBook} className="mr-1" />
              Matière *
            </label>
            <select
              id="matiereId"
              name="matiereId"
              value={formData.matiereId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner une matière</option>
              {subjects.map(subject => (
                <option key={subject._id || subject.id} value={subject._id || subject.id}>
                  {subject.nom || subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enseignantId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              Enseignant *
            </label>
            <select
              id="enseignantId"
              name="enseignantId"
              value={formData.enseignantId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un enseignant</option>
              {teachers.map(teacher => (
                <option key={teacher._id || teacher.id} value={teacher._id || teacher.id}>
                  {teacher.prenom || teacher.firstName} {teacher.nom || teacher.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="salle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
              Salle
            </label>
            <input
              type="text"
              id="salle"
              name="salle"
              value={formData.salle}
              onChange={handleChange}
              placeholder="Ex: A101, B205..."
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="heureDebut" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              Heure de début *
            </label>
            <input
              type="time"
              id="heureDebut"
              name="heureDebut"
              value={formData.heureDebut}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="heureFin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FontAwesomeIcon icon={faClock} className="mr-1" />
              Heure de fin *
            </label>
            <input
              type="time"
              id="heureFin"
              name="heureFin"
              value={formData.heureFin}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Commentaire
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={3}
            placeholder="Commentaires sur la séance..."
            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => onTimetableAdded()}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors flex items-center"
          >
            {submitting ? (
              <>
                <FontAwesomeIcon icon={faCalendarAlt} spin className="mr-2" />
                Création...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Créer la séance
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTimetableForm;
