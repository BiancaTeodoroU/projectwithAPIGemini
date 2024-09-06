const express = require('express');
const path = require('path'); // Importa o módulo 'path' para facilitar o trabalho com caminhos de arquivos
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = 3001;

const API_KEY = "AIzaSyAkSOHC_2zETzuXGBfX6Ihgo6fwTklK4Bw";

const genAI = new GoogleGenerativeAI({
    apiKey: API_KEY
});

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve o 'index.html' localizado no diretório raiz do projeto
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// const API_KEY = 'AIzaSyAkSOHC_2zETzuXGBfX6Ihgo6fwTklK4Bw';
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// app.post('/', async (req, res) => {
//     const { sintoma } = req.body;

//     if (!sintoma) {
//         return res.status(400).json({ error: 'Por favor, insira um sintoma.' });
//     }

//     try {
//         const prompt = `Forneça informações sobre o sintoma "${sintoma}".`;
//         const result = await model.generateContent(prompt);
//         const response = result.response.text();

//         // Adicione aqui qualquer formatação ou tratamento da resposta
//         const formattedResponse = `**Possíveis causas e informações sobre "${sintoma}":**\n${response}\n\n**Disclaimer:** Este é um serviço informativo e não substitui uma consulta médica.`;

//         res.json({ response: formattedResponse });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Ocorreu um erro ao processar sua solicitação.' });
//     }
// });