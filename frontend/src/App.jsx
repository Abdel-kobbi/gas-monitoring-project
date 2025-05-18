import Dashboard from "./Pages/Dashboard"
import Navigation from "./Components/Navigation"
import { Routes, Route, Navigate } from "react-router-dom"
import Chart from "./Pages/Chart";
import Login from "./Pages/Login";
import { useLocation } from "react-router-dom";
import { createContext, useState } from "react";

export const IsLoginContext = createContext(null);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  return (
    <IsLoginContext.Provider value={{ isLogin, setIsLogin }}>
      {location.pathname !== "/login" && <Navigation />}
      <Routes>
        <Route path='/' element={<Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" index element={<Dashboard />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </IsLoginContext.Provider>
  )
}

export default App
