import React, { useState } from "react";
import validator from "validator";
import "./FormValidation.css";

const FormValidation = () => {
  const [formData, setFormData] = useState({
    user: "",
    alterUser: "",
    alphanumeric: "",
    email: "",
    password: "",
    number: "",
    fixedLength: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const transformedValue = transformInput(name, value);
    setFormData({ ...formData, [name]: transformedValue });

    validateInput(name, transformedValue);
  };

  const transformInput = (name, value) => {
    if (name === "user") {
      return value.toLowerCase().replace(/\s+/g, "").slice(0, 10);
    }
    if (name === "alterUser") {
      return value.toUpperCase().replace(/\s+/g, "").slice(0, 8);
    }
    if (name === "alphanumeric") {
      return value.slice(0, 8);
    }
    return value;
  };

  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "user":
        newErrors.user =
          value && value.length <= 10 && !/\s/.test(value)
            ? ""
            : "Máximo 10 caracteres y sin espacios";
        break;
      case "alterUser":
        newErrors.alterUser =
          value && /^[A-Z]+$/.test(value) && value.length <= 8
            ? ""
            : "Solo mayúsculas, máximo 8 caracteres y sin espacios";
        break;
      case "alphanumeric":
        newErrors.alphanumeric =
          value &&
          value.length === 8 &&
          /[a-zA-Z]/.test(value) &&
          /\d/.test(value)
            ? ""
            : "Debe contener números y letras, y tener exactamente 8 caracteres";
        break;
      case "email":
        newErrors.email = validator.isEmail(value) ? "" : "Correo inválido";
        break;
      case "password":
        newErrors.password =
          value.length >= 6 ? "" : "Contraseña debe tener al menos 6 caracteres";
        break;
      case "number":
        newErrors.number = validator.isNumeric(value)
          ? ""
          : "Solo se permiten números";
        break;
      case "fixedLength":
        newErrors.fixedLength =
          value.length === 8 ? "" : "Debe tener exactamente 8 caracteres";
        break;
      default:
        break;
    }

    setErrors(newErrors);

    const isValid =
      Object.values(newErrors).every((error) => error === "") &&
      Object.values(formData).every((field) => field !== "");
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const getInputClass = (name) => {
    if (!formData[name]) {
      return "input-default";
    }
    return errors[name] ? "input-error" : "input-valid";
  };

  return (
    <div className="form-container">
      <h1>Formulario de Validación - Gustavo Cruz Zárraga</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario (máximo 10 caracteres):</label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className={getInputClass("user")}
          />
          {errors.user && <span className="error">{errors.user}</span>}
        </div>
        <div>
          <label>Alter Usuario (máximo 8 caracteres):</label>
          <input
            type="text"
            name="alterUser"
            value={formData.alterUser}
            onChange={handleChange}
            className={getInputClass("alterUser")}
          />
          {errors.alterUser && <span className="error">{errors.alterUser}</span>}
        </div>
        <div>
          <label>Campo Alfanumérico (8 caracteres):</label>
          <input
            type="text"
            name="alphanumeric"
            value={formData.alphanumeric}
            onChange={handleChange}
            className={getInputClass("alphanumeric")}
          />
          {errors.alphanumeric && <span className="error">{errors.alphanumeric}</span>}
        </div>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClass("email")}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={getInputClass("password")}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label>Solo Números:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className={getInputClass("number")}
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </div>
        <div>
          <label>Campo de 8 Caracteres:</label>
          <input
            type="text"
            name="fixedLength"
            value={formData.fixedLength}
            onChange={handleChange}
            className={getInputClass("fixedLength")}
          />
          {errors.fixedLength && (
            <span className="error">{errors.fixedLength}</span>
          )}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Enviar
        </button>
      </form>
      {showModal && (
        <div className="modal">
          <p>Formulario válido. ¡Gracias!</p>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default FormValidation;
