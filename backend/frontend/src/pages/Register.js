import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    birthDate: "",
    fullName: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/\s/.test(value)) return; // No permitir espacios
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(formData.email)) {
      setError("El correo no es válido");
      return;
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      setError("La contraseña debe contener al menos una letra y un número");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/register", formData);
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error en el registro");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">Registrarse</Button>
        </Form>
        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card>
    </Container>
  );
};
export default Register;
