/* A. declaração de variáveis */
const nodeInputNumero = document.getElementById("input-numero"); // Vai buscar o elemento input do HTML pelo ID
const formCromo = document.getElementById("form-cromo");
const nodeUlColecao = document.getElementById("lista-cromos");
const nodeUlRepetidos = document.getElementById("lista-repetidos");

// Carrega os dados do localStorage (se existirem) ou inicia com listas vazias
const colecao = JSON.parse(localStorage.getItem("colecao")) || []; // Cria uma lista vazia
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || []; // Vai buscar os repetidos guardados no navegador

// Função auxiliar para guardar os dados no localStorage
function salvarDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao)); // Guarda a lista em texto no navegador
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

/* B. event handlers */
function guardaCarta(event) {
  event.preventDefault(); // Impede que a página recarregue ao submeter o formulário
  const numero = nodeInputNumero.value; // Vai buscar o valor que o utilizador escreveu

  if (numero !== "") {
    // Verifica se o campo não está vazio
    const num = Number(numero); // Converte o texto introduzido num número

    if (colecao.includes(num)) {
      // Verifica se o cromo já existe
      repetidos.push(num); // Se já existe, adiciona-o à lista de repetidos
      repetidos.sort((a, b) => a - b); // Ordena ordem crescente
      atualizaLista(repetidos, nodeUlRepetidos);
    } else {
      colecao.push(num); // Se não existe, adiciona-o à coleção principal
      colecao.sort((a, b) => a - b); // Ordena ordem crescente
      atualizaLista(colecao, nodeUlColecao);
    }

    // Guarda no localStorage sempre que houver alterações
    salvarDados();
  }

  nodeInputNumero.value = ""; //Limpa a caixa para o próximo cromo
}

function atualizaLista(lista, nodeUl) {
  if (!nodeUl) return; // Se a lista HTML não existir, sai da função por segurança
  nodeUl.innerHTML = ""; // Limpa todo o conteúdo HTML atual da lista para recriar do zero

  lista.forEach(function (cromo, index) {
    // Percorre cada cromo e a sua posição (index) na lista
    const li = document.createElement("li"); // Cria um novo elemento <li> para o cromo

    if (nodeUl === nodeUlRepetidos) {
      li.innerHTML = `${cromo} <button class="btn-eliminar" data-index="${index}">Eliminar</button>`;
    } else {
      li.textContent = cromo;
    }

    nodeUl.appendChild(li); // Adiciona o <li> criado dentro da respetiva lista <ul> no HTM
  });

  if (nodeUl === nodeUlRepetidos) {
    associaEventosEliminar(); // Se atualizou os repetidos, volta a associar os cliques aos botões de eliminar
  }
}

/* C. event listeners */
formCromo.addEventListener("submit", guardaCarta);

function associaEventosEliminar() {
  const botoesEliminar = document.querySelectorAll(".btn-eliminar"); // Vai buscar todos os botões com a classe "btn-eliminar" criados no HTML

  botoesEliminar.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const index = botao.getAttribute("data-index"); // Vai buscar o índice do cromo guardado no atributo do botão

      // Remove o cromo da lista de repetidos
      repetidos.splice(index, 1);

      // Guarda no localStorage e atualiza a renderização
      salvarDados();
      atualizaLista(repetidos, nodeUlRepetidos);
    });
  });
}

// Renderiza as listas no ecrã logo assim que a página é aberta/recarregada
atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
