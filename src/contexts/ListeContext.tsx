import { useSchool } from "./context/SchoolContext";

export default function EleveList() {
  const { eleves, classes, annees } = useSchool();

  return (
    <div>
      <h2>Liste des élèves</h2>
      <ul>
        {eleves.map((e) => {
          const classe = classes.find((c) => c._id === e.classeId)?.nom;
          const annee = annees.find((a) => a._id === e.anneeId)?.libelle;
          return (
            <li key={e._id}>
              {e.nom} - Classe: {classe} - Année: {annee}
            </li>
          );
        })}
      </ul>
    </div>
  );
}



import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <a href="/">Accueil</a>
      <a href="/dashboard">Dashboard</a>
      {user ? (
        <>
          <span>Bienvenue {user.nom}</span>
          <button onClick={logout}>Se déconnecter</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}

export default Navbar;