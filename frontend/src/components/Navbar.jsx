import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="navbar">
      {/* LEFT SIDE */}
      <div className="nav-left">
        {token && <Link to="/dashboard">Dashboard</Link>}

        {/* ✅ ADMIN LINK GOES HERE */}
        {role === "admin" && <Link to="/admin">Admin</Link>}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        {token && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}
