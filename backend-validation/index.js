const express = require("express"); 
const app = express(); 
const port = 3000; 
app.use(express.json());

//bd simulada
let users = [];

// api registro
app.post("/register", (req, res) => {
  //guardar datos
  const { username, password, email, birthDate, fullName } = req.body;

  //verificar
  if (!username || !password || !email || !birthDate || !fullName) {
    return res.status(400).json({
      statusCode: 400,
      intMessage: "Todos los campos son obligatorios",
    });
  }

  //comprobar campos
  const userExists = users.some((user) => user.username === username);
  const emailExists = users.some((user) => user.email === email);

  if (userExists || emailExists) {
    return res.status(409).json({
      statusCode: 409,// existe
      intMessage: "El usuario o email ya existen en el sistema",
    });
  }

  // so no existe
  const newUser = { username, password, email, birthDate, fullName };
  users.push(newUser); //almacena

  return res.status(201).json({
    statusCode: 201,
    intMessage: "Usuario registrado exitosamente",
    data: newUser,
  });
});

//login
app.get("/validate", (req, res) => {
  
  const user = req.headers["user"];
  const password = req.headers["password"];

  // busca la credenciales
  const foundUser = users.find(
    (u) => u.username === user && u.password === password
  );

  if (foundUser) {
    return res.status(200).json({
      statusCode: 200,
      intMessage: "Operation Successful",
      data: {
        message: "Welcome! Your credentials are valid.",
        user: {
          username: foundUser.username,
          email: foundUser.email,
          birthDate: foundUser.birthDate,
          fullName: foundUser.fullName,
        },
      },
    });
  } else {
    return res.status(401).json({
      statusCode: 401,
      intMessage: "Invalid credentials",
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
