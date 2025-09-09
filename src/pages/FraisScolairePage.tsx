import { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import EleveForm from "../components/eleves/FomEleves";
import EditStudentForm from "../components/eleves/EditStudentModal";
import { FraisScolarite } from "../types/types";
import { fraiService } from "../services/fraisScolaire";
import FraiDisplay from "../formulaires/paiements/FraisDisplay";


function FraiScolairePage() {
  const [eleves, setEleves] = useState<FraisScolarite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEleve, setSelectedEleve] = useState<FraisScolarite | null>(null);

  // Charger la liste des élèves
  const fetchEleves = async () => {
    try {
      setLoading(true);
      const data = await fraiService.getAllfrai();
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

  const handleEdit = (eleve: FraisScolarite) => {
    setSelectedEleve(eleve);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (eleve: FraisScolarite) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ${eleve.classeId.nom}  ?`)) return;

    // try {
    //   await eleveService.remove(eleve._id!);
    //   setEleves(prev => prev.filter(e => e._id !== eleve._id));
    // } catch (error) {
    //   console.error(error);
    //   alert("Impossible de supprimer l'élève.");
    // }
  };

  const closeAddModal = () => setIsAddModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEleve(null);
  };

  return (
    <div className="bg-gray-50 mt-10 w-full  dark:bg-gray-900 min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <h1 className="text-gray-700 dark:text-gray-200 text-2xl text-center">Chargement des frais...</h1>
        ) : (
          <FraiDisplay
            eleves={eleves}
            onAddEleve={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReinsEleve={() => alert("Réinscrire un élève")}
            onScolariteCheck={() => alert("Contrôler la scolarité")}
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

export default FraiScolairePage;
