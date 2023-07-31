const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const json2csv = require('json2csv').Parser;
const fs = require('fs');

const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors({ origin: '*' }));

// Configuración de conexión a la base de datos MySQL
const dbPool = mysql.createPool({
  host: 'containers-us-west-59.railway.app',
  user: 'root',
  password: 'L4Dgxt5yWmkZ5dbRmBaO',
  database: 'horoscopos',
  port: '7440',
  connectionLimit: 10, // Número máximo de conexiones en la pool
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// guardar datos del formulario
app.post('/guardar-datos', (req, res) => {
  const formData = req.body;

  // Tomar una conexión de la pool
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión de la pool: ', err);
      res.status(500).json({ message: 'Error al obtener la conexión de la pool' });
      return;
    }

    // Insertar los datos del formulario en la base de datos
    connection.query(
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
        formData.pregunta12,
      ],
      (err, result) => {
        // Liberar la conexión de la pool después de completar la operación
        connection.release();

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
});

app.get('/consultar-datos', (req, res) => {
  // Tomar una conexión de la pool
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión de la pool: ', err);
      res.status(500).json({ message: 'Error al obtener la conexión de la pool' });
      return;
    }

    // Consultar los datos en la base de datos
    connection.query('SELECT * FROM recoleccion_datos', (err, result) => {
      // Liberar la conexión de la pool después de completar la operación
      connection.release();

      if (err) {
        console.error('Error al consultar los datos en la base de datos: ', err);
        res.status(500).json({ message: 'Error al consultar los datos en la base de datos' });
      } else {
        console.log('Consulta correcta.');
        res.status(200).json({ data: result });
      }
    });
  });
});

app.get('/export-csv', (req, res) => {
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión de la pool: ', err);
      res.status(500).json({ message: 'Error al obtener la conexión de la pool' });
      return;
    }

    connection.query('SELECT * FROM recoleccion_datos', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error al obtener los datos de la base de datos: ', err);
        res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
      } else {
        const fields = [
          'id',
          'pregunta1',
          'pregunta2',
          'pregunta3',
          'pregunta4',
          'pregunta5',
          'pregunta6',
          'pregunta7',
          'pregunta8',
          'pregunta9',
          'pregunta10',
          'pregunta11',
          'pregunta12',
        ];
        const json2csvParser = new json2csv({ fields });
        const csv = json2csvParser.parse(results);

        res.setHeader('Content-Disposition', 'attachment; filename=datos_formulario.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
      }
    });
  });
});

app.get('/export-json', (req, res) => {
  dbPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión de la pool: ', err);
      res.status(500).json({ message: 'Error al obtener la conexión de la pool' });
      return;
    }

    connection.query('SELECT * FROM recoleccion_datos', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error al obtener los datos de la base de datos: ', err);
        res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
      } else {
        const jsonData = JSON.stringify(results);

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=datos_formulario.json');

        res.send(jsonData);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
