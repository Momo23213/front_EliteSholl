import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteFormTable from '../../formulaires/note/NoteFormTable';

const NotesSaisie: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto">
        <div className="mb-4">
          <div className="flex items-start md:items-center justify-between gap-3 flex-col md:flex-row">
            <h1 className="text-2xl md:text-3xl font-extrabold">Saisie des notes</h1>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => navigate('/notes/resultats')}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              >
                Voir résultats
              </button>
              <button
                onClick={() => navigate('/notes')}
                className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Retour aux notes
              </button>
            </div>
          </div>
        </div>
        <NoteFormTable />
      </div>
    </div>
  );
};

export default NotesSaisie;


