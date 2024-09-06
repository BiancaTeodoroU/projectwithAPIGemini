// Importação do GoogleGenerativeAI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch da sua API_KEY
const API_KEY = "AIzaSyAkSOHC_2zETzuXGBfX6Ihgo6fwTklK4Bw"; // Substitua pela sua chave de API

const genAI = new GoogleGenerativeAI(API_KEY);

// Função de geração de conteúdo
async function gerarConteudo(symptomName) {
    try {
        // Obtém o modelo do Google Generative AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Forneça informações detalhadas sobre o sintoma "${symptomName}" e possíveis doenças relacionadas.`;

        // Chama a API para gerar o conteúdo com o prompt fornecido
        const result = await model.generateContent(prompt);

        // Retorna o conteúdo gerado pela API
        return {
            resultadoIA: result.response.text(), // Conteúdo gerado pela API
            advertencia: "Desculpe, mas não posso fornecer aconselhamento médico. Se você estiver com sintomas, procure um profissional de saúde."
        };
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
        throw new Error('Ocorreu um erro ao tentar gerar o conteúdo.');
    }
}

// Log de carregamento do arquivo
console.log('carregou');

// Adiciona um evento de click ao botão de pesquisa
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;

    // Verifica se o campo de busca está vazio
    if (!searchTerm) {
        alert('Por favor, insira um sintoma para pesquisar.');
        return;
    }

    // Faz a requisição à função gerarConteudo
    try {
        const data = await gerarConteudo(searchTerm);

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
