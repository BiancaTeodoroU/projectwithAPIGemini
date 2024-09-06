
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Fetch your API_KEY
// const API_KEY = "AIzaSyAkSOHC_2zETzuXGBfX6Ihgo6fwTklK4Bw";

// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Febre";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

console.log('carregoou')

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;

    // Verifica se o campo de busca está vazio
    if (!searchTerm) {
        alert('Por favor, insira um sintoma para pesquisar.');
        return;
    }

    // Faz a requisição ao backend
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptomName: searchTerm })
        });

        // Verifique se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados do servidor.');
        }

        // Tenta converter a resposta em JSON
        const data = await response.json();

        // Exibe o resultado e a advertência
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div>
                <h3>Resultado para "${searchTerm}"</h3>
                <p>Informações adicionais: ${data.resultadoIA}</p>
                <p><strong>Aviso:</strong> ${data.advertencia}</p>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao obter informações:', error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<p>Ocorreu um erro ao buscar as informações. Tente novamente mais tarde.</p>';
    }
});