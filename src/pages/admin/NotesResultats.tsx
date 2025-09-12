import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { DataScholl } from '../../DataScholl';
import { noteService } from '../../services/noteService';

// Définition des types
interface AnneeScolaire {
  _id: string;
  libelle: string;
}

interface Classe {
  _id: string;
  nom: string;
}

interface Matiere {
  _id: string;
  nom: string;
  coef: number;
}

interface Eleve {
  _id: string;
  matricule: string;
  nom: string;
  prenom: string;
  sexe: string;
  photo: string;
  classeId: Classe;
  statut?: string;
}

interface Note {
  _id: string;
  eleveId: Eleve;
  matiereId: Matiere;
  valeur?: number;
  trimestre: string;
  sequence: string;
  anneeScolaireId: AnneeScolaire;
}

interface EleveAvecStats extends Eleve {
  moyennesTrimestres: Record<string, number>;
  moyenneGenerale: number;
  rang: number;
  appreciation: string;
}

const appreciationColor = (appreciation: string) => {
  switch (appreciation) {
    case 'Excellent':
      return 'text-green-600 dark:text-green-400';
    case 'Très bien':
      return 'text-blue-600 dark:text-blue-400';
    case 'Bien':
      return 'text-purple-600 dark:text-purple-400';
    case 'Assez bien':
      return 'text-yellow-600 dark:text-yellow-400';
    default:
      return 'text-red-600 dark:text-red-400';
  }
};

const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [eleves, setEleves] = useState<EleveAvecStats[]>([]);
  const [elevesFiltres, setElevesFiltres] = useState<EleveAvecStats[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [notesInitiales, setNotesInitiales] = useState<Note[]>([]); // ✅ un seul state
  const [trimestresDetectes, setTrimestresDetectes] = useState<string[]>([]);
  const [uniqueClasses, setUniqueClasses] = useState<Classe[]>([]);
  
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    classeId: '',
    statut: '',
    sexe: '',
  });

  useEffect(() => {
    async function not() {
      try {
        setLoader(true);
        const data = await noteService.getAll();
        setNotesInitiales(data);
      } catch (error: any) {
        console.log(error.message); // ✅ corrigé
      } finally {
        setLoader(false);
      }
    }
    not();
    console.log(notesInitiales);
    
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // ✅ recalcul des moyennes et rangs dès que notesInitiales change
  useEffect(() => {
    try {
      const tousLesTrimestres = Array.from(new Set(notesInitiales.map(note => note.trimestre || 'N/A'))).sort();
      setTrimestresDetectes(tousLesTrimestres);

      const elevesDataFromNotes = Array.from(new Set(notesInitiales.map(note => JSON.stringify(note.eleveId))));
      const elevesObjects = elevesDataFromNotes.map(e => JSON.parse(e));
      const classes = Array.from(new Map(elevesObjects.map(eleve => [eleve.classeId._id, eleve.classeId])).values());
      setUniqueClasses(classes);

      const elevesMap: Record<string, EleveAvecStats> = {};
      notesInitiales.forEach(note => {
        const eleveId = note.eleveId._id;
        if (!elevesMap[eleveId]) {
          elevesMap[eleveId] = {
            ...note.eleveId,
            moyennesTrimestres: {},
            moyenneGenerale: 0,
            rang: 0,
            appreciation: '',
          };
        }
      });

      const notesParEleve: Record<string, Note[]> = {};
      notesInitiales.forEach(note => {
        const eleveId = note.eleveId._id;
        if (!notesParEleve[eleveId]) {
          notesParEleve[eleveId] = [];
        }
        notesParEleve[eleveId].push(note);
      });

      Object.values(elevesMap).forEach(eleve => {
        const notesDeLAnnee = notesParEleve[eleve._id] || [];
        const notesParTrimestre: Record<string, Note[]> = notesDeLAnnee.reduce((acc, note) => {
          if (!acc[note.trimestre]) {
            acc[note.trimestre] = [];
          }
          acc[note.trimestre].push(note);
          return acc;
        }, {} as Record<string, Note[]>);
      
        let totalMoyennesPonderees = 0;
        let nombreTrimestres = 0;

        Object.entries(notesParTrimestre).forEach(([trimestre, notes]) => {
          const notesValides = notes.filter(n => n.valeur != null && n.matiereId?.coef != null);
          const totalPointsPonderes = notesValides.reduce((sum, n) => sum + (n.valeur! * n.matiereId.coef), 0);
          const totalCoefficients = notesValides.reduce((sum, n) => sum + n.matiereId.coef, 0);
          
          const moyenneTrimestre = totalCoefficients > 0 ? parseFloat((totalPointsPonderes / totalCoefficients).toFixed(2)) : 0;
          eleve.moyennesTrimestres[trimestre] = moyenneTrimestre;
          totalMoyennesPonderees += moyenneTrimestre;
          nombreTrimestres++;
        });
      
        eleve.moyenneGenerale = nombreTrimestres > 0 ? parseFloat((totalMoyennesPonderees / nombreTrimestres).toFixed(2)) : 0;
        
        let appreciation = '';
        if (eleve.moyenneGenerale >= 16) appreciation = 'Excellent';
        else if (eleve.moyenneGenerale >= 14) appreciation = 'Très bien';
        else if (eleve.moyenneGenerale >= 12) appreciation = 'Bien';
        else if (eleve.moyenneGenerale >= 10) appreciation = 'Assez bien';
        else appreciation = 'Insuffisant';
        eleve.appreciation = appreciation;
      });

      const elevesParClasse: Record<string, EleveAvecStats[]> = Object.values(elevesMap).reduce((acc, eleve) => {
        const nomClasse = eleve.classeId.nom;
        if (!acc[nomClasse]) acc[nomClasse] = [];
        acc[nomClasse].push(eleve);
        return acc;
      }, {} as Record<string, EleveAvecStats[]>);

      const elevesAvecRangsGlobaux: EleveAvecStats[] = [];
      Object.values(elevesParClasse).forEach(listeElevesClasse => {
        listeElevesClasse.sort((a, b) => b.moyenneGenerale - a.moyenneGenerale);
        listeElevesClasse.forEach((eleve, index) => {
          if (index > 0 && eleve.moyenneGenerale === listeElevesClasse[index - 1].moyenneGenerale) {
            eleve.rang = listeElevesClasse[index - 1].rang;
          } else {
            eleve.rang = index + 1;
          }
        });
        elevesAvecRangsGlobaux.push(...listeElevesClasse);
      });

      setEleves(elevesAvecRangsGlobaux);
    } catch (error) {
      console.error("Erreur lors du traitement des données :", error);
    }
  }, [notesInitiales]); // ✅ ajouté

  useEffect(() => {
    let resultatFiltres = eleves;

    if (filters.classeId) {
      resultatFiltres = resultatFiltres.filter(e => e.classeId._id === filters.classeId);
    }
    if (filters.statut) {
      resultatFiltres = resultatFiltres.filter(e => e.statut === filters.statut);
    }
    if (filters.sexe) {
      resultatFiltres = resultatFiltres.filter(e => e.sexe === filters.sexe);
    }

    if (searchTerm) {
      const terme = searchTerm.toLowerCase();
      resultatFiltres = resultatFiltres.filter(e => 
        e.nom.toLowerCase().includes(terme) || 
        e.prenom.toLowerCase().includes(terme) ||
        e.matricule?.toLowerCase().includes(terme)
      );
    }
    
    setElevesFiltres(resultatFiltres);
  }, [eleves, searchTerm, filters]);

  const getMoyenneColor = (moyenne: number) => {
    if (moyenne >= 16) return 'text-green-600 dark:text-green-400';
    if (moyenne >= 14) return 'text-blue-600 dark:text-blue-400';
    if (moyenne >= 12) return 'text-purple-600 dark:text-purple-400';
    if (moyenne >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColorClass = (moyenne: number) => {
    if (moyenne >= 16) return 'bg-green-600 dark:bg-green-400';
    if (moyenne >= 14) return 'bg-blue-600 dark:bg-blue-400';
    if (moyenne >= 12) return 'bg-purple-600 dark:bg-purple-400';
    if (moyenne >= 10) return 'bg-yellow-600 dark:bg-yellow-400';
    return 'bg-red-600 dark:bg-red-400';
  };

  // Données de l'établissement depuis DataScholl
  const resolveLogoUrl = (logoPath: string | undefined) => {
    if (!logoPath) return `${window.location.origin}/logo.png`;
    if (logoPath.startsWith('../public/')) return logoPath.replace('../public/', '/');
    return logoPath;
  };
  const currentYear = new Date().getFullYear();
  const SCHOOL_INFO = {
    name: DataScholl.name,
    address: DataScholl.address,
    phone: DataScholl.phone,
    email: DataScholl.email,
    academicYear: `${currentYear}-${currentYear + 1}`,
    reportTitle: 'Résultats des notes',
    preparedBy: 'Administration',
    logoUrl: resolveLogoUrl(DataScholl.logo as unknown as string),
  };

  // Statistiques récapitulatives (calculées)
  const nombreEleves = elevesFiltres.length;
  const moyenneClasse = nombreEleves > 0 ? (elevesFiltres.reduce((s, e) => s + e.moyenneGenerale, 0) / nombreEleves).toFixed(2) : '0.00';
  const meilleurEleve = elevesFiltres.length > 0 ? [...elevesFiltres].sort((a,b) => b.moyenneGenerale - a.moyenneGenerale)[0] : undefined;
  const moinsBonEleve = elevesFiltres.length > 0 ? [...elevesFiltres].sort((a,b) => a.moyenneGenerale - b.moyenneGenerale)[0] : undefined;

  const exportCSV = () => {
    const header = ['Matricule', 'Nom', 'Prénom', 'Sexe', 'Classe', ...trimestresDetectes, 'Moyenne', 'Rang', 'Appréciation'];
    const rows = elevesFiltres.map(eleve => {
      const trimestresValues = trimestresDetectes.map(t => eleve.moyennesTrimestres[t]?.toFixed(2) ?? '-');
      return [
        eleve.matricule,
        eleve.nom,
        eleve.prenom,
        eleve.sexe,
        eleve.classeId.nom,
        ...trimestresValues,
        eleve.moyenneGenerale.toFixed(2),
        String(eleve.rang),
        eleve.appreciation
      ];
    });
    const csvContent = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultats-notes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const styles = `
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
        th { background: #f3f4f6; }
        h2 { margin: 4px 0; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .school-info { text-align: center; flex: 1; }
        .logo { width: 64px; height: 64px; object-fit: contain; }
        .muted { color: #6b7280; font-size: 12px; }
        .row { display: flex; justify-content: space-between; margin: 6px 0 12px; font-size: 12px; }
        .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; margin: 12px 0; }
        .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; }
        .card h4 { margin: 0 0 4px; font-size: 12px; color: #374151; }
        .card .value { font-weight: bold; font-size: 14px; color: #111827; }
      </style>
    `;
    const headerRow = ['Photo','Matricule','Nom & Prénom','Sexe','Classe',...trimestresDetectes,'Moyenne','Rang','Appréciation'];
    const rowsHtml = elevesFiltres.map(e => {
      const trValues = trimestresDetectes.map(t => e.moyennesTrimestres[t]?.toFixed(2) ?? '-').map(v => `<td>${v}</td>`).join('');
      return `
        <tr>
          <td></td>
          <td>${e.matricule}</td>
          <td>${e.nom} ${e.prenom}</td>
          <td>${e.sexe}</td>
          <td>${e.classeId.nom}</td>
          ${trValues}
          <td>${e.moyenneGenerale.toFixed(2)}</td>
          <td>${e.rang}</td>
          <td>${e.appreciation}</td>
        </tr>
      `;
    }).join('');
    const today = new Date().toLocaleDateString('fr-FR');
    const doc = `
      <html>
        <head>
          <meta charSet="utf-8" />
          ${styles}
        </head>
        <body>
          <div class="header">
            <img src="${SCHOOL_INFO.logoUrl}" class="logo" onerror="this.style.display='none'" />
            <div class="school-info">
              <h2>${SCHOOL_INFO.name}</h2>
              <div class="muted">${SCHOOL_INFO.address} • ${SCHOOL_INFO.phone} • ${SCHOOL_INFO.email}</div>
            </div>
            <div style="width:64px"></div>
          </div>
          <div class="row">
            <div><strong>Rapport:</strong> ${SCHOOL_INFO.reportTitle}</div>
            <div><strong>Date:</strong> ${today}</div>
            <div><strong>Année:</strong> ${SCHOOL_INFO.academicYear}</div>
            <div><strong>Préparé par:</strong> ${SCHOOL_INFO.preparedBy}</div>
          </div>
          <div class="cards">
            <div class="card">
              <h4>Nombre d'élèves</h4>
              <div class="value">${nombreEleves}</div>
            </div>
            <div class="card">
              <h4>Moyenne de la classe</h4>
              <div class="value">${moyenneClasse}</div>
            </div>
            <div class="card">
              <h4>Meilleur élève</h4>
              <div class="value">${meilleurEleve ? `${meilleurEleve.nom} ${meilleurEleve.prenom} (${meilleurEleve.moyenneGenerale.toFixed(2)})` : '-'}</div>
            </div>
            <div class="card">
              <h4>Dernier élève</h4>
              <div class="value">${moinsBonEleve ? `${moinsBonEleve.nom} ${moinsBonEleve.prenom} (${moinsBonEleve.moyenneGenerale.toFixed(2)})` : '-'}</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>${headerRow.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const exportBulletin = (eleve: EleveAvecStats) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const studentPhotoUrl = eleve.photo ? `https://schoolelite.onrender.com${eleve.photo}` : '';
    const styles = `
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; }
        th { background: #f3f4f6; }
        h2, h3 { margin: 4px 0; }
        .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .school-info { text-align: center; flex: 1; }
        .logo { width: 64px; height: 64px; object-fit: contain; }
        .avatar { width: 64px; height: 64px; border-radius: 9999px; object-fit: cover; border: 1px solid #e5e7eb; }
        .muted { color: #6b7280; font-size: 12px; }
        .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin: 8px 0; font-size: 12px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin: 8px 0; font-size: 12px; }
        .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px; }
        .footer { margin-top: 16px; display: flex; justify-content: space-between; font-size: 12px; }
      </style>
    `;
    const today = new Date().toLocaleDateString('fr-FR');
    const eleveNotes = notesInitiales.filter(n => n.eleveId._id === eleve._id);
    const parMatiere = eleveNotes.reduce((acc: Record<string, { nom: string; coef: number; notes: number[] }>, n) => {
      const key = n.matiereId._id;
      if (!acc[key]) acc[key] = { nom: n.matiereId.nom, coef: n.matiereId.coef, notes: [] };
      if (n.valeur != null) acc[key].notes.push(n.valeur);
      return acc;
    }, {});
    const lignes = Object.values(parMatiere).map(m => {
      const moyenne = m.notes.length > 0 ? (m.notes.reduce((s, v) => s + v, 0) / m.notes.length) : 0;
      return { nom: m.nom, coef: m.coef, moyenne: moyenne.toFixed(2) };
    });
    const totalPoints = Object.values(parMatiere).reduce((s, m) => {
      const moy = m.notes.length > 0 ? (m.notes.reduce((x,y)=>x+y,0) / m.notes.length) : 0;
      return s + moy * m.coef;
    }, 0);
    const totalCoef = Object.values(parMatiere).reduce((s, m) => s + m.coef, 0) || 1;
    const moyennePonderee = (totalPoints / totalCoef).toFixed(2);

    const tableRows = lignes.map(l => `
      <tr>
        <td>${l.nom}</td>
        <td style="text-align:center;">${l.coef}</td>
        <td style="text-align:center;">${l.moyenne}</td>
      </tr>
    `).join('');

    const doc = `
      <html>
        <head><meta charSet="utf-8" />${styles}</head>
        <body>
          <div class="header">
            <img src="${SCHOOL_INFO.logoUrl}" class="logo" onerror="this.style.display='none'" />
            <div class="school-info">
              <h2>${SCHOOL_INFO.name}</h2>
              <div class="muted">${SCHOOL_INFO.address} • ${SCHOOL_INFO.phone} • ${SCHOOL_INFO.email}</div>
            </div>
            <div style="width:64px; text-align:right;">
              ${studentPhotoUrl ? `<img src="${studentPhotoUrl}" class="avatar" />` : ''}
            </div>
          </div>
          <h3 style="text-align:center;">Bulletin Individuel</h3>

          <div class="row">
            <div><strong>Élève:</strong> ${eleve.nom} ${eleve.prenom}</div>
            <div><strong>Matricule:</strong> ${eleve.matricule}</div>
            <div><strong>Classe:</strong> ${eleve.classeId.nom}</div>
            <div><strong>Année:</strong> ${SCHOOL_INFO.academicYear}</div>
            <div><strong>Sexe:</strong> ${eleve.sexe || '-'}</div>
            <div><strong>Date de naissance:</strong> ${eleve.dateNaissance ? new Date(eleve.dateNaissance).toLocaleDateString('fr-FR') : '-'}</div>
          </div>

          <div class="grid-3">
            <div class="card"><strong>Moy. générale:</strong> ${eleve.moyenneGenerale.toFixed(2)}</div>
            <div class="card"><strong>Rang:</strong> ${eleve.rang}</div>
            <div class="card"><strong>Appréciation:</strong> ${eleve.appreciation}</div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Matière</th>
                <th>Coef</th>
                <th>Moyenne</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows || '<tr><td colspan="3" style="text-align:center;">Aucune note</td></tr>'}
            </tbody>
            <tfoot>
              <tr>
                <th colspan="2" style="text-align:right;">Moyenne pondérée</th>
                <th style="text-align:center;">${moyennePonderee}</th>
              </tr>
            </tfoot>
          </table>

          <div class="footer">
            <div><strong>Date:</strong> ${today}</div>
            <div><strong>Préparé par:</strong> ${SCHOOL_INFO.preparedBy}</div>
            <div><strong>Signature:</strong> ______________________</div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="container mx-auto p-4 sm:p-8">

        <div className="mb-4">
          <div className="flex items-start md:items-center justify-between gap-3 flex-col md:flex-row">
            <h1 className="text-2xl md:text-3xl font-extrabold">Résultats des notes</h1>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <button
                onClick={exportCSV}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
              >
                Export CSV
              </button>
              <button
                onClick={exportPDF}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700"
              >
                Export PDF
              </button>
              <button
                onClick={() => navigate('/notes/saisie')}
                className="w-full sm:w-auto px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Saisie des notes
              </button>
              <button
                onClick={() => navigate('/notes')}
                className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Retour aux notes
              </button>
            </div>
          </div>
        </div>

        {/* --- Filtres + recherche --- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom, matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-600">
              <div>
                <label className="block text-sm font-medium mb-1">Classe</label>
                <select name="classeId" value={filters.classeId} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Toutes les classes</option>
                  {uniqueClasses.map(classe => <option key={classe._id} value={classe._id}>{classe.nom}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Statut</label>
                <select name="statut" value={filters.statut} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Tous les statuts</option>
                  <option value="inscrit">Inscrit</option>
                  <option value="reinscrit">Réinscrit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <select name="sexe" value={filters.sexe} onChange={handleFilterChange} className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                  <option value="">Tous les sexes</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* --- Affichage pour les grands écrans (table) --- */}
        {loader ? <h1>Chargement de la liste de notes</h1> : 
        <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="w-full text-left table-auto">
            <thead className={"text-xs uppercase dark:bg-gray-700 dark:text-white bg-gray-50 text-gray-700"}>
              <tr className="bg-gray-200 dark:bg-gray-700 text-sm uppercase">
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Matricule</th>
                <th className="py-3 px-4">Nom & Prénom</th>
                <th className="py-3 px-4">Sexe</th>
                <th className="py-3 px-4">Classe</th>
                {trimestresDetectes.map(trimestre => (
                  <th key={trimestre} className="py-3 px-4 text-center">{trimestre}</th>
                ))}
                <th className="py-3 px-4 text-center">Moy. Générale</th>
                <th className="py-3 px-4 text-center">Rang</th>
                <th className="py-3 px-4 text-center">Appréciation</th>
              </tr>
            </thead>
            <tbody>
              {elevesFiltres.map((eleve) => (
                <tr key={eleve._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="py-3 px-4">
                      <img src={`https://schoolelite.onrender.com${eleve.photo}`} alt={`Photo de ${eleve.prenom}`} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{eleve.matricule}</td>
                  <td className="py-3 px-4 text-sm font-medium">{eleve.nom} {eleve.prenom}</td>
                  <td className="py-3 px-4">{eleve.sexe}</td>
                  <td className="py-3 px-4">{eleve.classeId.nom}</td>
                  {trimestresDetectes.map(trimestre => (
                    <td key={trimestre} className="py-3 px-4 font-bold text-center">
                      {eleve.moyennesTrimestres[trimestre] ? eleve.moyennesTrimestres[trimestre].toFixed(2) : '-'}
                    </td>
                  ))}
                  <td className={`py-3 px-4 font-bold text-center ${getMoyenneColor(eleve.moyenneGenerale)}`}>
                    {eleve.moyenneGenerale.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-bold text-center">{eleve.rang}</td>
                  <td className="py-3 px-4 text-center flex items-center justify-center gap-2">
                    <span>{eleve.appreciation}</span>
                    <button onClick={() => exportBulletin(eleve)} className="px-2 py-1 text-xs rounded bg-gray-600 text-white hover:bg-gray-700">Bulletin</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

        {/* --- Affichage pour les mobiles (cards) --- */}
        {loader ? <h1>Chargement de la liste de notes</h1> : 
        <div className="md:hidden p-4 grid gap-4">
          {elevesFiltres.map(eleve => (
            <div key={eleve._id} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={`https://schoolelite.onrender.com${eleve.photo}`} alt={`Photo de ${eleve.prenom}`} className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{eleve.nom} {eleve.prenom}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{eleve.matricule} • {eleve.classeId.nom}</div>
                </div>
                <button onClick={() => exportBulletin(eleve)} className="text-xs px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-800">Bulletin</button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Moyenne</div>
                  <div className={`text-lg font-bold ${getMoyenneColor(eleve.moyenneGenerale)}`}>{eleve.moyenneGenerale.toFixed(2)}</div>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Rang</div>
                  <div className="text-lg font-bold">{eleve.rang}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${getProgressColorClass(eleve.moyenneGenerale)}`} style={{ width: `${Math.min((eleve.moyenneGenerale / 20) * 100, 100)}%` }}></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {trimestresDetectes.map(trimestre => (
                  <div key={trimestre} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{trimestre}</div>
                    <div className="font-semibold">
                      {eleve.moyennesTrimestres[trimestre] ? eleve.moyennesTrimestres[trimestre].toFixed(2) : '-'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-500 dark:text-gray-400">Appréciation</div>
                <div className={`font-semibold ${appreciationColor(eleve.appreciation)}`}>{eleve.appreciation}</div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default NotesPage;

