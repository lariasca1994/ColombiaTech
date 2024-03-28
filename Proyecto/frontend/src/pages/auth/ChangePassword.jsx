import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar la lógica de cambio de contraseña
    console.log("Enviando solicitud de cambio de contraseña...");
    // Simular un cambio de contraseña exitoso
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>Cambiar contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Contraseña actual</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="newPassword">Nueva contraseña</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;