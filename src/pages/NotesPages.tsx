import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookOpen, 
  faPlus, 
  faTrash, 
  faSearch,
  faUsers,
  faChartBar,
  faGraduationCap,
  faTrophy,
  faExclamationTriangle,
  faCheckCircle,
  faDownload,
  faEye
} from '@fortawesome/free-solid-svg-icons';

interface Note {
  id: string;
  eleveId: string;
  eleveNom: string;
  elevePrenom: string;
  matiere: string;
  classe: string;
  note: number;
  noteMax: number;
  coefficient: number;
  type: 'devoir' | 'examen' | 'controle' | 'oral';
  date: string;
  trimestre: string;
  sequence: string;
  enseignant: string;
  appreciation?: string;
}

interface StatistiquesNotes {
  moyenneGenerale: number;
  totalNotes: number;
  notesExcellent: number;
  notesBien: number;
  notesPassable: number;
  notesInsuffisant: number;
  moyenneParMatiere: Record<string, number>;
  moyenneParClasse: Record<string, number>;
}

const NotesPages: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterMatiere, setFilterMatiere] = useState<string>('tous');
  const [filterClasse, setFilterClasse] = useState<string>('tous');
  const [filterTrimestre, setFilterTrimestre] = useState<string>('tous');
  const [newNote, setNewNote] = useState<Partial<Note>>({
    eleveNom: '',
    elevePrenom: '',
    matiere: '',
    classe: '',
    note: 0,
    noteMax: 20,
    coefficient: 1,
    type: 'devoir',
    date: new Date().toISOString().split('T')[0],
    trimestre: '1er Trimestre',
    sequence: '1ère Séquence',
    enseignant: '',
    appreciation: ''
  });

  const matieres = ['Mathématiques', 'Français', 'Anglais', 'Histoire-Géo', 'Sciences', 'Physique-Chimie', 'SVT', 'EPS', 'Arts'];
  const classes = ['6ème A', '6ème B', '5ème A', '5ème B', '4ème A', '4ème B', '3ème A', '3ème B'];
  const trimestres = ['1er Trimestre', '2ème Trimestre', '3ème Trimestre'];
  const sequences = ['1ère Séquence', '2ème Séquence', '3ème Séquence', '4ème Séquence'];

  // Données d'exemple
  useEffect(() => {
    const sampleNotes: Note[] = [
      {
        id: '1',
        eleveId: '1',
        eleveNom: 'Martin',
        elevePrenom: 'Lucas',
        matiere: 'Mathématiques',
        classe: '6ème A',
        note: 16,
        noteMax: 20,
        coefficient: 4,
        type: 'devoir',
        date: '2024-01-15',
        trimestre: '1er Trimestre',
        sequence: '1ère Séquence',
        enseignant: 'Marie Dupont',
        appreciation: 'Excellent travail'
      },
      {
        id: '2',
        eleveId: '2',
        eleveNom: 'Dubois',
        elevePrenom: 'Emma',
        matiere: 'Français',
        classe: '6ème A',
        note: 14,
        noteMax: 20,
        coefficient: 3,
        type: 'examen',
        date: '2024-01-20',
        trimestre: '1er Trimestre',
        sequence: '1ère Séquence',
        enseignant: 'Pierre Martin',
        appreciation: 'Très bien'
      },
      {
        id: '3',
        eleveId: '3',
        eleveNom: 'Bernard',
        elevePrenom: 'Thomas',
        matiere: 'Mathématiques',
        classe: '5ème B',
        note: 8,
        noteMax: 20,
        coefficient: 4,
        type: 'controle',
        date: '2024-01-18',
        trimestre: '1er Trimestre',
        sequence: '1ère Séquence',
        enseignant: 'Marie Dupont',
        appreciation: 'À améliorer'
      },
      {
        id: '4',
        eleveId: '4',
        eleveNom: 'Laurent',
        elevePrenom: 'Sophie',
        matiere: 'Anglais',
        classe: '4ème A',
        note: 18,
        noteMax: 20,
        coefficient: 2,
        type: 'oral',
        date: '2024-01-22',
        trimestre: '1er Trimestre',
        sequence: '1ère Séquence',
        enseignant: 'Sophie Bernard',
        appreciation: 'Parfait'
      }
    ];
    setNotes(sampleNotes);
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.eleveNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.elevePrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.classe.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMatiere = filterMatiere === 'tous' || note.matiere === filterMatiere;
    const matchesClasse = filterClasse === 'tous' || note.classe === filterClasse;
    const matchesTrimestre = filterTrimestre === 'tous' || note.trimestre === filterTrimestre;
    
    return matchesSearch && matchesMatiere && matchesClasse && matchesTrimestre;
  });

  // Calcul des statistiques
  const statistiques: StatistiquesNotes = {
    moyenneGenerale: notes.length > 0 ? Math.round((notes.reduce((sum, n) => sum + n.note, 0) / notes.length) * 100) / 100 : 0,
    totalNotes: notes.length,
    notesExcellent: notes.filter(n => n.note >= 16).length,
    notesBien: notes.filter(n => n.note >= 14 && n.note < 16).length,
    notesPassable: notes.filter(n => n.note >= 10 && n.note < 14).length,
    notesInsuffisant: notes.filter(n => n.note < 10).length,
    moyenneParMatiere: matieres.reduce((acc, matiere) => {
      const notesMatiere = notes.filter(n => n.matiere === matiere);
      acc[matiere] = notesMatiere.length > 0 
        ? Math.round((notesMatiere.reduce((sum, n) => sum + n.note, 0) / notesMatiere.length) * 100) / 100 
        : 0;
      return acc;
    }, {} as Record<string, number>),
    moyenneParClasse: classes.reduce((acc, classe) => {
      const notesClasse = notes.filter(n => n.classe === classe);
      acc[classe] = notesClasse.length > 0 
        ? Math.round((notesClasse.reduce((sum, n) => sum + n.note, 0) / notesClasse.length) * 100) / 100 
        : 0;
      return acc;
    }, {} as Record<string, number>)
  };

  const handleAddNote = () => {
    if (newNote.eleveNom && newNote.elevePrenom && newNote.matiere && newNote.note !== undefined) {
      const note: Note = {
        id: Date.now().toString(),
        eleveId: Date.now().toString(),
        eleveNom: newNote.eleveNom!,
        elevePrenom: newNote.elevePrenom!,
        matiere: newNote.matiere!,
        classe: newNote.classe || '',
        note: newNote.note!,
        noteMax: newNote.noteMax || 20,
        coefficient: newNote.coefficient || 1,
        type: newNote.type || 'devoir',
        date: newNote.date || new Date().toISOString().split('T')[0],
        trimestre: newNote.trimestre || '1er Trimestre',
        sequence: newNote.sequence || '1ère Séquence',
        enseignant: newNote.enseignant || '',
        appreciation: newNote.appreciation
      };
      setNotes([...notes, note]);
      setNewNote({
        eleveNom: '',
        elevePrenom: '',
        matiere: '',
        classe: '',
        note: 0,
        noteMax: 20,
        coefficient: 1,
        type: 'devoir',
        date: new Date().toISOString().split('T')[0],
        trimestre: '1er Trimestre',
        sequence: '1ère Séquence',
        enseignant: '',
        appreciation: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const getNoteColor = (note: number) => {
    if (note >= 16) return 'text-green-600 dark:text-green-400';
    if (note >= 14) return 'text-blue-600 dark:text-blue-400';
    if (note >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getNoteLabel = (note: number) => {
    if (note >= 16) return 'Excellent';
    if (note >= 14) return 'Bien';
    if (note >= 10) return 'Passable';
    return 'Insuffisant';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'examen': return faTrophy;
      case 'devoir': return faBookOpen;
      case 'controle': return faCheckCircle;
      case 'oral': return faUsers;
      default: return faBookOpen;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faBookOpen} className="mr-3 text-blue-500" />
              Gestion des Notes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez et suivez les notes de vos élèves par matière et classe.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Exporter
            </button>
            <button
              onClick={() => navigate('/notes/saisie')}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Ajouter une note
            </button>
            <button
              onClick={() => navigate('/notes/resultats')}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Voir résultats
            </button>
          </div>
        </header>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FontAwesomeIcon icon={faChartBar} className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moyenne Générale</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistiques.moyenneGenerale}/20</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FontAwesomeIcon icon={faTrophy} className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Excellent (≥16)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistiques.notesExcellent}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Insuffisant (&lt;10)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistiques.notesInsuffisant}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FontAwesomeIcon icon={faBookOpen} className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Notes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistiques.totalNotes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition des notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon icon={faChartBar} className="mr-2 text-blue-500" />
              Répartition des Notes
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Excellent (≥16)</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${statistiques.totalNotes > 0 ? (statistiques.notesExcellent / statistiques.totalNotes) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {statistiques.notesExcellent} ({statistiques.totalNotes > 0 ? Math.round((statistiques.notesExcellent / statistiques.totalNotes) * 100) : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bien (14-15)</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${statistiques.totalNotes > 0 ? (statistiques.notesBien / statistiques.totalNotes) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {statistiques.notesBien} ({statistiques.totalNotes > 0 ? Math.round((statistiques.notesBien / statistiques.totalNotes) * 100) : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Passable (10-13)</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${statistiques.totalNotes > 0 ? (statistiques.notesPassable / statistiques.totalNotes) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {statistiques.notesPassable} ({statistiques.totalNotes > 0 ? Math.round((statistiques.notesPassable / statistiques.totalNotes) * 100) : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Insuffisant (&lt;10)</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${statistiques.totalNotes > 0 ? (statistiques.notesInsuffisant / statistiques.totalNotes) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {statistiques.notesInsuffisant} ({statistiques.totalNotes > 0 ? Math.round((statistiques.notesInsuffisant / statistiques.totalNotes) * 100) : 0}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-green-500" />
              Moyennes par Matière
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(statistiques.moyenneParMatiere)
                .filter(([_, moyenne]) => moyenne > 0)
                .sort(([,a], [,b]) => b - a)
                .map(([matiere, moyenne]) => (
                <div key={matiere} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{matiere}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {moyenne}/20
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Rechercher une note..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterMatiere}
              onChange={(e) => setFilterMatiere(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes les matières</option>
              {matieres.map(matiere => (
                <option key={matiere} value={matiere}>{matiere}</option>
              ))}
            </select>
            <select
              value={filterClasse}
              onChange={(e) => setFilterClasse(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes les classes</option>
              {classes.map(classe => (
                <option key={classe} value={classe}>{classe}</option>
              ))}
            </select>
            <select
              value={filterTrimestre}
              onChange={(e) => setFilterTrimestre(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les trimestres</option>
              {trimestres.map(trimestre => (
                <option key={trimestre} value={trimestre}>{trimestre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des notes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Élève
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Classe
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredNotes.map((note) => (
                  <tr key={note.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {note.elevePrenom} {note.eleveNom}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {note.matiere}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FontAwesomeIcon 
                          icon={getTypeIcon(note.type)} 
                          className="mr-2 w-4 text-gray-500 dark:text-gray-400" 
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {note.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${getNoteColor(note.note)}`}>
                          {note.note}/{note.noteMax}
                        </span>
                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                          note.note >= 16 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          note.note >= 14 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                          note.note >= 10 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {getNoteLabel(note.note)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {note.classe}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(note.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          <FontAwesomeIcon icon={faEye} />
            </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ajouter une note</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom de l'élève *
                  </label>
                  <input
                    type="text"
                    value={newNote.eleveNom}
                    onChange={(e) => setNewNote({...newNote, eleveNom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom de l'élève *
                  </label>
                  <input
                    type="text"
                    value={newNote.elevePrenom}
                    onChange={(e) => setNewNote({...newNote, elevePrenom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Matière *
                  </label>
                  <select
                    value={newNote.matiere}
                    onChange={(e) => setNewNote({...newNote, matiere: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Sélectionner une matière</option>
                    {matieres.map(matiere => (
                      <option key={matiere} value={matiere}>{matiere}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Classe
                  </label>
                  <select
                    value={newNote.classe}
                    onChange={(e) => setNewNote({...newNote, classe: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Sélectionner une classe</option>
                    {classes.map(classe => (
                      <option key={classe} value={classe}>{classe}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Note *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={newNote.note}
                    onChange={(e) => setNewNote({...newNote, note: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Note Max
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newNote.noteMax}
                    onChange={(e) => setNewNote({...newNote, noteMax: parseInt(e.target.value) || 20})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={newNote.type}
                    onChange={(e) => setNewNote({...newNote, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="devoir">Devoir</option>
                    <option value="examen">Examen</option>
                    <option value="controle">Contrôle</option>
                    <option value="oral">Oral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coefficient
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newNote.coefficient}
                    onChange={(e) => setNewNote({...newNote, coefficient: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newNote.date}
                    onChange={(e) => setNewNote({...newNote, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Trimestre
                  </label>
                  <select
                    value={newNote.trimestre}
                    onChange={(e) => setNewNote({...newNote, trimestre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {trimestres.map((tri) => (
                      <option key={tri} value={tri}>{tri}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Séquence
                  </label>
                  <select
                    value={newNote.sequence}
                    onChange={(e) => setNewNote({...newNote, sequence: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {sequences.map((seq) => (
                      <option key={seq} value={seq}>{seq}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Enseignant
                  </label>
                  <input
                    type="text"
                    value={newNote.enseignant}
                    onChange={(e) => setNewNote({...newNote, enseignant: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Appréciation
                  </label>
                  <textarea
                    value={newNote.appreciation}
                    onChange={(e) => setNewNote({...newNote, appreciation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={3}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPages;