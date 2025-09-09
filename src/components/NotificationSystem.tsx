import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faTimes, 
  faExclamationTriangle, 
  faCheckCircle, 
  faInfoCircle,
  faCalendar,
  faDollarSign,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'payment' | 'academic' | 'general' | 'calendar';
  actionUrl?: string;
}

interface NotificationSystemProps {
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ onNotificationClick }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Génération de notifications d'exemple
  useEffect(() => {
    const generateSampleNotifications = (): Notification[] => {
      const now = new Date();
      return [
        {
          id: '1',
          type: 'warning',
          title: 'Paiements en retard',
          message: '5 élèves ont des paiements de scolarité en retard',
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 heures
          read: false,
          category: 'payment',
          actionUrl: '/paiements'
        },
        {
          id: '2',
          type: 'info',
          title: 'Réunion parents-professeurs',
          message: 'Réunion prévue demain à 14h00 en salle de conférence',
          timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 heures
          read: false,
          category: 'calendar',
          actionUrl: '/calendrier'
        },
        {
          id: '3',
          type: 'success',
          title: 'Nouveaux élèves inscrits',
          message: '3 nouveaux élèves ont été inscrits cette semaine',
          timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 jour
          read: true,
          category: 'academic',
          actionUrl: '/eleves'
        },
        {
          id: '4',
          type: 'info',
          title: 'Examen de mathématiques',
          message: 'Examen prévu le 15 février pour toutes les classes de 6ème',
          timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 jours
          read: true,
          category: 'academic',
          actionUrl: '/notes'
        },
        {
          id: '5',
          type: 'warning',
          title: 'Classe surchargée',
          message: 'La classe 6ème A atteint 95% de sa capacité',
          timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 jours
          read: false,
          category: 'academic',
          actionUrl: '/classes'
        }
      ];
    };

    const sampleNotifications = generateSampleNotifications();
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  const getNotificationIcon = (type: string, category: string) => {
    if (category === 'payment') return <FontAwesomeIcon icon={faDollarSign} className="text-yellow-500" />;
    if (category === 'academic') return <FontAwesomeIcon icon={faUserGraduate} className="text-blue-500" />;
    if (category === 'calendar') return <FontAwesomeIcon icon={faCalendar} className="text-green-500" />;
    
    switch (type) {
      case 'warning': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
      case 'success': return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'error': return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      default: return <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'error': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    setIsOpen(false);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Il y a ${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="relative">
      {/* Bouton de notification */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Panneau de notifications */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>
          </div>

          {/* Liste des notifications */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Aucune notification
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type, notification.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {formatTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pied de page */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Overlay pour fermer le panneau */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationSystem;