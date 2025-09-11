import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import StudentSelectionList from '../components/StudentSelectionList';
import StudentEnrollmentForm from '../components/StudentEnrollmentForm';
import AddStudentForm from '../src/faetures/students/AddStudentForm'; // 👈 Importez le formulaire d'ajout
import { Student } from '../types/Student';
import { addStudent } from '../../services/studentService'; // 👈 Importez la fonction d'ajout

const RegistrationPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const navigate = useNavigate();

    // 1. Logique pour le formulaire d'ajout d'un nouvel élève
    const handleAddStudent = async (newStudentData: any) => {
        try {
            await addStudent(newStudentData);
            alert('Élève inscrit avec succès !');
            navigate('/eleves'); // Redirige vers la liste des élèves
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Erreur lors de l'inscription de l'élève.");
        }
    };

    // 2. Logique pour le flux d'inscription d'un élève existant
    const handleStudentSelect = (student: Student) => {
        setSelectedStudent(student);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    const handleEnrollmentComplete = () => {
        handleCloseModal();
        navigate('/eleves');
    };

    return (
        <div className="p-6 mt-10 w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Gestion des Inscriptions
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Section 1 : Inscrire un nouvel élève */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4 border-b pb-4">
                        <FontAwesomeIcon icon={faPlusCircle} className="text-blue-500 text-2xl mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Inscrire un nouvel élève
                        </h2>
                    </div>
                    <AddStudentForm onAddStudent={handleAddStudent} />
                </div>
                
                {/* Section 2 : Inscrire un élève existant */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center">
                    <FontAwesomeIcon icon={faUserPlus} className="text-green-500 text-5xl mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Inscrire un élève existant
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Sélectionnez un élève déjà répertorié pour l'assigner à une classe pour l'année en cours.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="py-3 px-6 rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Sélectionner un élève
                    </button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Sélectionner un Élève à Inscrire">
                {selectedStudent ? (
                    <StudentEnrollmentForm
                        student={selectedStudent}
                        onEnrollmentComplete={handleEnrollmentComplete}
                    />
                ) : (
                    <StudentSelectionList onSelectStudent={handleStudentSelect} />
                )}
            </Modal>
        </div>
    );
};

export default RegistrationPage;