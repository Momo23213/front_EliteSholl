import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./layouts/Nav";
import ClassePage from "./pages/admin/ClassePage";
import StudentsPage from "./pages/admin/StudentsPage";
import DetailEleve from "./pages/admin/DetailEleve";
import PrivateRoute from "./components/ProtegeRoute";
import EnhancedDashboardPage from "./pages/admin/EnhancedDashboardPage";
import NotesPages from "./pages/admin/NotesPages";
import NotesResultats from "./pages/admin/NotesResultats";
import NotesSaisie from "./pages/admin/NotesSaisie";
import TeachersPage from "./pages/admin/TeachersPage";
import SubjectsPage from "./pages/admin/SubjectsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import CalendarPage from "./pages/admin/CalendarPage";
import TimetablePage from "./pages/admin/TimetablePage";
import ControlePaiement from "./pages/admin/ControlePaiement";
import FraiScolairePage from "./pages/admin/FraisScolairePage";
import EleveDashboard from "./pages/eleves/Dashbord";
import TeacherDashboard from "./pages/enseignant/Dashbord";
function Layout() {
  const location = useLocation();
  const cache = location.pathname === "/";
  
  return (
    <div>
      {!cache && <Navbar/>}
      <div>
      <Routes>
  {/* Public */}
  <Route path="/" element={<Login />} />

  {/* Admin */}
  <Route path="/admin/dashboard" element={
    <PrivateRoute roles={["admin"]}><EnhancedDashboardPage /></PrivateRoute>
  }/>
  <Route path="/eleves" element={
    <PrivateRoute roles={["admin"]}><StudentsPage /></PrivateRoute>
  }/>
  <Route path="/classes" element={
    <PrivateRoute roles={["admin"]}><ClassePage /></PrivateRoute>
  }/>
  <Route path="/enseignants" element={
    <PrivateRoute roles={["admin"]}><TeachersPage /></PrivateRoute>
  }/>
  <Route path="/matieres" element={
    <PrivateRoute roles={["admin"]}><SubjectsPage /></PrivateRoute>
  }/>
  <Route path="/notes" element={
    <PrivateRoute roles={["admin"]}><NotesPages /></PrivateRoute>
  }/>
  <Route path="/notes/resultats" element={
    <PrivateRoute roles={["admin"]}><NotesResultats /></PrivateRoute>
  }/>
  <Route path="/notes/saisie" element={
    <PrivateRoute roles={["admin", "enseignant"]}><NotesSaisie /></PrivateRoute>
  }/>
  <Route path="/paiements" element={
    <PrivateRoute roles={["admin", "eleve"]}><PaymentsPage /></PrivateRoute>
  }/>
  <Route path="/fraiScolaire" element={
    <PrivateRoute roles={["admin"]}><FraiScolairePage /></PrivateRoute>
  }/>
  <Route path="/controleScolaire" element={
    <PrivateRoute roles={["admin"]}><ControlePaiement /></PrivateRoute>
  }/>
  <Route path="/calendrier" element={
    <PrivateRoute roles={["admin", "eleve", "enseignant"]}><CalendarPage /></PrivateRoute>
  }/>
  <Route path="/emploi-du-temps" element={
    <PrivateRoute roles={["admin", "eleve", "enseignant"]}><TimetablePage /></PrivateRoute>
  }/>
  <Route path="/eleves/detail/:id" element={
    <PrivateRoute roles={["admin"]}><DetailEleve /></PrivateRoute>
  }/>

  {/* Enseignant */}
  <Route path="/teacher/dashboard" element={
    <PrivateRoute roles={["enseignant"]}><TeacherDashboard /></PrivateRoute>
  }/>

  {/* Élève */}
  <Route path="/eleve/dashboard" element={
    <PrivateRoute roles={["eleve"]}><EleveDashboard /></PrivateRoute>
  }/>
</Routes>
      </div>
    </div>
  );
}

export default Layout;