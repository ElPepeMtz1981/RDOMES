import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PartNumberList from './components/PartNumberList';
import PartNumberForm from './components/PartNumberForm';
import MyLocation from './components/MyLocation';
import Login from './components/Login';
import UserAdmin from './components/UserAdmin';

function AppContent() {
  const [editingPart, setEditingPart] = useState(null);
  const [reload, setReload] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('jwtToken');
  const isAuthenticated = !!token;

  // Rutas donde el navbar no debe mostrarse
  const hiddenRoutes = ['/rdoxmes/login', '/login'];
  const hideNavbar = hiddenRoutes.includes(location.pathname);

  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      {isAuthenticated && !hideNavbar && (
        <nav className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link" to="/">Numeros de Parte</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Assys">Ensambles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Users">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/WHInventory">Almacen</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/WIP">Produccion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Reports">Reportes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MyLocation">Ubicacion</Link>
            </li>
            <li className="nav-item ms-auto">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <PrivateRoute>
            <>
              <h1 className="text-center mb-4">Gestión de Número de Partes</h1>
              <PartNumberForm
                editing={editingPart}
                onSuccess={() => {
                  setEditingPart(null);
                  setReload(!reload);
                }}
              />
              <hr />
              <PartNumberList onEdit={setEditingPart} reload={reload} />
            </>
          </PrivateRoute>
        } />
        
        <Route path="/Users" element={
          <PrivateRoute>
            <UserAdmin />
          </PrivateRoute>
        } />
    
        <Route path="/MyLocation" element={<PrivateRoute><MyLocation /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default AppContent;