import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState,useEffect  } from 'react';
import PartNumberList from './components/PartNumberList';
import PartNumberForm from './components/PartNumberForm';
import OtraAPI from './components/OtraAPI'; // 👈 tu otro componente/API
import MyLocation from './components/MyLocation';

function App() {
  const [editingPart, setEditingPart] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
      document.title = 'RDOX MES';
    }, [])

    return (
      <Router basename="/rdoxmes">
        <div className="container mt-4">
          <nav className="mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link" to="/">Numeros de Parte</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Assys">Ensambles</Link>
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
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={
              <>
                <h1 className="text-center mb-4">Gestión de Número de Partes</h1>
                <PartNumberForm editing={editingPart} 
                    onSuccess={() => {
                    setEditingPart(null);
                    setReload(!reload);
                  }}
                />

                <hr />

                <PartNumberList onEdit={setEditingPart} reload={reload} />
              </>
            } />
            <Route path="/otra-api" element={<OtraAPI />} />
            <Route path="/MyLocation" element={<MyLocation />} />
          </Routes>
        </div>
        </Router>
  );
}

export default App;