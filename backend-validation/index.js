const express = require('express');
const app = express();
const port = 3000;

//ponemos el usuario y la password definidas estaticas
const validUser = 'Guscz1010';
const validPassword = '123456';

app.get('/validate', (req, res) => {
  const user = req.headers['user'];
  const password = req.headers['password'];

  if (user === validUser && password === validPassword) {
    res.status(200).json({
      statusCode: 200,
      intMessage: 'Operation Successful',
      data: {
        message: 'Welcome! Your credentials are valid.',
      },
    });
  } else {
    res.status(401).json({
      statusCode: 401,
      intMessage: 'Invalid credentials',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // sera el puerto 300n
});
