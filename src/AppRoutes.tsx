import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./layouts/Nav";
import ClassePage from "./pages/ClassePage";
import StudentsPage from "./pages/StudentsPage";
import DetailEleve from "./pages/DetailEleve";
import PrivateRoute from "./components/ProtegeRoute";
import EnhancedDashboardPage from "./pages/EnhancedDashboardPage";
import NotesPages from "./pages/NotesPages";
import NotesResultats from "./pages/NotesResultats";
import NotesSaisie from "./pages/NotesSaisie";
import TeachersPage from "./pages/TeachersPage";
import SubjectsPage from "./pages/SubjectsPage";
import PaymentsPage from "./pages/PaymentsPage";
import CalendarPage from "./pages/CalendarPage";
import TimetablePage from "./pages/TimetablePage";
function Layout() {
  const location = useLocation();
  const cache = location.pathname === "/login";
  
  return (
    <div>
      {!cache && <Navbar/>}
      <div>
        <Routes>
          <Route path="/eleves/detail/:id" element={<DetailEleve />}/>
          <Route path="/eleves" element={<StudentsPage />}></Route>
          <Route path="/notes" element={<PrivateRoute> <NotesPages /></PrivateRoute> }/>
          <Route path="/notes/resultats" element={<PrivateRoute> <NotesResultats /></PrivateRoute> }/>
          <Route path="/notes/saisie" element={<PrivateRoute> <NotesSaisie /></PrivateRoute> }/>
          <Route path="/classes" element={<PrivateRoute> <ClassePage /></PrivateRoute> }/>
          <Route path="/enseignants" element={<PrivateRoute> <TeachersPage /></PrivateRoute> }/>
          <Route path="/matieres" element={<PrivateRoute> <SubjectsPage /></PrivateRoute> }/>
          <Route path="/paiements" element={<PrivateRoute> <PaymentsPage /></PrivateRoute> }/>
          <Route path="/calendrier" element={<PrivateRoute> <CalendarPage /></PrivateRoute> }/>
          <Route path="/emploi-du-temps" element={<PrivateRoute> <TimetablePage /></PrivateRoute> }/>
          <Route path="/" element={<PrivateRoute> <EnhancedDashboardPage /></PrivateRoute> }/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </div>
  );
}

export default Layout;