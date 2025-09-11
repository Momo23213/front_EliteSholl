import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal"; // Assurez-vous d'avoir ce composant de modale
import EnseignantsDisplay from "../../formulaires/enseignants/EnseignantsDisplay"; // Le composant de liste que nous avons créé
import EnseignantForm from "../../formulaires/enseignants/EnseignantForm"; // Le formulaire que nous avons créé
import { Enseignant } from "../../types/types"; // L'interface Enseignant

// Données fictives (à remplacer par vos données réelles)
const enseignant: Enseignant[] = [
    { _id: "ens1", nom: "Dupont", prenom: "Jean", email: "j.dupont@ecole.com", telephone: "0601020304", matieres: ["mat1", "mat2"]},
    { _id: "ens2", nom: "Martin", prenom: "Léa", email: "l.martin@ecole.com", telephone: "0605060708", matieres: ["mat3"] },
    { _id: "ens3", nom: "Dubois", prenom: "Marie", email: "m.dubois@ecole.com", telephone: "0609101112", matieres: ["mat1", "mat3"] },
];


function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnseignant, setSelectedEnseignant] = useState<Enseignant | null>(null);
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);

  // Charge les données au premier rendu
  useEffect(() => {
    setEnseignants(enseignant);
  }, []);

  // Gère l'ouverture du formulaire d'ajout
  const handleAddEnseignant = () => {
    setSelectedEnseignant(null); // Assure que le formulaire est vide
    setIsModalOpen(true);
  };

  // Gère l'ouverture du formulaire d'édition
  const handleEdit = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    setIsModalOpen(true);
  };

  // Gère l'action de suppression
  const handleDelete = (enseignant: Enseignant) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${enseignant.prenom} ${enseignant.nom} ?`)) {
      setEnseignants(enseignants.filter(e => e._id !== enseignant._id));
      alert(`${enseignant.prenom} ${enseignant.nom} a été supprimé.`);
    }
  };

  // Gère l'affichage des détails
  const handleDetail = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    setIsModalOpen(true);
  };

  // Gère la soumission du formulaire
  const handleFormSubmit = (data: any) => {
    console.log("Données soumises :", data);
    // Ici, vous feriez un appel API pour sauvegarder les données
    if (selectedEnseignant) {
        // Logique de modification
        setEnseignants(enseignants.map(e => e._id === selectedEnseignant._id ? { ...e, ...data } : e));
    } else {
        // Logique d'ajout
        const newEnseignant = { ...data, _id: `ens${enseignants.length + 1}` };
        setEnseignants([...enseignants, newEnseignant]);
    }
    handleCloseModal();
  };

  // Fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnseignant(null);
  };

  return (
    <div className="bg-gray-50 mt-10 w-full dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Affichage de la liste des enseignants */}
        <EnseignantsDisplay
          enseignants={enseignants}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetail}
          onAddEnseignant={handleAddEnseignant}
        />
      </div>

      {/* Modal pour le formulaire d'ajout/modification ou les détails */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEnseignant ? "Modifier un enseignant" : "Ajouter un enseignant"}
        // Vous pouvez ajuster la taille de la modale avec size="md" ou "lg"
      >
        {selectedEnseignant ? (
          <EnseignantForm initialData={selectedEnseignant} onSubmit={handleFormSubmit} />
        ) : (
          <EnseignantForm onSubmit={handleFormSubmit} />
        )}
      </Modal>
    </div>
  );
}

export default TeachersPage;