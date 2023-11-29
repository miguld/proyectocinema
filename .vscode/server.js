const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Agregamos CORS para permitir solicitudes desde cualquier origen

app.post('/registro', (req, res) => {
    const datosRegistro = req.body;
    console.log('Datos de registro:', datosRegistro);

    // Enviamos una respuesta al cliente
    res.json({ mensaje: 'Registro exitoso', datos: datosRegistro });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
