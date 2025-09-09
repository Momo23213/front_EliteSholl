
import { Users, BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { useSchool } from "../contexts/SchoolContext";

interface OccupancyData {
  name: string;
  Occupation: number;
  Capacity: number;
  fill: string;
}

export default function DashboardPage() {
  const { classes, eleves } = useSchool();

  // Statistiques
  const totalClasses: number = classes.length;
  const totalEleves: number = eleves.length;
  const totalMatieres: number = classes.reduce((sum, c) => sum + (c.matieres?.length || 0), 0);
  const totalOccupancy: number = classes.reduce((sum, c) => sum + (c.eleves?.length || 0), 0);

  // Graphique Occupation des classes
  const occupancyData: OccupancyData[] = classes.map((c) => ({
    name: c.nom,
    Occupation: c.eleves?.length || 0,
    Capacity: c.effMax || 0,
    fill: getOccupancyColor(c.eleves?.length || 0, c.effMax || 1),
  }));

  function getOccupancyColor(current: number, capacity: number): string {
    const ratio = current / capacity;
    if (ratio >= 0.9) return "#ef4444"; // rouge
    if (ratio >= 0.7) return "#f59e0b"; // orange
    return "#10b981"; // vert
  }

  return (
    <div className="space-y-8 p-6 mt-10 w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Dashboard École</h2>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-10 h-10 text-blue-500" />} title="Élèves" value={totalEleves} />
        <StatCard icon={<GraduationCap className="w-10 h-10 text-purple-500" />} title="Classes" value={totalClasses} />
        <StatCard icon={<BookOpen className="w-10 h-10 text-green-500" />} title="Matières" value={totalMatieres} />
        <StatCard icon={<CheckCircle className="w-10 h-10 text-orange-500" />} title="Occupation totale" value={totalOccupancy} />
      </div>

      {/* Graphique Occupation des classes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Occupation des classes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={occupancyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="dark:text-gray-700" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Occupation" radius={[4, 4, 0, 0]}>
              {occupancyData.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dernières classes */}
      <ListCard
        title="Dernières Classes"
        items={classes.map((c) => ({
          name: c.nom,
          subtitle: `${c.niveau} - ${c.eleves?.length || 0}/${c.effMax || 0} élèves`,
          extra: c.anneeScolaireId?.libelle,
        }))}
      />

      {/* Derniers élèves */}
      <ListCard
        title="Derniers Élèves"
        items={eleves.map((e) => ({
          name: `${e.nom} ${e.prenom}`,
          subtitle: e.classeId?.nom,
          extra: e.anneeScolaireId?.libelle,
        }))}
      />
    </div>
  );
}

// 🔹 Composants réutilisables avec TS
interface StatCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
    {icon}
    <span className="text-2xl font-bold mt-2">{value}</span>
    <span className="text-gray-500 dark:text-gray-300">{title}</span>
  </div>
);

interface ListCardProps {
  title: string;
  items: { name: string; subtitle?: string; extra?: string }[];
}

const ListCard: React.FC<ListCardProps> = ({ title, items }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>
    {items.map((item, i) => (
      <div key={i} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors rounded-md px-2">
        <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
        <span className="text-gray-500 text-sm">{item.subtitle}</span>
        {item.extra && <span className="text-gray-400 text-xs">{item.extra}</span>}
      </div>
    ))}
  </div>
);