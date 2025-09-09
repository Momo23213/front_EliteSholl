import { BrowserRouter} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./ToastProvider";
import Loyout from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { SchoolProvider } from './contexts/SchoolContext';




function App() {
  return (
    <AuthProvider>
    <SchoolProvider>
    <BrowserRouter>
    <ThemeProvider>
      <ToastProvider/>
      <Loyout/>
    </ThemeProvider>
    </BrowserRouter>
    </SchoolProvider>
    </AuthProvider>
  )
}

export default App