const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // Importa el paquete mysql2 para la conexión a MySQL
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
const pool = mysql.createPool({
  host: "localhost",          // Cambia según tu configuración
  user: "root",         // Usuario de la base de datos
  password: "123456",  // Contraseña de la base de datos
  database: "validation", // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
/**
 * API POST: Registrar usuario
 * Recibe en el body: username, password, email, birthDate, fullName.
 * - Valida que todos los campos estén completos.
 * - Verifica que el username o el email no existan ya en la tabla.
 * - Si no existen, inserta el nuevo usuario en la tabla.
 * - Después de insertar, realiza un SELECT de todos los usuarios y los muestra por consola.
 */
app.post("/register", (req, res) => {
  const { username, password, email, birthDate, fullName } = req.body;
  if (!username || !password || !email || !birthDate || !fullName) {
    return res.status(400).json({ statusCode: 400, message: "Todos los campos son obligatorios" });
  }
  // Consulta para verificar si el usuario o email ya existen
  pool.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ statusCode: 500, message: "Error en la consulta" });
      }
      if (results.length > 0) {
        return res.status(409).json({ statusCode: 409, message: "El usuario o email ya existen" });
      }
      // Inserta el nuevo usuario en la tabla
      pool.query(
        "INSERT INTO users (username, password, email, birthDate, fullName) VALUES (?, ?, ?, ?, ?)",
        [username, password, email, birthDate, fullName],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ statusCode: 500, message: "Error al registrar usuario" });
          }
          // Selecciona todos los usuarios y los muestra en consola (para verificar al menos 10 registros)
          pool.query("SELECT * FROM users", (err, allUsers) => {
            if (err) {
              console.error("Error al recuperar usuarios:", err);
            } else {
              console.log("Usuarios registrados:", allUsers);
            }
          });
          return res.status(201).json({ 
            statusCode: 201, 
            message: "Registro exitoso", 
            data: { username, password, email, birthDate, fullName } 
          });
        }
      );
    }
  );
});

/**
 * API GET: Validar credenciales (Login)
 * Se esperan las credenciales en los headers: user y password.
 * Realiza una consulta para buscar un usuario que coincida con el username y la contraseña.
 * Si lo encuentra, devuelve un JSON con los datos del usuario; de lo contrario, retorna error 401.
 */
app.get("/validate", (req, res) => {
  const user = req.headers["user"];
  const password = req.headers["password"];

  pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [user, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ statusCode: 500, message: "Error en la consulta" });
      }
      if (results.length > 0) {
        return res.status(200).json({ statusCode: 200, message: "Login exitoso", data: results[0] });
      } else {
        return res.status(401).json({ statusCode: 401, message: "Credenciales incorrectas" });
      }
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
