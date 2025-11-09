import LoginPage from "./pages/LoginPage.jsx";
import DashboarPage from "./pages/DashboardPage.jsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboarPage />} />
      </Routes>
    </div>
  );
};

export default App;
