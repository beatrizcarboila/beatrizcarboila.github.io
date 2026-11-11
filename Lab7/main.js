/* global produtos */

// A. Estado e Variáveis
const seccaoProdutos = document.getElementById("produtos"); // Vai buscar o elemento HTML correspondente à seção de produtos pelo ID
const seccaoCesto = document.getElementById("cesto");

let produtosSelecionados =
  JSON.parse(localStorage.getItem("produtos-selecionados")) || []; // Carrega do armazenamento local os produtos já escolhidos

// B. Funções utilitárias

// Função para criar o elemento <article> de um produto da loja
function criarProduto(produto) {
  const article = document.createElement("article"); // Cria <article> para encapsular a informação do produto

  const img = document.createElement("img");
  img.src = produto.image; // Define o link da imagem com base nas propriedades do objeto produto
  img.alt = produto.title;
  img.width = 100; // Define a largura da imagem para 100 pixéis

  const h2 = document.createElement("h2"); //Cria o eleemnto para o título do produto
  h2.textContent = produto.title; // Define o texto do título com o nome do produto

  const pDescricao = document.createElement("p");
  pDescricao.textContent = produto.description;

  const pPreco = document.createElement("p");
  pPreco.textContent = `Preço: ${produto.price} €`;

  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao cesto";

  botao.addEventListener("click", function () {
    // Fica à escuta de um clique no botão de adicionar
    produtosSelecionados.push(produto);
    localStorage.setItem(
      "produtos-selecionados",
      JSON.stringify(produtosSelecionados), // Guarda a lista atualizada de produtos no localStorage
    );
    atualizaCesto();
  });

  article.append(img, h2, pDescricao, pPreco, botao); // Insere todos os elementos dentro da tag <article>
  return article;
}

// Função para criar o elemento <article> de um produto dentro do cesto
function criaProdutoCesto(produto, index) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = produto.image;
  img.alt = produto.title;
  img.width = 80;

  const h3 = document.createElement("h3");
  h3.textContent = produto.title;

  const pPreco = document.createElement("p");
  pPreco.textContent = `Preço: ${produto.price} €`;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function () {
    // Fica à escuta do clique para remover o item
    produtosSelecionados.splice(index, 1); // Remove 1 elemento da lista na posição indicada pelo índice
    localStorage.setItem(
      "produtos-selecionados",
      JSON.stringify(produtosSelecionados),
    );
    atualizaCesto();
  });

  article.append(img, h3, pPreco, botaoRemover); // Junta a imagem, título, preço e botão dentro do <article>
  return article;
}

// C. Event handlers / Funções de Renderização
function renderizarProdutos(listaProdutos) {
  seccaoProdutos.innerHTML = "<h2>Produtos</h2>"; // Limpa a seção e define o título inicial de produto

  listaProdutos.forEach(function (produto) {
    const artigoProduto = criarProduto(produto);
    seccaoProdutos.appendChild(artigoProduto);
  });
}

function atualizaCesto() {
  produtosSelecionados =
    JSON.parse(localStorage.getItem("produtos-selecionados")) || []; // Obtém os dados mais recentes do cesto no localStorage
  seccaoCesto.innerHTML = "<h2>Cesto de Compras</h2>"; // Limpa o cesto

  let precoTotal = 0; // Inicializa a variável para acumular o preço total das compras

  produtosSelecionados.forEach(function (produto, index) {
    const artigoCesto = criaProdutoCesto(produto, index);
    seccaoCesto.appendChild(artigoCesto);
    precoTotal += produto.price; // Soma o preço do produto atual ao preço total
  });

  const divTotal = document.createElement("div");
  divTotal.classList.add("cesto-total");

  const h3Total = document.createElement("h3");
  h3Total.textContent = `Preço Total: ${precoTotal.toFixed(2)} €`; // Formata e insere o preço total com duas casas decimais

  divTotal.appendChild(h3Total);
  seccaoCesto.appendChild(divTotal);
}

// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
