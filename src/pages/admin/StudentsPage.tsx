import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import ElevesDisplay from "../../components/eleves/ElevesDisplay";
import EleveForm from "../../components/eleves/FomEleves";
import EditStudentForm from "../../components/eleves/EditStudentModal";
import ReinscriptionEleveModal from "../../components/eleves/ReinscriptionEleveModal";
import { Eleve } from "../../types/types";
import { eleveService } from "../../services/eleveService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faUsers, 
  faChartBar, 
  faCheckCircle,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

function StudentsPage() {
  const [eleves, setEleves] = useState<Eleve[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEleve, setSelectedEleve] = useState<Eleve | null>(null);
  const [isReinsModalOpen, setIsReinsModalOpen] = useState(false);

  // Charger la liste des élèves
  const fetchEleves = async () => {
    try {
      setLoading(true);
      const data = await eleveService.getAll();
      setEleves(data);
    } catch (error) {
      console.error("Erreur lors du chargement des élèves :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEleves();
  }, []);

  // Actions sur les élèves
  const handleAdd = () => {
    setSelectedEleve(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (eleve: Eleve) => {
    setSelectedEleve(eleve);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (eleve: Eleve) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${eleve.nom} ${eleve.prenom} ?`)) return;

    try {
      await eleveService.remove(eleve._id!);
      setEleves(prev => prev.filter(e => e._id !== eleve._id));
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer l'élève.");
    }
  };


  const closeAddModal = () => setIsAddModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEleve(null);
  };
  const closeReinsModal = () => {
    setIsReinsModalOpen(false);
    setSelectedEleve(null);
  };

  const handleReinscrire = (eleve: Eleve) => {
    setSelectedEleve(eleve);
    setIsReinsModalOpen(true);
  };

  // Calcul des statistiques
  const totalEleves = eleves.length;
  const elevesInscrits = eleves.filter(e => e.statut === 'inscrit').length;
  const elevesReinscrits = eleves.filter(e => e.statut === 'reinscrit').length;
  const elevesMasculins = eleves.filter(e => e.sexe === 'M').length;
  const elevesFeminins = eleves.filter(e => e.sexe === 'F').length;
  
  // Statistiques par classe
  const classesStats = eleves.reduce((acc, eleve) => {
    const classeNom = eleve.classeId?.nom || 'Non assigné';
    acc[classeNom] = (acc[classeNom] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Âge moyen (approximatif)
  const ageMoyen = eleves.length > 0 
    ? Math.round(eleves.reduce((sum, eleve) => {
        const age = new Date().getFullYear() - new Date(eleve.dateNaissance || '').getFullYear();
        return sum + age;
      }, 0) / eleves.length)
    : 0;

  return (
    <div className="bg-gray-50 mt-10 w-full dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête amélioré */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center mb-2">
            <FontAwesomeIcon icon={faUserGraduate} className="mr-3 text-blue-500" />
            Gestion des Élèves
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez et suivez les informations de tous vos élèves.
          </p>
        </header>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FontAwesomeIcon icon={faUsers} className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Élèves</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEleves}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Inscrits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{elevesInscrits}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FontAwesomeIcon icon={faGraduationCap} className="text-purple-600 dark:text-purple-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Réinscrits</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{elevesReinscrits}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FontAwesomeIcon icon={faChartBar} className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Âge Moyen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{ageMoyen} ans</p>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par sexe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon icon={faUsers} className="mr-2 text-blue-500" />
              Répartition par Sexe
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Masculin</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${totalEleves > 0 ? (elevesMasculins / totalEleves) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {elevesMasculins} ({totalEleves > 0 ? Math.round((elevesMasculins / totalEleves) * 100) : 0}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Féminin</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${totalEleves > 0 ? (elevesFeminins / totalEleves) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {elevesFeminins} ({totalEleves > 0 ? Math.round((elevesFeminins / totalEleves) * 100) : 0}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-green-500" />
              Répartition par Classe
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(classesStats).map(([classe, count]) => (
                <div key={classe} className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{classe}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {count} élève{count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h1 className="text-gray-700 dark:text-gray-200 text-xl">Chargement des élèves...</h1>
            </div>
          </div>
        ) : (
          <ElevesDisplay
            eleves={eleves}
            onAddEleve={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReinsEleve={handleReinscrire}
            onScolariteCheck={() => alert("Contrôler la scolarité")}
          />
        )}

        {/* Modal Réinscription */}
        {selectedEleve && isReinsModalOpen && (
          <ReinscriptionEleveModal
            eleve={selectedEleve}
            onSuccess={() => {
              closeReinsModal();
              fetchEleves();
            }}
            onClose={closeReinsModal}
          />
        )}

        {/* Modal Ajouter un élève */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title="Formulaire d'inscription"
        >
          <EleveForm
            onSuccess={() => {
              closeAddModal();
              fetchEleves();
            }}
          />
        </Modal>

        {/* Modal Modifier un élève */}
        {selectedEleve && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            title="Modifier l'élève"
          >
            <EditStudentForm
              eleve={selectedEleve}
              onSuccess={() => {
                closeEditModal();
                fetchEleves();
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default StudentsPage;
