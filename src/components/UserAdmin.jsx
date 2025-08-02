import React, { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UserAdmin() {
  const [editingUser, setEditingUser] = useState(null);
  const [reload, setReload] = useState(false);

  const handleUserSaved = () => {
    setEditingUser(null); // limpiar edición
    setReload((prev) => !prev); // forzar recarga de lista
  };

  return (
    <div className="container mt-4">
      <h2>Administración de Usuarios</h2>

      {/* Formulario */}
      <div className="mb-4">
        <UserForm
          user={editingUser}
          onSaved={handleUserSaved}
          onCancel={() => setEditingUser(null)}
        />
      </div>

      {/* Lista */}
      <UserList onEdit={setEditingUser} reload={reload} />
    </div>
  );
}