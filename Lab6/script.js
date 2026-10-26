/* A. declaração de variáveis */
const nodeInputNumero = document.getElementById("input-numero");
const formCromo = document.getElementById("form-cromo");
const nodeUlColecao = document.getElementById("lista-cromos");
const nodeUlRepetidos = document.getElementById("lista-repetidos");

// Carrega os dados do localStorage (se existirem) ou inicia com listas vazias
const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];

// Função auxiliar para guardar os dados no localStorage
function salvarDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

/* B. event handlers */
function guardaCarta(event) {
  event.preventDefault();
  const numero = nodeInputNumero.value;

  if (numero !== "") {
    const num = Number(numero);

    if (colecao.includes(num)) {
      repetidos.push(num);
      repetidos.sort((a, b) => a - b);
      atualizaLista(repetidos, nodeUlRepetidos);
    } else {
      colecao.push(num);
      colecao.sort((a, b) => a - b);
      atualizaLista(colecao, nodeUlColecao);
    }

    // Guarda no localStorage sempre que houver alterações
    salvarDados();
  }

  nodeInputNumero.value = "";
}

function atualizaLista(lista, nodeUl) {
  if (!nodeUl) return;
  nodeUl.innerHTML = "";

  lista.forEach(function (cromo, index) {
    const li = document.createElement("li");

    if (nodeUl === nodeUlRepetidos) {
      li.innerHTML = `${cromo} <button class="btn-eliminar" data-index="${index}">Eliminar</button>`;
    } else {
      li.textContent = cromo;
    }

    nodeUl.appendChild(li);
  });

  if (nodeUl === nodeUlRepetidos) {
    associaEventosEliminar();
  }
}

/* C. event listeners */
formCromo.addEventListener("submit", guardaCarta);

function associaEventosEliminar() {
  const botoesEliminar = document.querySelectorAll(".btn-eliminar");

  botoesEliminar.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const index = botao.getAttribute("data-index");

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
