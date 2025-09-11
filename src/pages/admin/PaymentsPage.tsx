import React, { useState, useEffect } from 'react';
import { eleveService } from '../../services/eleveService';
import { paiementService } from '../../services/paiementService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faPlus, 
  faEdit, 
  faTrash, 
  faSearch,
  faCheckCircle,
  faClock,
  faUser,
  faCalendar,
  faReceipt,
  faChartLine,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

import { Paiement } from '../../types/types';

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Paiement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [filterType, setFilterType] = useState<string>('tous');
  const [newPayment, setNewPayment] = useState<{
    eleveId: string;
    montant: number;
    datePaiement: string;
    typePaiement: string;
    statut: string;
    methodePaiement: string;
    reference: string;
    notes: string;
  }>({
    eleveId: '',
    montant: 0,
    datePaiement: new Date().toISOString().split('T')[0],
    typePaiement: 'scolarite',
    statut: 'paye',
    methodePaiement: 'especes',
    reference: '',
    notes: ''
  });
  const [eleves, setEleves] = useState<any[]>([]); // TODO: type Eleve[]
  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

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
  const fetchPaiements = async () => {
    const res = await paiementService.getAllPaiements(page, limit);
    setPayments(res.paiements);
    setTotal(res.total);
  };

  useEffect(() => {
    fetchPaiements();
    eleveService.getAll().then((data) => {
      setEleves(data);
    });
    // eslint-disable-next-line
  }, [page, limit]);
  // Pagination UI (à placer sous le tableau)
  // ...existing code...
  // Après le tableau de paiements :
  // <div className="flex justify-center mt-4">
  //   <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50">Précédent</button>
  //   <span className="mx-2">Page {page} / {Math.ceil(total / limit)}</span>
  //   <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage(page + 1)} className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50">Suivant</button>
  // </div>

  const filteredPayments = payments.filter(payment => {
    const eleveNom = payment.eleveId && payment.eleveId[0]?.nom ? payment.eleveId[0].nom : '';
    const elevePrenom = payment.eleveId && payment.eleveId[0]?.prenom ? payment.eleveId[0].prenom : '';
    // Get latest paiement entry for type and reference
    const lastPaiement = Array.isArray(payment.paiements) && payment.paiements.length > 0 ? payment.paiements[payment.paiements.length - 1] : null;
    const typePaiement = lastPaiement?.typePaiement || '';
    const reference = payment._id || '';
    // Statut: compute from montantRestant
    let statut = 'paye';
    if (typeof payment.montantRestant === 'number') {
      if (payment.montantRestant > 0 && payment.montantRestant < payment.montantTotal) statut = 'en_attente';
      else if (payment.montantRestant >= payment.montantTotal) statut = 'en_retard';
      else if (payment.montantRestant === 0) statut = 'paye';
    }
    const matchesSearch = 
      eleveNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      elevePrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'tous' || statut === filterStatus;
    const matchesType = filterType === 'tous' || typePaiement === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddPayment = async () => {
    if (newPayment.eleveId && newPayment.montant) {
      const paiementToSend = {
        eleveId: [newPayment.eleveId],
        montantPaye: newPayment.montant,
        datePaiement: newPayment.datePaiement,
        methode: newPayment.methodePaiement,
        reference: newPayment.reference,
        notes: newPayment.notes,
        // typePaiement, statut à ajouter si backend les gère
      };
      try {
        const created = await paiementService.creer(paiementToSend);
        setPayments([...payments, created]);
        setNewPayment({
          eleveId: '',
          montant: 0,
          datePaiement: new Date().toISOString().split('T')[0],
          typePaiement: 'scolarite',
          statut: 'paye',
          methodePaiement: 'especes',
          reference: '',
          notes: ''
        });
        setShowAddModal(false);
      } catch {
        alert('Erreur lors de l\'ajout du paiement');
      }
    }
  };

  const handleDeletePayment = async (_id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement ?')) {
      try {
        await paiementService.remove(_id);
        setPayments(payments.filter(payment => payment._id !== _id));
      } catch {
        alert('Erreur lors de la suppression du paiement');
      }
    }
  };

  const getStatutInfo = (statut: string) => {
    return statuts.find(s => s.value === statut) || statuts[0];
  };

  const getTypeInfo = (type: string) => {
    return typesPaiement.find(t => t.value === type) || typesPaiement[0];
  };

  // Compute totals based on montantRestant and montantTotal
  const totalPaye = payments.filter(p => p.montantRestant === 0).reduce((acc, p) => acc + (p.montantPaye || 0), 0);
  const totalEnAttente = payments.filter(p => p.montantRestant > 0 && p.montantRestant < p.montantTotal).reduce((acc, p) => acc + (p.montantPaye || 0), 0);
  const totalEnRetard = payments.filter(p => p.montantRestant >= p.montantTotal).reduce((acc, p) => acc + (p.montantPaye || 0), 0);

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
                  // Get latest paiement entry for type
                  const lastPaiement = Array.isArray(payment.paiements) && payment.paiements.length > 0 ? payment.paiements[payment.paiements.length - 1] : null;
                  const typePaiement = lastPaiement?.typePaiement || '';
                  const typeInfo = getTypeInfo(typePaiement);
                  // Statut: compute from montantRestant
                  let statut = 'paye';
                  if (typeof payment.montantRestant === 'number') {
                    if (payment.montantRestant > 0 && payment.montantRestant < payment.montantTotal) statut = 'en_attente';
                    else if (payment.montantRestant >= payment.montantTotal) statut = 'en_retard';
                    else if (payment.montantRestant === 0) statut = 'paye';
                  }
                  const statutInfo = getStatutInfo(statut);
                  let eleve = null;
                  if (payment.eleveId) {
                    if (Array.isArray(payment.eleveId)) {
                      eleve = payment.eleveId[0] || null;
                    } else if (typeof payment.eleveId === 'object') {
                      eleve = payment.eleveId;
                    }
                  }
                  const eleveNom = eleve?.nom || '';
                  const elevePrenom = eleve?.prenom || '';
                  const eleveMatricule = eleve?.matricule || '';
                  let eleveClasse = '';
                  if (eleve?.classeId) {
                    if (typeof eleve.classeId === 'object' && eleve.classeId !== null) {
                      eleveClasse = eleve.classeId.nom || '';
                    } else if (typeof eleve.classeId === 'string' && payment.classeId && typeof payment.classeId === 'object') {
                      eleveClasse = payment.classeId.nom || '';
                    }
                  }
                  return (
                    <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {eleve ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {elevePrenom} {eleveNom}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {eleveMatricule && (<span>Matricule : {eleveMatricule} <br /></span>)}
                              {eleveClasse && (<span>Classe : {eleveClasse}</span>)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Non renseigné</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                        {typeof payment.montantPaye === 'number' && !isNaN(payment.montantPaye) ? payment.montantPaye.toLocaleString('fr-FR') : ''} GNF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendar} className="mr-2 w-4" />
                          {(() => {
                            // Use latest paiement entry for date
                            const lastPaiement = Array.isArray(payment.paiements) && payment.paiements.length > 0 ? payment.paiements[payment.paiements.length - 1] : null;
                            const dateStr = lastPaiement?.datePaiement;
                            if (dateStr) {
                              const d = new Date(dateStr);
                              return !isNaN(d.getTime()) ? d.toLocaleDateString('fr-FR') : '';
                            }
                            return '';
                          })()}
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
                          {payment._id}
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
                            onClick={() => handleDeletePayment(payment._id)}
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
            <div className="flex justify-center mt-4 gap-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Précédent
  </button>
  <span>
    Page {page} / {Math.max(1, Math.ceil(total / limit))}
  </span>
  <button
    disabled={page >= Math.ceil(total / limit)}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Suivant
  </button>
</div>
          </div>
        </div>

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Nouveau paiement</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Élève *
                  </label>
                  <select
                    value={newPayment.eleveId}
                    onChange={e => setNewPayment({ ...newPayment, eleveId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Sélectionner un élève</option>
                    {eleves.map(eleve => (
                      <option key={eleve._id} value={eleve._id}>{eleve.prenom} {eleve.nom}</option>
                    ))}
                  </select>
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
                      onChange={(e) => setNewPayment({...newPayment, typePaiement: e.target.value})}
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
                      onChange={(e) => setNewPayment({...newPayment, statut: e.target.value})}
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
                    onChange={(e) => setNewPayment({...newPayment, methodePaiement: e.target.value})}
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