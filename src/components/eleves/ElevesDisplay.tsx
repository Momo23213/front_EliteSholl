import React, { useState } from "react";
import { Eleve } from "../../types/types";
import {  Filter, Plus, Search, ChevronDown,  GraduationCap, DollarSign, User } from "lucide-react";
import { formatDate } from './../../utils/formeteDate';
import { Link } from "react-router-dom";

interface ElevesDisplayProps {
  eleves: Eleve[];
  onEdit?: (eleve: Eleve) => void;
  onDelete?: (eleve: Eleve) => void;
  onDetail?: (eleve: Eleve) => void;
  onAddEleve: () => void;
  onReinsEleve: (eleve: Eleve) => void;
  onScolariteCheck: () => void;
}

const ElevesDisplay: React.FC<ElevesDisplayProps> = ({ eleves, onEdit, onDelete, onAddEleve, onReinsEleve, onScolariteCheck }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    classeId: "",
    statut: "",
    sexe: "",
  });

  const uniqueClasses = Array.from(new Set(eleves.map(e => e.classeId.nom)));

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredEleves = eleves.filter(eleve => {
    const matchesSearchTerm =
      eleve.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.classeId.nom.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.classeId === "" || eleve.classeId.nom === filters.classeId) &&
      (filters.statut === "" || eleve.statut === filters.statut) &&
      (filters.sexe === "" || eleve.sexe === filters.sexe);

    return matchesSearchTerm && matchesFilters;
  });

  const getStatusColor = (statut: Eleve["statut"]) => {
    return statut === "inscrit" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête de la page */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">Gestion des Élèves</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organisez et gérez les informations de vos élèves.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105" onClick={onAddEleve}>
              <Plus className="w-4 h-4 mr-2" />
              Inscrire un élève
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105" onClick={onReinsEleve}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Réinscrire
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105" onClick={onScolariteCheck}>
              <DollarSign className="w-4 h-4 mr-2" />
              Contrôle scolarité
            </button>
          </div>
        </header>

        {/* Barre de recherche et filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom, matricule, classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Section des filtres (affichée/masquée) */}
          <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-600">
              <div>
                <label className="block text-sm font-medium mb-1">Classe</label>
                <select name="classeId" value={filters.classeId} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Toutes les classes</option>
                  {uniqueClasses.map(classe => <option key={classe} value={classe}>{classe}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Statut</label>
                <select name="statut" value={filters.statut} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Tous les statuts</option>
                  <option value="inscrit">Inscrit</option>
                  <option value="reinscrit">Réinscrit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <select name="sexe" value={filters.sexe} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Tous les sexes</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des élèves (Desktop) */}
        <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Photo</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Matricule</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nom & Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sexe</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Classe</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEleves.map((eleve) => (
                <tr key={eleve._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={`http://localhost:3002${eleve.photo}`}
                      alt={`${eleve.prenom} ${eleve.nom}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{eleve.matricule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{`${eleve.prenom} ${eleve.nom}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{ formatDate(eleve.dateNaissance)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{eleve.lieuNaissance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{eleve.sexe}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{eleve.classeId.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(eleve.statut)}`}>
                      {eleve.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => onEdit?.(eleve)} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500">
                      Modifier
                    </button>
                    <button onClick={() => onDelete?.(eleve)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500">
                      Supprimer
                    </button>
                    <button onClick={() => onReinsEleve?.(eleve)} className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-500">
                      Réinscrire
                    </button>
                    <Link to={`/eleves/detail/${eleve._id}`}  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Détail</Link>
                  </td>
                </tr>
              ))}
              {filteredEleves.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Aucun élève trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cartes des élèves (Mobile) */}
        <div className="md:hidden grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6">
          {filteredEleves.map((eleve) => (
            <div
              key={eleve._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`http://localhost:3002${eleve.photo}`}
                alt={`${eleve.prenom} ${eleve.nom}`}
                className="w-24 h-24 rounded-full mb-4 border-4 border-purple-500 dark:border-purple-400 object-cover"
              />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{`${eleve.prenom} ${eleve.nom}`}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400"></p>
              <p className="text-xs font-semibold mt-1">
                <span className={`px-2 py-1 rounded-full ${getStatusColor(eleve.statut)}`}>
                 {` Classe: ${eleve.classeId.nom} et statut: ${eleve.statut} `}
                </span>
              </p>
              <p className="text-xs font-semibold mt-1">
                <span className={`px-2 py-1 rounded-full mx-1`}>
                  {formatDate(eleve.dateNaissance)}
                </span>
              </p>
              <div className="flex space-x-2 mt-4 w-full justify-center">
                <button
                  onClick={() => onEdit?.(eleve)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete?.(eleve)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
                <Link to={`/eleves/detail/${eleve._id}`}  className="px-3 py-1 bg-gray-500 text-white rounded-lg text-xs hover:bg-gray-600 transition-colors">Détail</Link>
              </div>
            </div>
          ))}
          {filteredEleves.length === 0 && (
            <div className="sm:col-span-2 text-center text-gray-500 dark:text-gray-400 mt-4">
              Aucun élève trouvé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElevesDisplay;