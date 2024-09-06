// Importação do GoogleGenerativeAI
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch da sua API_KEY
const API_KEY = "chave_api"; // Substitua pela sua chave de API

const genAI = new GoogleGenerativeAI(API_KEY);

// Função de geração de conteúdo
async function gerarConteudo(symptomName) {
    try {
        // Obtém o modelo do Google Generative AI
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Forneça informações detalhadas sobre o sintoma "${symptomName}" e possíveis doenças relacionadas. Não mencione como tratar o sintoma`;

        // Chama a API para gerar o conteúdo com o prompt fornecido
        const result = await model.generateContent(prompt);

        // Retorna o conteúdo gerado pela API
        return {
            resultadoIA: result.response.text(), // Conteúdo gerado pela API
        };
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
        throw new Error('Ocorreu um erro ao tentar gerar o conteúdo.');
    }
}

// Função para converter markdown em HTML básico
function formatarResultadoMarkdown(textoMarkdown) {
    let formattedText = textoMarkdown
        .replace(/(?:\r\n|\r|\n)/g, '<br>') // Quebras de linha
        .replace(/##\s(.+?)(<br>|$)/g, '<h2>$1</h2>') // Remove ## e transforma em <h2>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Remove ** e transforma em <strong>
        .replace(/\*(.+?)\*/g, '<em>$1</em>') // Remove * e transforma em <em>
        .replace(/<li>([^<]+):<\/li>\s*([^<]+)<br>/g, '<li><strong>$1:</strong> $2</li>') // Ajustar conteúdo das <li>
        .replace(/- (.+):/g, '<li><strong>$1:</strong>') // Transformar títulos de listas
        .replace(/<\/li><br>/g, '</li>') // Remover quebras de linha extras
        .replace(/<br><ul>/g, '<ul>') // Evitar quebra de linha antes de listas
        .replace(/<\/ul><br>/g, '</ul>') // Evitar quebra de linha depois de listas
        .replace(/<ul>/g, '<ul class="o-list">'); // Adiciona classe CSS a <ul>
    return formattedText;
}

document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;

    if (!searchTerm) {
        alert('Por favor, insira um sintoma para pesquisar.');
        return;
    }

    try {
        const data = await gerarConteudo(searchTerm);
        
        const resultsDiv = document.getElementById('results');
        const formattedText = formatarResultadoMarkdown(data.resultadoIA); 

        resultsDiv.innerHTML = `
            <div class="result-search">
                <h3>Resultado encontrado para "${searchTerm}"</h3>
                <div><p>${formattedText}</p></div>
            </div>
        `;
    } catch (error) {
        console.error('Erro ao obter informações:', error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<p>Ocorreu um erro ao buscar as informações. Tente novamente mais tarde.</p>';
    }
});

// Log de carregamento do arquivo
console.log('carregou');