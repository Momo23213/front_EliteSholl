import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faPlus, 
  faEdit, 
  faTrash, 
  faSearch,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faUser,
  faCalendar,
  faReceipt,
  faChartLine,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

interface Payment {
  id: string;
  eleveId: string;
  eleveNom: string;
  elevePrenom: string;
  montant: number;
  datePaiement: string;
  typePaiement: 'scolarite' | 'transport' | 'cantine' | 'activite' | 'autre';
  statut: 'paye' | 'en_attente' | 'en_retard';
  methodePaiement: 'especes' | 'cheque' | 'virement' | 'carte';
  reference: string;
  notes?: string;
}

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [filterType, setFilterType] = useState<string>('tous');
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    eleveNom: '',
    elevePrenom: '',
    montant: 0,
    datePaiement: new Date().toISOString().split('T')[0],
    typePaiement: 'scolarite',
    statut: 'paye',
    methodePaiement: 'especes',
    reference: '',
    notes: ''
  });

  const typesPaiement = [
    { value: 'scolarite', label: 'Scolarité', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    { value: 'transport', label: 'Transport', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    { value: 'cantine', label: 'Cantine', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
    { value: 'activite', label: 'Activités', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
    { value: 'autre', label: 'Autre', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' }
  ];

  const statuts = [
    { value: 'paye', label: 'Payé', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', icon: faCheckCircle },
    { value: 'en_attente', label: 'En attente', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', icon: faClock },
    { value: 'en_retard', label: 'En retard', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', icon: faExclamationTriangle }
  ];

  // Données d'exemple
  useEffect(() => {
    const samplePayments: Payment[] = [
      {
        id: '1',
        eleveId: '1',
        eleveNom: 'Martin',
        elevePrenom: 'Lucas',
        montant: 1500,
        datePaiement: '2024-01-15',
        typePaiement: 'scolarite',
        statut: 'paye',
        methodePaiement: 'virement',
        reference: 'VIR-2024-001',
        notes: 'Paiement trimestriel'
      },
      {
        id: '2',
        eleveId: '2',
        eleveNom: 'Dubois',
        elevePrenom: 'Emma',
        montant: 300,
        datePaiement: '2024-01-20',
        typePaiement: 'transport',
        statut: 'en_attente',
        methodePaiement: 'cheque',
        reference: 'CHQ-2024-002',
        notes: 'Paiement mensuel transport'
      },
      {
        id: '3',
        eleveId: '3',
        eleveNom: 'Bernard',
        elevePrenom: 'Thomas',
        montant: 200,
        datePaiement: '2024-01-10',
        typePaiement: 'cantine',
        statut: 'en_retard',
        methodePaiement: 'especes',
        reference: 'ESP-2024-003'
      }
    ];
    setPayments(samplePayments);
  }, []);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.eleveNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.elevePrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'tous' || payment.statut === filterStatus;
    const matchesType = filterType === 'tous' || payment.typePaiement === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPayment = () => {
    if (newPayment.eleveNom && newPayment.elevePrenom && newPayment.montant) {
      const payment: Payment = {
        id: Date.now().toString(),
        eleveId: Date.now().toString(),
        eleveNom: newPayment.eleveNom!,
        elevePrenom: newPayment.elevePrenom!,
        montant: newPayment.montant!,
        datePaiement: newPayment.datePaiement!,
        typePaiement: newPayment.typePaiement!,
        statut: newPayment.statut!,
        methodePaiement: newPayment.methodePaiement!,
        reference: newPayment.reference || `REF-${Date.now()}`,
        notes: newPayment.notes
      };
      setPayments([...payments, payment]);
      setNewPayment({
        eleveNom: '',
        elevePrenom: '',
        montant: 0,
        datePaiement: new Date().toISOString().split('T')[0],
        typePaiement: 'scolarite',
        statut: 'paye',
        methodePaiement: 'especes',
        reference: '',
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const handleDeletePayment = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      setPayments(payments.filter(payment => payment.id !== id));
    }
  };

  const getStatutInfo = (statut: string) => {
    return statuts.find(s => s.value === statut) || statuts[0];
  };

  const getTypeInfo = (type: string) => {
    return typesPaiement.find(t => t.value === type) || typesPaiement[0];
  };

  const totalPaye = payments.filter(p => p.statut === 'paye').reduce((acc, p) => acc + p.montant, 0);
  const totalEnAttente = payments.filter(p => p.statut === 'en_attente').reduce((acc, p) => acc + p.montant, 0);
  const totalEnRetard = payments.filter(p => p.statut === 'en_retard').reduce((acc, p) => acc + p.montant, 0);

  return (
    <div className="mt-10 w-full min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-3 text-green-500" />
              Gestion des Paiements
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Suivez et gérez tous les paiements des élèves.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nouveau paiement
          </button>
        </header>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payé</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPaye.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FontAwesomeIcon icon={faClock} className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En attente</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalEnAttente.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En retard</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalEnRetard.toLocaleString('fr-FR')} FCFA
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(totalPaye + totalEnAttente + totalEnRetard).toLocaleString('fr-FR')} FCFA
                </p>
              </div>
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
                placeholder="Rechercher un paiement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="paye">Payé</option>
              <option value="en_attente">En attente</option>
              <option value="en_retard">En retard</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les types</option>
              <option value="scolarite">Scolarité</option>
              <option value="transport">Transport</option>
              <option value="cantine">Cantine</option>
              <option value="activite">Activités</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        {/* Liste des paiements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Élève
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Référence
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPayments.map((payment) => {
                  const statutInfo = getStatutInfo(payment.statut);
                  const typeInfo = getTypeInfo(payment.typePaiement);
                  
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                            <FontAwesomeIcon icon={faUser} className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {payment.elevePrenom} {payment.eleveNom}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        {payment.montant.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendar} className="mr-2 w-4" />
                          {new Date(payment.datePaiement).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statutInfo.color}`}>
                          <FontAwesomeIcon icon={statutInfo.icon} className="mr-1 w-3" />
                          {statutInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faReceipt} className="mr-2 w-4" />
                          {payment.reference}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingPayment(payment)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeletePayment(payment.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Nouveau paiement</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nom de l'élève *
                    </label>
                    <input
                      type="text"
                      value={newPayment.eleveNom}
                      onChange={(e) => setNewPayment({...newPayment, eleveNom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prénom de l'élève *
                    </label>
                    <input
                      type="text"
                      value={newPayment.elevePrenom}
                      onChange={(e) => setNewPayment({...newPayment, elevePrenom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Montant (FCFA) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newPayment.montant}
                      onChange={(e) => setNewPayment({...newPayment, montant: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date de paiement
                    </label>
                    <input
                      type="date"
                      value={newPayment.datePaiement}
                      onChange={(e) => setNewPayment({...newPayment, datePaiement: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type de paiement
                    </label>
                    <select
                      value={newPayment.typePaiement}
                      onChange={(e) => setNewPayment({...newPayment, typePaiement: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {typesPaiement.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Statut
                    </label>
                    <select
                      value={newPayment.statut}
                      onChange={(e) => setNewPayment({...newPayment, statut: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {statuts.map(statut => (
                        <option key={statut.value} value={statut.value}>{statut.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Méthode de paiement
                  </label>
                  <select
                    value={newPayment.methodePaiement}
                    onChange={(e) => setNewPayment({...newPayment, methodePaiement: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="especes">Espèces</option>
                    <option value="cheque">Chèque</option>
                    <option value="virement">Virement</option>
                    <option value="carte">Carte bancaire</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Référence
                  </label>
                  <input
                    type="text"
                    value={newPayment.reference}
                    onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  onClick={handleAddPayment}
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

export default PaymentsPage;