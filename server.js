const express = require('express');
const path = require('path'); // Importa o módulo 'path' para facilitar o trabalho com caminhos de arquivos
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve o 'index.html' localizado no diretório raiz do projeto
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
