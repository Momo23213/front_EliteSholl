import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faPlus, 
  faEdit, 
  faTrash, 
  faSearch,
  faUser,
  faEnvelope,
  faPhone,
  faCalendar,
  faBook
} from '@fortawesome/free-solid-svg-icons';

interface Teacher {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  specialite: string;
  dateEmbauche: string;
  statut: 'actif' | 'inactif';
  classes: string[];
}

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    specialite: '',
    dateEmbauche: '',
    statut: 'actif',
    classes: []
  });

  // Données d'exemple
  useEffect(() => {
    const sampleTeachers: Teacher[] = [
      {
        id: '1',
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@ecole.fr',
        telephone: '01 23 45 67 89',
        specialite: 'Mathématiques',
        dateEmbauche: '2020-09-01',
        statut: 'actif',
        classes: ['6ème A', '5ème B']
      },
      {
        id: '2',
        nom: 'Martin',
        prenom: 'Pierre',
        email: 'pierre.martin@ecole.fr',
        telephone: '01 23 45 67 90',
        specialite: 'Français',
        dateEmbauche: '2019-09-01',
        statut: 'actif',
        classes: ['4ème A', '3ème B']
      }
    ];
    setTeachers(sampleTeachers);
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = () => {
    if (newTeacher.nom && newTeacher.prenom && newTeacher.email) {
      const teacher: Teacher = {
        id: Date.now().toString(),
        nom: newTeacher.nom!,
        prenom: newTeacher.prenom!,
        email: newTeacher.email!,
        telephone: newTeacher.telephone || '',
        specialite: newTeacher.specialite || '',
        dateEmbauche: newTeacher.dateEmbauche || new Date().toISOString().split('T')[0],
        statut: newTeacher.statut || 'actif',
        classes: newTeacher.classes || []
      };
      setTeachers([...teachers, teacher]);
      setNewTeacher({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        specialite: '',
        dateEmbauche: '',
        statut: 'actif',
        classes: []
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== id));
    }
  };

  const getStatusColor = (statut: string) => {
    return statut === 'actif' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <div className="mt-10 w-full min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-3 text-blue-500" />
              Gestion des Enseignants
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez les informations de vos enseignants et leurs affectations.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un enseignant
          </button>
        </header>

        {/* Barre de recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Rechercher un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Liste des enseignants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faUser} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {teacher.prenom} {teacher.nom}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.statut)}`}>
                      {teacher.statut}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTeacher(teacher)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faPhone} className="mr-2 w-4" />
                  {teacher.telephone}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faBook} className="mr-2 w-4" />
                  {teacher.specialite}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 w-4" />
                  Embauché le {new Date(teacher.dateEmbauche).toLocaleDateString('fr-FR')}
                </div>
                {teacher.classes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classes :</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((classe, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {classe}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ajouter un enseignant</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={newTeacher.nom}
                    onChange={(e) => setNewTeacher({...newTeacher, nom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={newTeacher.prenom}
                    onChange={(e) => setNewTeacher({...newTeacher, prenom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={newTeacher.telephone}
                    onChange={(e) => setNewTeacher({...newTeacher, telephone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Spécialité
                  </label>
                  <input
                    type="text"
                    value={newTeacher.specialite}
                    onChange={(e) => setNewTeacher({...newTeacher, specialite: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddTeacher}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersPage;