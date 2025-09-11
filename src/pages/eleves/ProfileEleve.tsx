import axios from 'axios';
import { useEffect, useState } from 'react'
import { useAuth } from "../../contexts/AuthContext";

interface Classe {
    _id: string;
    nom: string;
    niveau?: string;
  }
  
  interface Parcours {
    _id: string;
    classeId: Classe;
    anneeScolaireId?: { _id: string; libelle: string };
    dateInscription: string;
    dateSortie?: string;
    typeInscription: string;
  }
interface Eleve {
    _id: string;
    matricule: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    lieuNaissance: string;
    sexe: string;
    classeId: Classe;
    parcours: Parcours[];
    statut: string;
    photo?: string;
  }
  

function ProfileEleve() {
      const { user } = useAuth();
      const [eleve, setEleve] = useState<Eleve | null>(null);

    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const eleveRes= await axios.get(`http://localhost:3002/api/eleves/${user.id}`);
    
            setEleve(eleveRes.data);
          } catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      }, [user.id]);
    
      if (!eleve) return <p className="p-4">Chargement...</p>;
  return (
    <div className='dark:text-white flex justify-center items-center'>
        <div className="flex flex-col md:flex-row items-center justify-center w-[500px] md:items-start md:space-x-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow">
        {eleve.photo && (
          <img
            src={`http://localhost:3002${eleve.photo}`}
            alt="photo élève"
            className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0"
          />
        )}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{eleve.nom} {eleve.prenom}</h1>
          <p>Matricule : {eleve.matricule}</p>
          <p>Classe actuelle : {eleve.classeId.nom}</p>
          <p>Statut : {eleve.statut}</p>
          <p>Sexe : {eleve.sexe}</p>
          <p>Date de naissance : {new Date(eleve.dateNaissance).toLocaleDateString("fr-FR")}</p>
          <p>Lieu de naissance : {eleve.lieuNaissance}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileEleve