import React, { useEffect, useState } from 'react';
import * as api from '../api/partNumbersApi';

const PartNumberList = ({ onEdit, reload }) => {
  const [partNumbers, setPartNumbers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.getAll();
      setPartNumbers(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError('Error al obtener los datos');
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  // 🔍 Filtro de texto
  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    let result = [...partNumbers];

    if (text) {
      result = result.filter(
        (pn) =>
          pn.partNumber.toLowerCase().includes(text) ||
          pn.description.toLowerCase().includes(text)
      );
    }

    // Aplicar ordenamiento
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key].toLowerCase();
        const valB = b[sortConfig.key].toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFiltered(result);
  }, [searchText, partNumbers, sortConfig]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este Numero de Parte?')) {
      await api.remove(id);
      fetchData();
    }
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        return { key, direction: 'asc' };
      }
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  };

  return (
    <div>
      <h2 className="mb-3">Lista de Numeros de Parte</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Campo de búsqueda */}
      <div className="mb-3">
        <input type="text" placeholder="Buscar por Numero de Parte o Descripción..." className="form-control" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
      </div>

      {/* Tabla con ordenamiento */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              Numero de Parte{' '}
              <button className="btn btn-sm btn-link" onClick={() => toggleSort('partNumber')}>
                {getSortIcon('partnumber')}
              </button>
            </th>
            <th>
              Descripción{' '}
              <button className="btn btn-sm btn-link" onClick={() => toggleSort('description')}>
                {getSortIcon('description')}
              </button>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((pn) => (
              <tr key={pn.id}>
                <td>{pn.partNumber}</td>
                <td>{pn.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(pn)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(pn.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No se encontraron resultados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PartNumberList;
