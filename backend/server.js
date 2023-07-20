const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors({
    origin: '*'
  }));

// Configuración de conexión a la base de datos MySQL
const db = mysql.createConnection({
//   host: 'containers-us-west-59.railway.app',
//   user: 'root',
//   password: 'L4Dgxt5yWmkZ5dbRmBaO',
//   database: 'horoscopos'
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'horoscopos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Ruta para guardar datos del formulario
app.post('/guardar-datos', (req, res) => {
  const formData = req.body;

  // Insertar los datos del formulario en la base de datos
  db.query(
    'INSERT INTO recoleccion_datos (pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, pregunta7, pregunta8, pregunta9, pregunta10, pregunta11, pregunta12) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      formData.pregunta1,
      formData.pregunta2,
      formData.pregunta3,
      formData.pregunta4,
      formData.pregunta5,
      formData.pregunta6,
      formData.pregunta7,
      formData.pregunta8,
      formData.pregunta9,
      formData.pregunta10,
      formData.pregunta11,
      formData.pregunta12
    ],
    (err, result) => {
      if (err) {
        console.error('Error al guardar los datos en la base de datos: ', err);
        res.status(500).json({ message: 'Error al guardar los datos en la base de datos' });
      } else {
        console.log('Datos guardados correctamente.');
        res.status(200).json({ message: 'Datos guardados correctamente' });
      }
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
