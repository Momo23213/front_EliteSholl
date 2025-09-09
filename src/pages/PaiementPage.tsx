
import { DollarSign, GraduationCap, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link,Outlet} from 'react-router-dom'

function PaiementPage() {
  const [titre,setTitre]=useState<string>("Gestion des Frais Scolaires")
  return (
    <div className="mt-10 w-full bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
         {/* En-tête de la page */}
         <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">{titre}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organisez et gérez les informations de vos élèves.</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-end mt-[-5px]">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105" 
            onClick={()=>setTitre("Gestion des Frais Scolaires")}
            >
              <Plus className="w-4 h-4 mr-2" />
              <Link to="fraiScolaire" >
                    Frais de scolarité
              </Link>
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105" 
              onClick={()=>setTitre("Gestion des Depenses")}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              <Link to="depenses">
                 Depenses
              </Link>
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105" 
              onClick={()=>setTitre("Control scolarité")}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              <Link to="ControleScolaire" >
              Contrôle scolarité
              </Link>
            </button>
          </div>
         </div>
         <Outlet/>
    </div>
  )
}

export default PaiementPage