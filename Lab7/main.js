// A. Estado e Variáveis
const seccaoProdutos = document.getElementById("produtos");
const seccaoCesto = document.getElementById("cesto");

let produtosSelecionados =
  JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

// B. Funções utilitárias

// Função para criar o elemento <article> de um produto da loja
function criarProduto(produto) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = produto.image;
  img.alt = produto.title;
  img.width = 100;

  const h2 = document.createElement("h2");
  h2.textContent = produto.title;

  const pDescricao = document.createElement("p");
  pDescricao.textContent = produto.description;

  const pPreco = document.createElement("p");
  pPreco.textContent = `Preço: ${produto.price} €`;

  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao cesto";

  botao.addEventListener("click", function () {
    produtosSelecionados.push(produto);
    localStorage.setItem(
      "produtos-selecionados",
      JSON.stringify(produtosSelecionados),
    );
    atualizaCesto();
  });

  article.append(img, h2, pDescricao, pPreco, botao);
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
    produtosSelecionados.splice(index, 1);
    localStorage.setItem(
      "produtos-selecionados",
      JSON.stringify(produtosSelecionados),
    );
    atualizaCesto();
  });

  article.append(img, h3, pPreco, botaoRemover);
  return article;
}

// C. Event handlers / Funções de Renderização
function renderizarProdutos(listaProdutos) {
  seccaoProdutos.innerHTML = "<h2>Produtos</h2>";

  listaProdutos.forEach(function (produto) {
    const artigoProduto = criarProduto(produto);
    seccaoProdutos.appendChild(artigoProduto);
  });
}

function atualizaCesto() {
  produtosSelecionados =
    JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  seccaoCesto.innerHTML = "<h2>Cesto de Compras</h2>";

  let precoTotal = 0;

  produtosSelecionados.forEach(function (produto, index) {
    const artigoCesto = criaProdutoCesto(produto, index);
    seccaoCesto.appendChild(artigoCesto);
    precoTotal += produto.price;
  });

  const divTotal = document.createElement("div");
  divTotal.classList.add("cesto-total");

  const h3Total = document.createElement("h3");
  h3Total.textContent = `Preço Total: ${precoTotal.toFixed(2)} €`;

  divTotal.appendChild(h3Total);
  seccaoCesto.appendChild(divTotal);
}

// D. Event Listeners
// (Reservado para eventos globais)

// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
