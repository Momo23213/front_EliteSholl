import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faCreditCard, faMoneyBillWave, faChartLine } from '@fortawesome/free-solid-svg-icons';
import PaymentManager from '../components/PaymentManager';
import ExpenseManager from '../components/ExpenseManager';
import FinancialReport from '../components/FinancialReport';

const ScolaritePage: React.FC = () => {
    return (
        <div className="p-6 mt-10 w-full">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                <FontAwesomeIcon icon={faUniversity} className="mr-3 text-blue-500" />
                Gestion de la Scolarité
            </h1>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8">
                Bienvenue sur la page de gestion financière de l'école. Vous pouvez ici suivre les paiements des élèves, enregistrer les dépenses et obtenir un aperçu de la situation comptable.
            </p>
                  <FinancialReport /> {/* 👈 Ajoutez le composant de rapport ici */}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center m-12">
                {/* Section pour les paiements */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <FontAwesomeIcon icon={faCreditCard} className="text-5xl text-green-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Paiements des Élèves</h2>
                    <p className="text-gray-600 dark:text-gray-400">Enregistrer et consulter les paiements de frais de scolarité.</p>
                </div>

                {/* Section pour les dépenses */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-5xl text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dépenses</h2>
                    <p className="text-gray-600 dark:text-gray-400">Suivre les dépenses de fonctionnement de l'école.</p>
                </div>

                {/* Section pour les rapports financiers */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <FontAwesomeIcon icon={faChartLine} className="text-5xl text-yellow-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Rapports</h2>
                    <p className="text-gray-600 dark:text-gray-400">Générer des bilans financiers et des rapports détaillés.</p>
                </div>

            {/* Affichage du PaymentManager */}
            {/* <PaymentManager /> */}

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-8">
                <PaymentManager />
                <ExpenseManager />
            </div>
        </div>
    );
};

export default ScolaritePage;