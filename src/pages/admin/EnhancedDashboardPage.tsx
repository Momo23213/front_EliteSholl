import React, { useState, useEffect } from "react";
import { 
  Users, BookOpen, GraduationCap, CheckCircle, DollarSign, Calendar, 
  TrendingUp, AlertTriangle, Clock, UserCheck, Bell, FileText,
  BarChart3, PieChart as PieChartIcon, Activity
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import { useSchool } from "../../contexts/SchoolContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, faExclamationTriangle, faCheckCircle, faClock, 
  faUserGraduate, faChalkboardTeacher, faBook, faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

interface OccupancyData {
  name: string;
  Occupation: number;
  Capacity: number;
  fill: string;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

export default function EnhancedDashboardPage() {
  const { classes, eleves } = useSchool();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Données d'exemple pour les notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Paiements en retard',
        message: '5 élèves ont des paiements en retard',
        time: 'Il y a 2 heures',
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Réunion parents-professeurs',
        message: 'Réunion prévue demain à 14h',
        time: 'Il y a 4 heures',
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Nouveaux élèves inscrits',
        message: '3 nouveaux élèves ont été inscrits cette semaine',
        time: 'Il y a 1 jour',
        read: true
      }
    ];
    setNotifications(sampleNotifications);

    const sampleActivity = [
      { action: 'Nouvel élève inscrit', user: 'Marie Dubois', time: '10 min', type: 'success' },
      { action: 'Paiement reçu', user: 'Lucas Martin', time: '30 min', type: 'info' },
      { action: 'Note ajoutée', user: 'Pierre Bernard', time: '1h', type: 'info' },
      { action: 'Classe créée', user: 'Sophie Laurent', time: '2h', type: 'success' }
    ];
    setRecentActivity(sampleActivity);
  }, []);

  // Statistiques principales
  const totalClasses: number = Array.isArray(classes) ? classes.length : 0;
  const totalEleves: number = Array.isArray(eleves) ? eleves.length : 0;
  const totalMatieres: number = Array.isArray(classes) ? classes.reduce((sum, c) => sum + (Array.isArray(c.matieres) ? c.matieres.length : 0), 0) : 0;
  const totalOccupancy: number = Array.isArray(classes) ? classes.reduce((sum, c) => sum + (Array.isArray(c.eleves) ? c.eleves.length : 0), 0) : 0;
  
  // Statistiques financières (simulées)
  const totalRevenue = 2500000; // FCFA
  const pendingPayments = 150000; // FCFA
  const paidAmount = 2350000; // FCFA

  // Graphique Occupation des classes
  const occupancyData: OccupancyData[] = Array.isArray(classes)
    ? classes.map((c) => ({
        name: c.nom,
        Occupation: c.eleves?.length || 0,
        Capacity: c.effMax || 0,
        fill: getOccupancyColor(c.eleves?.length || 0, c.effMax || 1),
      }))
    : [];

  // Données pour le graphique des paiements
  const paymentData = [
    { month: 'Jan', paye: 800000, enAttente: 100000, enRetard: 50000 },
    { month: 'Fév', paye: 750000, enAttente: 120000, enRetard: 30000 },
    { month: 'Mar', paye: 900000, enAttente: 80000, enRetard: 20000 },
    { month: 'Avr', paye: 850000, enAttente: 90000, enRetard: 60000 },
  ];

  // Données pour le graphique en secteurs (répartition des élèves par niveau)
  const levelData = [
    { name: '6ème', value: 45, color: '#3B82F6' },
    { name: '5ème', value: 38, color: '#10B981' },
    { name: '4ème', value: 42, color: '#F59E0B' },
    { name: '3ème', value: 35, color: '#EF4444' },
  ];

  function getOccupancyColor(current: number, capacity: number): string {
    const ratio = current / capacity;
    if (ratio >= 0.9) return "#ef4444"; // rouge
    if (ratio >= 0.7) return "#f59e0b"; // orange
    return "#10b981"; // vert
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
      case 'success': return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'error': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      default: return <FontAwesomeIcon icon={faBell} className="text-blue-500" />;
    }
  };

  const quickActions: QuickAction[] = [
    {
      title: 'Inscrire un élève',
      description: 'Ajouter un nouvel élève',
      icon: <FontAwesomeIcon icon={faUserGraduate} className="text-2xl" />,
      color: 'bg-blue-500',
      path: '/eleves'
    },
    {
      title: 'Ajouter un enseignant',
      description: 'Enregistrer un nouveau professeur',
      icon: <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" />,
      color: 'bg-purple-500',
      path: '/enseignants'
    },
    {
      title: 'Créer une matière',
      description: 'Ajouter une nouvelle matière',
      icon: <FontAwesomeIcon icon={faBook} className="text-2xl" />,
      color: 'bg-green-500',
      path: '/matieres'
    },
    {
      title: 'Enregistrer un paiement',
      description: 'Saisir un nouveau paiement',
      icon: <FontAwesomeIcon icon={faMoneyBillWave} className="text-2xl" />,
      color: 'bg-yellow-500',
      path: '/paiements'
    }
  ];

  return (
    <div className="space-y-8 mt-10 w-full p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* En-tête avec salutation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Bonjour ! Voici un aperçu de votre école aujourd'hui.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Dernière connexion</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="w-10 h-10 text-blue-500" />} 
          title="Élèves" 
          value={totalEleves}
          change="+5%"
          changeType="positive"
        />
        <StatCard 
          icon={<GraduationCap className="w-10 h-10 text-purple-500" />} 
          title="Classes" 
          value={totalClasses}
          change="+2"
          changeType="positive"
        />
        <StatCard 
          icon={<BookOpen className="w-10 h-10 text-green-500" />} 
          title="Matières" 
          value={totalMatieres}
          change="+1"
          changeType="positive"
        />
        <StatCard 
          icon={<DollarSign className="w-10 h-10 text-yellow-500" />} 
          title="Revenus (FCFA)" 
          value={totalRevenue.toLocaleString('fr-FR')}
          change="+12%"
          changeType="positive"
        />
      </div>

      {/* Actions rapides */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Actions rapides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {action.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Graphiques et notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique Occupation des classes */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Occupation des classes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-700" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Occupation" radius={[4, 4, 0, 0]}>
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border-l-4 ${
                  notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  notification.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                  notification.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                } ${!notification.read ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      {notification.message}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Graphiques financiers et répartition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des paiements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Évolution des paiements
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString('fr-FR')} FCFA`} />
              <Area type="monotone" dataKey="paye" stackId="1" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="enAttente" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
              <Area type="monotone" dataKey="enRetard" stackId="1" stroke="#EF4444" fill="#EF4444" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par niveau */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Répartition par niveau
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={levelData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {levelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activité récente */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Activité récente
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className={`w-2 h-2 rounded-full mr-3 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant StatCard amélioré
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

function StatCard({ icon, title, value, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
              changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
}