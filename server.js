const express = require('express');
const path = require('path'); 
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public')); 

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
