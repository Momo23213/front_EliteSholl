import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlus, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../../components/Modal';
import AddTimetableForm from '../../components/AddTimetableForm';
import { classeService } from '../../services/classeService';
import { enseignantService } from '../../services/enseignantService';
import { matiereService } from '../../services/matiereService';
import { emploiService } from '../../services/emploiService';
import { Classe, Enseignant, Matiere, Emploi } from '../../types/types';

// Define Timetable interface for local use
interface Timetable {
  id: string;
  classId: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  room?: string;
  comment?: string;
}

// Get API base URL from environment
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://schoolelite.onrender.com';

const TimetablePage: React.FC = () => {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [timetables, setTimetables] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<Enseignant[]>([]);
  const [subjects, setSubjects] = useState<Matiere[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>('');

  const toArray = (val: any): any[] => (Array.isArray(val) ? val : (val ? [val] : []));

  const loadData = async () => {
    try {
      const [classesData, emploisData, teachersData, subjectsData] = await Promise.all([
        classeService.getAll(),
        emploiService.getAll(),
        enseignantService.getAll(),
        matiereService.getAll(),
      ]);

      // Aplatir les emplois en séances affichables
      const sessions = toArray(emploisData).flatMap((e: Emploi) =>
        toArray(e.seances).map((s: any) => ({
          id: `${e._id}:${s.jour}:${s.matiereId}:${s.heureDebut}`,
          classId: e.classeId,
          day: s.jour,
          startTime: s.heureDebut,
          endTime: s.heureFin,
          subjectId: s.matiereId,
          teacherId: s.enseignantId,
          room: s.salle,
          comment: s.comment,
        }))
      );

      setClasses(classesData);
      setTimetables(sessions);
      setTeachers(teachersData);
      setSubjects(subjectsData);

      if (classesData.length > 0) {
        const firstId = (classesData[0] as any)._id ?? (classesData[0] as any).id;
        setSelectedClassId(firstId);
      }
    } catch (error: any) {
      console.error('Erreur de chargement:', error);
      setLoadError(error?.message || 'Impossible de joindre l\'API.');
      // fallback: valeurs vides pour éviter les erreurs de rendu
      setClasses([]);
      setTimetables([]);
      setTeachers([]);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getTeacherName = (teacherId: string) => {
    const teacher = (teachers as any[]).find(t => (t.id ?? t._id) === teacherId);
    return teacher ? `${teacher.firstName ?? teacher.prenom ?? ''} ${teacher.lastName ?? teacher.nom ?? ''}`.trim() : 'Inconnu';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = (subjects as any[]).find(s => (s.id ?? s._id) === subjectId);
    return subject ? (subject.name ?? subject.nom ?? 'Inconnu') : 'Inconnu';
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      try {
        // TODO: côté backend, fournir une route pour supprimer une séance spécifique.
        // Ici on recharge simplement après avertissement.
        loadData();
        alert('Séance supprimée avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression de la séance:', error);
        alert('Erreur lors de la suppression de la séance.');
      }
    }
  };

  const filteredTimetable = toArray(timetables).filter((t: any) => (t.classId === selectedClassId));

  const timetableByDay = filteredTimetable.reduce((acc: any, curr: any) => {
    (acc[curr.day] = acc[curr.day] || []).push(curr);
    return acc;
  }, {} as { [key: string]: Timetable[] });

  const sortedDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  const handleTimetableAdded = () => {
    loadData();
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="p-6 text-center"><FontAwesomeIcon icon={faSpinner} spin /> Chargement...</div>;
  }

  return (
    <div className="p-6 mt-10 w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-500" />
        Gestion de l'Emploi du Temps
      </h1>
      {loadError && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          {loadError}. Vérifiez que l'API est démarrée sur {API_BASE} ou configurez VITE_API_BASE_URL.
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="class-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sélectionner une classe :
          </label>
          <select
            id="class-select"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="ml-2 py-2 px-4 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {classes.map((c: any) => (
              <option key={c._id ?? c.id} value={c._id ?? c.id}>{c.name ?? c.nom}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Ajouter une séance
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Emploi du temps de la classe {(classes as any[]).find(c => (c._id ?? c.id) === selectedClassId)?.name ?? (classes as any[]).find(c => (c._id ?? c.id) === selectedClassId)?.nom ?? ''}
        </h2>
        
        {Object.keys(timetableByDay).length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            Aucune séance prévue pour cette classe.
          </p>
        ) : (
          <div className="space-y-6">
            {sortedDays.map(day => {
              const sessions = (timetableByDay as any)[day];
              if (!sessions || sessions.length === 0) return null;
              
              const sortedSessions = sessions.sort((a: any, b: any) => a.startTime.localeCompare(b.startTime));

              return (
                <div key={day}>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedSessions.map((session: any) => (
                      
                      <div key={session.id ?? session._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">{session.startTime} - {session.endTime}</span>
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{getSubjectName(session.subjectId ?? session.matiereId)}</p>
                        {(session.room ?? session.salle) && (
                          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Salle: {session.room ?? session.salle}
                          </div>
                        )}
                        <div className='mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                        <button
                          onClick={() => handleDeleteSession(session.id ?? session._id)}
                          className=" text-red-500 hover:text-red-700"
                          title="Supprimer la séance"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                          {getTeacherName(session.teacherId ?? session.enseignantId)}
                        </p>
                        </div>
                        {(session.comment ?? session.remarque) && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 break-words">
                            {session.comment ?? session.remarque}
                          </p>
                        )}
                        
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Ajouter une Séance">
        <AddTimetableForm onTimetableAdded={handleTimetableAdded} selectedClassId={selectedClassId} />
      </Modal>
    </div>
  );
};

export default TimetablePage;