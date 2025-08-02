import React, { useState, useEffect } from 'react';
import * as api from '../api/partNumbersApi';

const PartNumberForm = ({ editing, onSuccess }) => {
  const [partNumber, setPartNumber] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editing) {
      setPartNumber(editing.partNumber);
      setDescription(editing.description);
    } else {
      setPartNumber('');
      setDescription('');
    }
    setError(null);
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { partNumber, description };

    try {
      if (editing) {
        await api.update(editing.id, { ...data, id: editing.id });
      } else {
        console.log('Creating new part number:', data);
        await api.create(data);
      }
      setPartNumber('');
      setDescription('');
      setError(null);
      onSuccess();
    } catch (err) {
      setError(err.response?.data || 'Error en la operación');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        {editing ? 'Editar Numero de Parte' : 'Agregar Numero de Parte'}
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Numero de Parte</label>
            <input
              type="text"
              className="form-control"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {editing ? 'Actualizar' : 'Agregar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PartNumberForm;
