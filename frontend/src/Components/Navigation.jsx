import { useContext } from "react";
import { FaTachometerAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IsLoginContext } from "../App";

const Navigation = () => {

  const location = useLocation();
  const { setIsLogin } = useContext(IsLoginContext);
  const navigate = useNavigate();

  const linkClass = (path) => {
    const isActive = location.pathname === path;
    return `d-flex align-items-center justify-content-start mb-3 rounded shadow-sm fw-semibold transition 
    ${isActive ? 'bg-gradient text-white bg-primary' : 'hover-bg-light'}`;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLogin(false);
    navigate("/login");
  }


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "220px",
        height: "100vh",
        background: "#1c1c2b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "2rem 1rem",
        boxShadow: "-3px 0 10px rgba(0, 0, 0, 0.3)",
        zIndex: 1000
      }}
    >
      <h5 className="text-white mb-4 ms-1">Surveillance Gaz</h5>

      <Link to="/dashboard" className={`nav-link text-white d-flex align-items-center mb-3 px-3 py-2 w-100 ${linkClass('/dashboard')}`}>
        <FaTachometerAlt className="me-2" /> Dashboard
      </Link>
      <Link to="/chart" className={`nav-link text-white d-flex align-items-center mb-3 px-3 py-2 w-100 ${linkClass('/chart')}`} >
        <FaChartLine className="me-2" /> Chart
      </Link >
      <Link to="/login" onClick={handleClick} className={`nav-link text-white d-flex align-items-center mt-auto px-3 py-2 w-100 ${linkClass('/login')}`} >
        <FaSignOutAlt className="me-2" /> Déconnexion
      </Link>
    </div >
  );
};

export default Navigation;
