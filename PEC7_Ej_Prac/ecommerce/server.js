const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta d'exemple per obtenir articles
app.get('/api/articles', (req, res) => {
    res.json([
        { id: 1, title: "Article 1", content: "Contingut de l'article 1" },
        { id: 2, title: "Article 2", content: "Contingut de l'article 2" }
    ]);
});

// Endpoint de login d'exemple
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        res.json({ token: "fake-jwt-token" });
    } else {
        res.status(401).json({ error: "Credencials incorrectes" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en funcionament a http://localhost:${PORT}`);
});
