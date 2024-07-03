const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
app.use(express.json());

app.post('/guardar-resultado', (req, res) => {
    const { numeroPregunta, acertada } = req.body;
    const usuario = os.userInfo().username;
    const fecha = new Date().toISOString();
    const resultado = `${usuario},${fecha},${numeroPregunta},${acertada ? 'Acertada' : 'Fallada'}\n`;

    fs.appendFile(path.join(__dirname, 'resultados.csv'), resultado, (err) => {
        if (err) {
            console.error('Error al guardar el resultado:', err);
            res.status(500).send('Error al guardar el resultado');
        } else {
            res.status(200).send('Resultado guardado correctamente');
        }
    });
});

app.post('/guardar-resultado-final', (req, res) => {
    const { puntuacionFinal } = req.body;
    const usuario = os.userInfo().username;
    const fecha = new Date().toISOString();
    const resultado = `${usuario},${fecha},Resultado Final,${puntuacionFinal}\n`;

    fs.appendFile(path.join(__dirname, 'resultados.csv'), resultado, (err) => {
        if (err) {
            console.error('Error al guardar el resultado final:', err);
            res.status(500).send('Error al guardar el resultado final');
        } else {
            res.status(200).send('Resultado final guardado correctamente');
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});