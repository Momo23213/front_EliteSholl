// ...existing code...
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
  _id: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  matieres?: string[];
  classe?: any[]; // peut contenir noms ou objets selon backend
  dateEmbauche?: string;
  statut?: 'actif' | 'inactif';
  __v?: number;
}

const API_BASE = 'https://schoolelite.onrender.com/api/enseignants';

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    matieres: [],
    classe: [],
  });

  // fetch teachers
  const fetchTeachers = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Erreur réseau');
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data?.enseignants ?? []);
      setTeachers(list);
    } catch (e) {
      setTeachers([]);
      console.error('Fetch enseignants failed', e);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // create
  const handleAddTeacher = async () => {
    if (!newTeacher.nom || !newTeacher.prenom) {
      alert('Nom et prénom obligatoires');
      return;
    }
    try {
      const payload = {
        nom: newTeacher.nom,
        prenom: newTeacher.prenom,
        telephone: newTeacher.telephone || '',
        email: newTeacher.email || '',
        classe: newTeacher.classe || [],
        matieres: newTeacher.matieres || []
      };
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erreur création');
      const created: Teacher = await res.json();
      // si API renvoie objet créé ou wrapper
      const teacherObj = Array.isArray(created) ? created[0] : (created?.enseignant ?? created);
      setTeachers(prev => [teacherObj, ...prev]);
      setNewTeacher({ nom: '', prenom: '', email: '', telephone: '', matieres: [], classe: [] });
      setShowAddModal(false);
    } catch (e) {
      console.error('Ajout enseignant failed', e);
      alert("Impossible d'ajouter l'enseignant.");
    }
  };

  // update
  const handleEditTeacher = async () => {
    if (!editingTeacher) return;
    if (!editingTeacher.nom || !editingTeacher.prenom) {
      alert('Nom et prénom obligatoires');
      return;
    }
    try {
      const payload = {
        nom: editingTeacher.nom,
        prenom: editingTeacher.prenom,
        telephone: editingTeacher.telephone || '',
        email: editingTeacher.email || '',
        classe: editingTeacher.classe || [],
        matieres: editingTeacher.matieres || []
      };
      const res = await fetch(`${API_BASE}/${editingTeacher._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Erreur modification');
      const updated: Teacher = await res.json();
      const teacherObj = updated?.enseignant ?? updated;
      setTeachers(prev => prev.map(t => t._id === teacherObj._id ? teacherObj : t));
      setEditingTeacher(null);
      setShowEditModal(false);
    } catch (e) {
      console.error('Modification enseignant failed', e);
      alert("Impossible de modifier l'enseignant.");
    }
  };

  // delete
  const handleDeleteTeacher = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur suppression');
      setTeachers(prev => prev.filter(t => t._id !== id));
    } catch (e) {
      console.error('Suppression enseignant failed', e);
      alert("Impossible de supprimer l'enseignant.");
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    (teacher.nom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.prenom || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (teacher.matieres || []).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut?: string) => {
    return statut === 'actif' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getClasseName = (c: any) => {
    if (!c) return '';
    if (typeof c === 'string') return c;
    if (typeof c === 'object') return c.nom || c.libelle || (c._id ? c._id : '');
    return String(c);
  };

  return (
    <div className="mt-10 w-full min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête */}
         <header className="mb-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mr-4 shadow-lg">
                    <FontAwesomeIcon icon={faGraduationCap} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                       Gestion des Enseignants
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Gérez les informations de vos enseignants et leurs affectations.
                  </p>
                </div>
              </div>
            </div>
           <button
            onClick={() => { setShowAddModal(true); setNewTeacher({ nom: '', prenom: '', email: '', telephone: '', matieres: [], classe: [] }); }}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un enseignant
          </button>
          </div>
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
              key={teacher._id}
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
                      {teacher.statut || 'actif'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => { setEditingTeacher(teacher); setShowEditModal(true); }}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-4" />
                  {teacher.email || '—'}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faPhone} className="mr-2 w-4" />
                  {teacher.telephone || '—'}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faBook} className="mr-2 w-4" />
                  {(teacher.matieres && teacher.matieres.length > 0) ? teacher.matieres.join(', ') : 'Aucune matière'}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2 w-4" />
                  {teacher.dateEmbauche ? `Embauché le ${new Date(teacher.dateEmbauche).toLocaleDateString('fr-FR')}` : 'Date d\'embauche inconnue'}
                </div>
                {(teacher.classe && teacher.classe.length > 0) && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classes :</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classe.map((c, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {getClasseName(c)}
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                  <input
                    type="text"
                    value={newTeacher.nom}
                    onChange={(e) => setNewTeacher({...newTeacher, nom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={newTeacher.prenom}
                    onChange={(e) => setNewTeacher({...newTeacher, prenom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={newTeacher.telephone}
                    onChange={(e) => setNewTeacher({...newTeacher, telephone: e.target.value})}
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

        {/* Modal d'édition */}
        {showEditModal && editingTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Modifier un enseignant</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                  <input
                    type="text"
                    value={editingTeacher.nom}
                    onChange={(e) => setEditingTeacher({...editingTeacher, nom: e.target.value} as Teacher)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={editingTeacher.prenom}
                    onChange={(e) => setEditingTeacher({...editingTeacher, prenom: e.target.value} as Teacher)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingTeacher.email || ''}
                    onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value} as Teacher)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={editingTeacher.telephone || ''}
                    onChange={(e) => setEditingTeacher({...editingTeacher, telephone: e.target.value} as Teacher)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => { setShowEditModal(false); setEditingTeacher(null); }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleEditTeacher}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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

export default TeachersPage;
// ...existing code...