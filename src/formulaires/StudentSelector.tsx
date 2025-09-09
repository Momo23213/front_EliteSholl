// src/components/StudentSelector.tsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Eleve } from '../types/types'; // Assurez-vous d'importer l'interface Eleve

interface StudentSelectorProps {
  eleves: Eleve[];
  onSelect: (eleve: Eleve) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({ eleves, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEleves = eleves.filter(eleve =>
    eleve.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eleve.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (eleve.matricule && eleve.matricule.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un élève..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <ul className="max-h-80 overflow-y-auto space-y-2">
        {filteredEleves.length > 0 ? (
          filteredEleves.map(eleve => (
            <li
              key={eleve._id}
              onClick={() => onSelect(eleve)}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="font-semibold text-gray-900 dark:text-white">{eleve.prenom} {eleve.nom}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 block"> - {eleve.matricule}</span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 dark:text-gray-400">Aucun élève trouvé.</li>
        )}
      </ul>
    </div>
  );
};

export default StudentSelector;