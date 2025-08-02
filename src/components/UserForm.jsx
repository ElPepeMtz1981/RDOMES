import React, { useEffect, useState } from "react";
import { createUser, updateUser, getAllRoles } from "../api/usersApis";

export default function UserForm({ user, onSaved, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    fkIdRol: "",
    password: "",
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(user);

  // Cargar roles y datos del usuario si está en edición
  useEffect(() => {
    getAllRoles()
      .then((res) => setRoles(res.data))
      .catch(() => setError("Error al cargar roles"));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        userName: user.userName || "",
        fkIdRol: user.fkIdRol || "",
        password: "", // No se muestra la contraseña en edición
      });
    } else {
      setFormData({
        name: "",
        userName: "",
        fkIdRol: "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isEditing) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }

      setFormData({
        name: "",
        userName: "",
        fkIdRol: "",
        password: "",
      });

      onSaved(); // ✅ Notifica al padre para recargar lista
    } catch (err) {
      console.error(err);
      setError("Error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Rol</label>
          <select
            name="fkIdRol"
            className="form-select"
            value={formData.fkIdRol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.rol}
              </option>
            ))}
          </select>
        </div>

        {!isEditing && (
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}