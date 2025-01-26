const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let articles = [
    { id: 1, title: "Article 1", content: "Contingut de l'article 1" },
    { id: 2, title: "Article 2", content: "Contingut de l'article 2" }
];

//Endpoint per obtenir articles (GET)
app.get('/api/articles', (req, res) => {
    res.json(articles);
});

//Endpoint per afegir un article (POST)
app.post('/api/articles', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: "Falten camps obligatoris" });
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        content
    };
    
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "SECRET") {
        return res.json({ message: "Login correcto" });
    } else {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }
});


//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en marxa a http://localhost:${PORT}`);
});
