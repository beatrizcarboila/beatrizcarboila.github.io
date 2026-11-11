// Define uma lista com os URLs base da API
const API_BASES = [
  // Primeiro URL base oficial da API do DEISI Shop
  "https://deisishop.pw.deisi.ulusofona.pt",
  // Segundo URL base alternativo (backup) da API
  "https://deisishop.pythonanywhere.com",
]; // Fim da lista de URLs base

// Cria uma variável para guardar o URL base ativo, começando pelo primeiro
let API_URL = API_BASES[0];

// Cria uma variável global para guardar a lista completa de produtos recebidos
let todosProdutosGlobais = [];

// Verifica no armazenamento local se já existe um cesto guardado
if (!localStorage.getItem("produtos-selecionados")) {
  // Se não existir cesto guardado, cria um cesto vazio em formato JSON
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
} // Fim da verificação do cesto

// Adiciona um evento que espera o documento HTML carregar por completo
document.addEventListener("DOMContentLoaded", async () => {
  // Executa a função para detetar qual o servidor da API está online
  await detectarAPI();
  // Executa a função para carregar as categorias no menu de filtro
  await carregarFiltroCategorias();
  // Executa a função para ir buscar e mostrar os produtos na página
  await buscarEcarregarProdutos();
  // Executa a função para desenhar e atualizar o cesto de compras
  atualizaCesto();

  // Seleciona o elemento de ordenação por preço e ouve quando o utilizador muda a opção
  document.getElementById("ordenar-preco").addEventListener("change", (e) => {
    // Chama a função de ordenação passando o valor selecionado
    ordenarEExibirProdutos(e.target.value);
  }); // Fim do evento de ordenação

  // Seleciona o botão de compra e ouve o clique do utilizador
  document
    .getElementById("btn-comprar")
    .addEventListener("click", realizarCompra);
}); // Fim do evento de carregamento da página

// Declara a função assíncrona para testar e detetar a API ativa
async function detectarAPI() {
  // Obtém o elemento HTML onde os produtos são mostrados
  const secaoProdutos = document.getElementById("produtos");
  // Mostra uma mensagem temporária a indicar que está a testar a ligação
  secaoProdutos.innerHTML = "<p>A detetar servidor da API...</p>";

  // Percorre cada URL base da lista de servidores
  for (const base of API_BASES) {
    // Tenta executar um bloco de código com risco de erro de rede
    try {
      // Faz um pedido fetch para testar se o endpoint de produtos responde
      const resp = await fetch(`${base}/products`);
      // Verifica se a resposta do servidor foi bem-sucedida (ok)
      if (resp.ok) {
        // Atualiza a variável global com o URL do servidor que respondeu
        API_URL = base;
        // Mostra uma mensagem de sucesso na consola do navegador
        console.log("✅ API ativa em:", base);
        // Sai da função pois já encontrou um servidor funcional
        return;
      } // Fim da verificação de resposta ok
    } catch (_e) {
      // Caso ocorra um erro de ligação, avisa na consola e continua o ciclo
      console.warn("❌ Falhou ao aceder a:", base);
    } // Fim do bloco try-catch
  } // Fim do ciclo de testes de servidores
  // Se nenhum servidor funcionar, escreve um erro grave na consola
  console.error("⚠️ Nenhum endpoint da API está acessível!");
} // Fim da função detectarAPI

// Declara a função assíncrona para ir buscar produtos (com opção de categoria)
async function buscarEcarregarProdutos(categoria = "") {
  // Obtém o elemento HTML da secção de produtos
  const secaoProdutos = document.getElementById("produtos");
  // Mostra uma mensagem a informar que os produtos estão a carregar
  secaoProdutos.innerHTML = "<p>A carregar produtos...</p>";

  // Define o URL inicial para ir buscar todos os produtos
  let url = `${API_URL}/products`;
  // Verifica se foi passada alguma categoria específica
  if (categoria) {
    // Se houver categoria, acrescenta o filtro de categoria formatado ao URL
    url = `${API_URL}/products?category=${encodeURIComponent(categoria)}`;
  } // Fim da verificação de categoria

  // Tenta executar o pedido de rede dos produtos
  try {
    // Faz o pedido fetch para o URL construído
    const resposta = await fetch(url);
    // Se a resposta falhar, lança um erro personalizado
    if (!resposta.ok) throw new Error("Erro ao buscar produtos da API");

    // Converte a resposta recebida num array JSON e guarda-o na variável global
    todosProdutosGlobais = await resposta.json();

    // Lê o valor atual do seletor de ordenação de preços
    const ordem = document.getElementById("ordenar-preco").value;
    // Ordena e exibe os produtos de acordo com a regra escolhida
    ordenarEExibirProdutos(ordem);
  } catch (erro) {
    // Se ocorrer um erro, regista-o na consola do navegador
    console.error("❌ Erro a carregar produtos:", erro);
    // Mostra a mensagem de erro amigável diretamente na página web
    secaoProdutos.innerHTML = `<p>Erro ao carregar produtos: ${erro.message}</p>`;
  } // Fim do try-catch de carregamento de produtos
} // Fim da função buscarEcarregarProdutos

// Declara a função para ordenar e redesenhar os produtos por preço
function ordenarEExibirProdutos(ordem) {
  // Cria uma cópia da lista global de produtos usando o operador spread
  let listaParaMostrar = [...todosProdutosGlobais];

  // Verifica se o utilizador escolheu ordem crescente
  if (ordem === "crescente") {
    // Ordena a lista colocando os preços do menor para o maior
    listaParaMostrar.sort((a, b) => a.price - b.price);
    // Verifica se o utilizador escolheu ordem decrescente
  } else if (ordem === "decrescente") {
    // Ordena a lista colocando os preços do maior para o menor
    listaParaMostrar.sort((a, b) => b.price - a.price);
  } // Fim das condições de ordenação

  // Chama a função para desenhar a lista ordenada no ecrã
  carregarProdutos(listaParaMostrar);
} // Fim da função ordenarEExibirProdutos

// Declara a função assíncrona para carregar as categorias para a caixa de seleção
async function carregarFiltroCategorias() {
  // Obtém o elemento select do HTML responsável pelo filtro de categorias
  const select = document.getElementById("filtro-categorias");
  // Define a opção padrão inicial do menu de seleção
  select.innerHTML = "<option value=''>Todas as Categorias</option>";

  // Tenta obter as categorias através de um bloco protegido
  try {
    // Faz um pedido fetch ao endpoint de categorias da API
    const resposta = await fetch(`${API_URL}/categories`);
    // Se o pedido falhar, dispara um erro
    if (!resposta.ok) throw new Error("Erro ao buscar categorias");
    // Converte a resposta do servidor em formato JSON
    const categorias = await resposta.json();

    // Percorre cada categoria recebida na lista
    categorias.forEach((cat) => {
      // Descobre se a categoria é um objeto (extraindo o nome) ou uma string simples
      const nomeCat = typeof cat === "object" ? cat.name || cat.title : cat;
      // Cria um novo elemento HTML option
      const option = document.createElement("option");
      // Define o valor interno da opção com o nome da categoria
      option.value = nomeCat;
      // Define o texto visível da opção com o nome da categoria
      option.textContent = nomeCat;
      // Adiciona a nova opção dentro do elemento select
      select.appendChild(option);
    }); // Fim do ciclo de categorias

    // Adiciona um ouvinte para detetar quando o utilizador muda de categoria
    select.addEventListener("change", (e) => {
      // Recarrega os produtos filtrando pela categoria escolhida
      buscarEcarregarProdutos(e.target.value);
    }); // Fim do evento change
  } catch (erro) {
    // Regista qualquer erro de categorias na consola
    console.error("❌ Erro ao carregar categorias:", erro);
  } // Fim do try-catch de categorias
} // Fim da função carregarFiltroCategorias

// Declara a função para limpar e desenhar a lista de produtos no HTML
function carregarProdutos(lista) {
  // Obtém a secção HTML onde os cartões de produtos vão ser inseridos
  const secaoProdutos = document.getElementById("produtos");
  // Limpa todo o conteúdo anterior que estava dentro da secção
  secaoProdutos.innerHTML = "";

  // Verifica se a lista recebida não é um array válido ou se está vazia
  if (!Array.isArray(lista) || lista.length === 0) {
    // Se estiver vazia, mostra uma mensagem a avisar o utilizador
    secaoProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    // Interrompe a execução da função
    return;
  } // Fim da validação de lista vazia

  // Percorre cada produto individualmente na lista fornecida
  lista.forEach((produto) => {
    // Cria o elemento visual HTML para o produto atual
    const artigo = criarProduto(produto);
    // Adiciona o cartão criado dentro da secção de produtos da página
    secaoProdutos.appendChild(artigo);
  }); // Fim do ciclo de criação de produtos
} // Fim da função carregarProdutos

// Declara a função que constrói a estrutura visual (card) de um produto da loja
function criarProduto(produto) {
  // Cria um elemento article para o cartão do produto
  const artigo = document.createElement("article");
  // Adiciona a classe CSS "produto-card" ao artigo criado
  artigo.classList.add("produto-card");

  // Cria um elemento img para a imagem do produto
  const imagem = document.createElement("img");
  // Guarda o caminho da imagem do produto numa variável local
  let imageUrl = produto.image;
  // Verifica se o caminho da imagem começa com uma barra inclinada
  if (imageUrl && imageUrl.startsWith("/")) {
    // Junta o URL base da API ao caminho relativo para corrigir o link
    imageUrl = API_URL + imageUrl;
  } // Fim da correção do caminho da imagem
  // Atribui o link corrigido da imagem ao atributo src
  imagem.src = imageUrl;
  // Atribui o título do produto ao atributo alt da imagem por acessibilidade
  imagem.alt = produto.title;

  // Cria um elemento h3 para o título do produto
  const titulo = document.createElement("h3");
  // Insere o texto do título do produto no elemento h3
  titulo.textContent = produto.title;

  // Converte o preço do produto para número (ou assume 0 se falhar)
  const precoValor = Number(produto.price) || 0;
  // Cria um elemento p para o preço do produto
  const preco = document.createElement("p");
  // Formata o preço com o símbolo de euro e duas casas decimais
  preco.textContent = `€${precoValor.toFixed(2)}`;

  // Cria um botão HTML para permitir comprar o produto
  const botao = document.createElement("button");
  // Define o texto visível dentro do botão
  botao.textContent = "Adicionar ao Cesto";
  // Adiciona um evento de clique para adicionar o produto ao cesto ao ser premido
  botao.addEventListener("click", () => {
    // Chama a função de adicionar ao cesto passando o objeto produto
    adicionarAoCesto(produto);
  }); // Fim do evento de clique do botão

  // Junta a imagem, título, preço e botão dentro do elemento article criado
  artigo.append(imagem, titulo, preco, botao);
  // Retorna o artigo completo pronto a ser exibido
  return artigo;
} // Fim da função criarProduto

// Declara a função que constrói o elemento visual de um produto dentro do cesto
function criaProdutoCesto(produto) {
  // Cria um elemento article para representar o item no cesto
  const artigo = document.createElement("article");

  // Cria um elemento img para mostrar a miniatura da imagem no cesto
  const imagem = document.createElement("img");
  // Guarda o link da imagem do produto
  let imageUrl = produto.image;
  // Valida se o link da imagem é relativo (começa com barra)
  if (imageUrl && imageUrl.startsWith("/")) {
    // Concatena o URL base ao caminho relativo da imagem
    imageUrl = API_URL + imageUrl;
  } // Fim da correção do caminho
  // Define o src da imagem com o URL correto
  imagem.src = imageUrl;
  // Define o texto alternativo da imagem do cesto
  imagem.alt = produto.title;

  // Cria um elemento div para agrupar as informações textuais do cesto
  const infoDiv = document.createElement("div");
  // Cria um elemento h4 para o título do produto no cesto
  const titulo = document.createElement("h4");
  // Insere o título do produto
  titulo.textContent = produto.title;

  // Converte o preço do produto do cesto para número
  const precoValor = Number(produto.price) || 0;
  // Cria um parágrafo para o preço no cesto
  const preco = document.createElement("p");
  // Formata o preço formatado com duas casas decimais
  preco.textContent = `€${precoValor.toFixed(2)}`;

  // Agrupa o título e o preço dentro da div de informações
  infoDiv.append(titulo, preco);

  // Cria um botão para remover o produto do cesto
  const botaoRemover = document.createElement("button");
  // Define o texto do botão de remoção
  botaoRemover.textContent = "Remover";
  // Adiciona um evento de clique para remover o item pelo seu ID único
  botaoRemover.addEventListener("click", () => {
    // Chama a função de remover do cesto usando o ID do produto
    removerDoCesto(produto.id);
  }); // Fim do evento de clique do botão remover

  // Junta a imagem, a div de informações e o botão de remover no artigo do cesto
  artigo.append(imagem, infoDiv, botaoRemover);
  // Retorna o artigo construído
  return artigo;
} // Fim da função criaProdutoCesto

// Declara a função para adicionar um produto selecionado ao cesto local
function adicionarAoCesto(produto) {
  // Lê e converte o cesto atual guardado no localStorage para um array JavaScript
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  // Adiciona o novo produto ao final do array de selecionados
  selecionados.push(produto);
  // Guarda o array atualizado de volta no localStorage em formato de texto JSON
  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));
  // Atualiza a visualização do cesto no ecrã
  atualizaCesto();
} // Fim da função adicionarAoCesto

// Declara a função para remover um produto do cesto através do seu identificador
function removerDoCesto(idProduto) {
  // Lê os produtos guardados atualmente no localStorage convertendo-os para array
  let selecionados = JSON.parse(localStorage.getItem("produtos-selecionados"));
  // Procura o índice da primeira ocorrência do produto que tem o ID correspondente
  const index = selecionados.findIndex((p) => p.id === idProduto);
  // Verifica se o produto foi encontrado na lista (índice diferente de -1)
  if (index !== -1) {
    // Remove apenas esse elemento específico do array usando o método splice
    selecionados.splice(index, 1);
  } // Fim da verificação de índice encontrado
  // Atualiza o localStorage com o array modificado sem o item removido
  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));
  // Atualiza a interface gráfica do cesto
  atualizaCesto();
} // Fim da função removerDoCesto

// Declara a função que redesenha todo o conteúdo e calcula o total do cesto
function atualizaCesto() {
  // Obtém o elemento HTML onde os produtos do cesto são listados
  const secaoCesto = document.getElementById("produtos-selecionados");
  // Obtém o elemento HTML responsável por mostrar o preço total
  const totalElemento = document.getElementById("total");

  // Limpa o conteúdo visual atual do cesto
  secaoCesto.innerHTML = "";
  // Vai buscar os produtos selecionados atualizados ao localStorage
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  // Inicializa a variável acumuladora do total a pagar com o valor zero
  let total = 0;

  // Verifica se a quantidade de produtos no cesto é exatamente igual a zero
  if (selecionados.length === 0) {
    // Mostra uma mensagem informativa a dizer que o cesto está vazio
    secaoCesto.innerHTML = "<p>O seu cesto está vazio.</p>";
  } // Fim da verificação de cesto vazio

  // Percorre cada produto presente no array de selecionados do cesto
  selecionados.forEach((produto) => {
    // Cria o elemento visual correspondente ao produto no cesto
    const artigo = criaProdutoCesto(produto);
    // Adiciona o artigo gerado dentro da secção HTML do cesto
    secaoCesto.appendChild(artigo);
    // Adiciona e converte o preço do produto atual ao valor acumulado do total
    total += parseFloat(produto.price) || 0;
  }); // Fim do ciclo de soma e desenho do cesto

  // Atualiza o texto do elemento HTML do total formatando-o com duas casas decimais
  totalElemento.textContent = `Total: €${total.toFixed(2)}`;
} // Fim da função atualizaCesto

// Declara a função assíncrona responsável por submeter a compra via pedido POST
async function realizarCompra() {
  // Obtém os produtos selecionados do localStorage (ou um array vazio se falhar)
  const selecionados =
    JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  // Obtém o elemento HTML destinado a mostrar o resultado/resposta da compra
  const resultadoDiv = document.getElementById("resultado-compra");

  // Verifica se o cesto está vazio antes de tentar efetuar a compra
  if (selecionados.length === 0) {
    // Emite um alerta pop-up a avisar que o cesto está vazio
    alert("O cesto está vazio!");
    // Interrompe a execução da função
    return;
  } // Fim da validação de cesto vazio para compra

  // Cria um novo array contendo apenas os IDs numéricos de cada produto no cesto
  const idsProdutos = selecionados.map((p) => p.id);
  // Verifica o estado atual (marcado ou desmarcado) da checkbox de estudante do DEISI
  const estudanteDeisi = document.getElementById("estudante-deisi").checked;
  // Obtém o texto inserido no campo de input do cupão de desconto, sem espaços extra
  const cupao = document.getElementById("input-cupao").value.trim();

  // Cria o objeto JavaScript estruturado com os dados exigidos pela API para a compra
  const dadosCompra = {
    products: idsProdutos, // Lista com os IDs dos produtos a comprar
    student: estudanteDeisi, // Booleano indicando se é estudante
    coupon: cupao, // Código de cupão introduzido
  }; // Fim do objeto de dados

  // Tenta realizar o envio do pedido POST para a API
  try {
    // Faz um pedido fetch do tipo POST para o endpoint /buy
    const resposta = await fetch(`${API_URL}/buy`, {
      method: "POST", // Define explicitamente o método HTTP como POST
      headers: {
        "Content-Type": "application/json", // Informa que os dados enviados estão em formato JSON
      },
      body: JSON.stringify(dadosCompra), // Converte o objeto de dados em string JSON para o corpo
    }); // Fim do fetch POST

    // Converte a resposta recebida do servidor num objeto JavaScript
    const resultado = await resposta.json();

    // Torna visível o elemento HTML que vai mostrar o resultado da compra
    resultadoDiv.style.display = "block";

    // Verifica se o código de estado HTTP da resposta foi bem-sucedido (ok)
    if (resposta.ok) {
      // Preenche o HTML com os dados de sucesso (referência de pagamento e total pago)
      resultadoDiv.innerHTML = `
        <p><strong>Compra efetuada com sucesso!</strong></p>
        <p>Referência: <strong>${resultado.reference || resultado.referencia || "N/A"}</strong></p>
        <p>Total: <strong>€${(resultado.totalCost !== undefined ? resultado.totalCost : resultado.total).toFixed(2)}</strong></p>
        ${resultado.discount ? `<p>Desconto: ${resultado.discount}</p>` : ""}
      `;
      // Esvazia o cesto no localStorage redefinindo-o para um array vazio
      localStorage.setItem("produtos-selecionados", JSON.stringify([]));
      // Atualiza visualmente o cesto na página para refletir que ficou vazio
      atualizaCesto();
    } else {
      // Caso ocorra um erro controlado devolvido pela API, exibe-o no ecrã
      resultadoDiv.innerHTML = `<p style="color: red;"><strong>Erro:</strong> ${resultado.error || resultado.message || "Erro desconhecido"}</p>`;
    } // Fim da verificação de resposta ok na compra
  } catch (erro) {
    // Regista o erro de rede/servidor na consola de erros
    console.error("❌ Erro ao processar compra:", erro);
    // Torna a caixa de resultado visível
    resultadoDiv.style.display = "block";
    // Mostra uma mensagem genérica de erro de ligação no ecrã
    resultadoDiv.innerHTML = `<p style="color: red;">Erro de ligação ao servidor.</p>`;
  } // Fim do bloco try-catch da compra
} // Fim da função realizarCompra
