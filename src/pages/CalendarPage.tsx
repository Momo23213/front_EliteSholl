import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faPlus, 
  faEdit, 
  faTrash, 
  faGraduationCap,
  faBook,
  faUsers,
  faClock,
  faMapMarkerAlt,
  faBell
} from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: string;
  titre: string;
  description: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: 'examen' | 'vacances' | 'reunion' | 'activite' | 'autre';
  lieu?: string;
  participants?: string[];
  couleur: string;
  rappel?: boolean;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [, setEditingEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    titre: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    heureDebut: '09:00',
    heureFin: '10:00',
    type: 'autre',
    lieu: '',
    participants: [],
    couleur: '#3B82F6',
    rappel: false
  });

  const typesEvenements = [
    { value: 'examen', label: 'Examen', color: '#EF4444', icon: faGraduationCap },
    { value: 'vacances', label: 'Vacances', color: '#10B981', icon: faCalendar },
    { value: 'reunion', label: 'Réunion', color: '#3B82F6', icon: faUsers },
    { value: 'activite', label: 'Activité', color: '#F59E0B', icon: faBook },
    { value: 'autre', label: 'Autre', color: '#8B5CF6', icon: faBell }
  ];

  const couleurs = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  // Données d'exemple
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        titre: 'Examen de Mathématiques',
        description: 'Examen trimestriel de mathématiques pour toutes les classes',
        date: '2024-02-15',
        heureDebut: '08:00',
        heureFin: '10:00',
        type: 'examen',
        lieu: 'Salle de classe A',
        participants: ['6ème A', '6ème B'],
        couleur: '#EF4444',
        rappel: true
      },
      {
        id: '2',
        titre: 'Réunion parents-professeurs',
        description: 'Réunion trimestrielle avec les parents',
        date: '2024-02-20',
        heureDebut: '14:00',
        heureFin: '17:00',
        type: 'reunion',
        lieu: 'Salle de conférence',
        participants: ['Tous les parents'],
        couleur: '#3B82F6',
        rappel: true
      },
      {
        id: '3',
        titre: 'Vacances de février',
        description: 'Période de vacances scolaires',
        date: '2024-02-26',
        heureDebut: '00:00',
        heureFin: '23:59',
        type: 'vacances',
        couleur: '#10B981',
        rappel: false
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const today = new Date();
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === today.toDateString()
      });
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handleAddEvent = () => {
    if (newEvent.titre && newEvent.date) {
      const event: Event = {
        id: Date.now().toString(),
        titre: newEvent.titre!,
        description: newEvent.description || '',
        date: newEvent.date!,
        heureDebut: newEvent.heureDebut || '09:00',
        heureFin: newEvent.heureFin || '10:00',
        type: newEvent.type!,
        lieu: newEvent.lieu,
        participants: newEvent.participants || [],
        couleur: newEvent.couleur || '#3B82F6',
        rappel: newEvent.rappel || false
      };
      setEvents([...events, event]);
      setNewEvent({
        titre: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        heureDebut: '09:00',
        heureFin: '10:00',
        type: 'autre',
        lieu: '',
        participants: [],
        couleur: '#3B82F6',
        rappel: false
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const getTypeInfo = (type: string) => {
    return typesEvenements.find(t => t.value === type) || typesEvenements[4];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen  mt-10 w-full p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto">
        {/* En-tête */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-3 text-blue-500" />
              Calendrier Scolaire
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gérez les événements et le planning de votre école.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un événement
          </button>
        </header>

        {/* Navigation du calendrier */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {/* En-têtes des jours */}
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
            
            {/* Jours du mois */}
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isSelected = selectedDate === day.date.toISOString().split('T')[0];
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    !day.isCurrentMonth ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : ''
                  } ${day.isToday ? 'bg-blue-100 dark:bg-blue-900' : ''} ${
                    isSelected ? 'bg-blue-200 dark:bg-blue-800' : ''
                  }`}
                  onClick={() => setSelectedDate(day.date.toISOString().split('T')[0])}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    day.isToday ? 'text-blue-600 dark:text-blue-400' : ''
                  }`}>
                    {day.date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => {
                      const typeInfo = getTypeInfo(event.type);
                      return (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded truncate"
                          style={{ 
                            backgroundColor: event.couleur + '20',
                            color: event.couleur
                          }}
                        >
                          {event.titre}
                        </div>
                      );
                    })}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayEvents.length - 2} autres
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Événements du jour sélectionné */}
        {selectedDate && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Événements du {new Date(selectedDate).toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="space-y-4">
              {getEventsForDate(new Date(selectedDate)).map(event => {
                return (
                  <div
                    key={event.id}
                    className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div 
                      className="w-4 h-4 rounded-full mr-4 mt-1"
                      style={{ backgroundColor: event.couleur }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {event.titre}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingEvent(event)}
                            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-1 w-3" />
                          {event.heureDebut} - {event.heureFin}
                        </div>
                        {event.lieu && (
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 w-3" />
                            {event.lieu}
                          </div>
                        )}
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={getTypeInfo(event.type).icon} className="mr-1 w-3" />
                          {getTypeInfo(event.type).label}
                        </div>
                        {event.rappel && (
                          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                            <FontAwesomeIcon icon={faBell} className="mr-1 w-3" />
                            Rappel activé
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {getEventsForDate(new Date(selectedDate)).length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  Aucun événement prévu pour cette date.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal d'ajout */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ajouter un événement</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={newEvent.titre}
                    onChange={(e) => setNewEvent({...newEvent, titre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {typesEvenements.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={newEvent.heureDebut}
                      onChange={(e) => setNewEvent({...newEvent, heureDebut: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      value={newEvent.heureFin}
                      onChange={(e) => setNewEvent({...newEvent, heureFin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={newEvent.lieu}
                    onChange={(e) => setNewEvent({...newEvent, lieu: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Couleur
                  </label>
                  <div className="flex space-x-2">
                    {couleurs.map((couleur) => (
                      <button
                        key={couleur}
                        onClick={() => setNewEvent({...newEvent, couleur})}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newEvent.couleur === couleur ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        style={{ backgroundColor: couleur }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rappel"
                    checked={newEvent.rappel}
                    onChange={(e) => setNewEvent({...newEvent, rappel: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="rappel" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Activer le rappel
                  </label>
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
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;