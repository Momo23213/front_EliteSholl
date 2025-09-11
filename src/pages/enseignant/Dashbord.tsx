import React, { useState, useEffect } from "react";
import { Sun, Moon, BookOpen, Calendar, Users, Book } from "lucide-react";
// Exemple types
type Note = { eleve: string; matiere: string; note: number };
type Classe = { nom: string; elevesCount: number };

const TeacherDashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const [notes, setNotes] = useState<Note[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dark mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDarkMode]);

  // Fake fetch données
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNotes([
        { eleve: "Aliou", matiere: "Mathématiques", note: 15 },
        { eleve: "Fatou", matiere: "Français", note: 12 },
        { eleve: "Mamadou", matiere: "Physique", note: 14 },
      ]);
      setClasses([
        { nom: "6ème A", elevesCount: 25 },
        { nom: "5ème B", elevesCount: 30 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <div className="container mx-auto px-4 py-6">
        {/* Header + Dark mode toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 md:mb-0">
            Tableau de bord Enseignant
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            {isDarkMode ? "Mode clair" : "Mode sombre"}
          </button>
        </div>

        {/* Cartes résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition">
            <Users className="h-6 w-6 text-blue-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-300 text-sm">Élèves</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {classes.reduce((sum, c) => sum + c.elevesCount, 0)}
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition">
            <Book className="h-6 w-6 text-green-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-300 text-sm">Classes</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {classes.length}
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition">
            <BookOpen className="h-6 w-6 text-yellow-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-300 text-sm">Notes saisies</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {notes.length}
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition">
            <Calendar className="h-6 w-6 text-purple-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-300 text-sm">Emploi du temps</p>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Voir</h2>
          </div>
        </div>

        {/* Table des dernières notes */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow overflow-x-auto">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Dernières notes saisies
          </h2>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-300">Chargement...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Élève</th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Matière</th>
                  <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Note</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2">{note.eleve}</td>
                    <td className="px-4 py-2">{note.matiere}</td>
                    <td className="px-4 py-2 font-semibold">{note.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
