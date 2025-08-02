import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api/usersApis";
import { useLocation } from "react-router-dom";

const UserList = ({ onEdit,reload }) => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
/*   const [reload, setReload] = useState(false);

  const location = useLocation(); */

  const fetchData = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError("Error al obtener los usuarios");
    }
  };

  // ✅ Recarga la lista cuando reload cambia
  useEffect(() => {
    fetchData();
  }, [reload]);

  // ✅ Filtrado por texto
  useEffect(() => {
    const text = searchText.trim().toLowerCase();
    let result = [...users];

    if (text) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(text) ||
          u.userName.toLowerCase().includes(text)
      );
    }

    setFiltered(result);
  }, [searchText, users]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      try {
        await deleteUser(id);
        await fetchData(); // Actualiza la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Hubo un problema al eliminar el usuario.");
      }
    }
  };

  return (
    <div>
      <h2 className="mb-3">Lista de Usuarios</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre o usuario..."
          className="form-control"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.userName}</td>
                <td>{u.rol}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(u)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;