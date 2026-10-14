// 1. Passa o rato (usando querySelector com ID)
//function mudarTexto() {
//document.querySelector("#texto-hover").innerText = "Obrigada por passares!";
//}
//function restaurarTexto() {
//document.querySelector("#texto-hover").innerText = "Passa por aqui!";
//}

// 2. Mudar a cor da palavra "Pinta-me!"
//Eventos 1.0
//function mudarCorTexto(cor) {
//   document.querySelector("#pinta-me").style.color = cor;
//}

//Com querySelectorAll, forEach e dataset
//document.querySelectorAll("button.color").forEach((botao) => {
//botao.addEventListener("click", () => {
//const corEscolhida = botao.dataset.color;
//document.querySelector("#pinta-me").style.color = corEscolhida;
//});
//});

// 3. Mudar a cor da caixa de texto a cada alteração
//const listaCores = ["lightcoral", "lightgreen", "lightblue", "lightyellow"];
//let indiceCor = 0; // Começa na primeira cor

//function mudarCorCaixa() {
// Aplica a cor atual à caixa
//document.querySelector("#caixa-cor").style.backgroundColor = listaCores[indiceCor];

// Avança para a próxima cor. Quando chega ao fim das cores, volta ao início
//indiceCor = (indiceCor + 1) % listaCores.length;
//}

// 4. Mudar a cor do site todo com o valor do input
//Eventos 1.0
//function mudarCorSite() {
//    const corDigitada = document.querySelector("#input-cor-site").value;
//    document.querySelector("body").style.backgroundColor = corDigitada;
//}

//Usando select e "this"
// Function normal para o "this" referir o elemento select que disparou o evento
//document.querySelector('#select-cor-site').addEventListener('change', function() {
//    document.querySelector('body').style.backgroundColor = this.value;
//});

// 5. Incrementar o contador
//Eventos 1.0
//let numeroConta = 0;
//function incrementarContador() {
//    numeroConta++;
//   document.querySelector("#contador").innerText = numeroConta;
//}

// 6. Formulário: Submeter e mostrar mensagem sem recarregar a página
//document.querySelector('#form-utilizador').onsubmit = (e) => {
//    e.preventDefault(); // Para não recarregar a página

//    const nome = document.querySelector('#nome').value;
//    const idade = document.querySelector('#idade').value;

//    document.querySelector('#mensagem-utilizador').innerText = `Olá, o ${nome} tem ${idade}!`;
//};

//Arrow function
//let numeroConta = 0;
//const incrementarContador = () => {
//   numeroConta++;
//   document.querySelector("#contador").innerText = numeroConta;
//};

// Alterar o flex-direction através do select flex
//document.querySelector('#select-flex').addEventListener('change', function() {
//   document.querySelector('#flex-container').style.flexDirection = this.value;
//});

//Começa aqui nova estruturação
// 1. VARIÁVEIS E INICIALIZAÇÃO DO LOCAL STORAGE

if (!localStorage.getItem("counter")) {
  localStorage.setItem("counter", 0);
}
document.querySelector("#contador-valor").textContent =
  localStorage.getItem("counter");

// Variável para o temporizador automático
let tempoAutomatico = 0;

// 2. EVENT HANDLERS (Ou seja funções)

function mudarTexto() {
  document.querySelector("#texto-hover").innerText = "Obrigada por passares!";
}

function restaurarTexto() {
  document.querySelector("#texto-hover").innerText = "Passa por aqui!";
}

const mudarCorCaixa = () => {
  const listaCores = ["lightcoral", "lightgreen", "lightblue", "lightyellow"];
  document.querySelector("#caixa-cor").style.backgroundColor = listaCores[0];
};

// Funções do contador manual
function incrementar() {
  let counter = parseInt(localStorage.getItem("counter"));
  counter++;
  document.querySelector("#contador-valor").textContent = counter;
  localStorage.setItem("counter", counter);
}

function decrementar() {
  let counter = parseInt(localStorage.getItem("counter"));
  counter--;
  document.querySelector("#contador-valor").textContent = counter;
  localStorage.setItem("counter", counter);
}

function resetContador() {
  let counter = 0;
  document.querySelector("#contador-valor").textContent = counter;
  localStorage.setItem("counter", counter);
}

// Função do temporizador automático (incrementa a cada segundo)
function count() {
  tempoAutomatico++;
  document.querySelector("#temporizador-valor").textContent = tempoAutomatico;
}

// Inicia o temporizador automático a correr a cada 1000ms (1 segundo)
setInterval(count, 1000);

// 3. EVENT LISTENERS
// Botões "Pinta-me!"
document.querySelectorAll("button.color").forEach((botao) => {
  botao.addEventListener("click", () => {
    const corEscolhida = botao.dataset.color;
    document.querySelector("#pinta-me").style.color = corEscolhida;
  });
});

// Select cor do site (com this)
document
  .querySelector("#select-cor-site")
  .addEventListener("change", function () {
    document.querySelector("body").style.backgroundColor = this.value;
  });

// Listeners dos botões do contador manual
document
  .querySelector("#btn-incrementar")
  .addEventListener("click", incrementar);
document
  .querySelector("#btn-decrementar")
  .addEventListener("click", decrementar);
document.querySelector("#btn-reset").addEventListener("click", resetContador);

// Formulário Nome e Idade
document.querySelector("#form-utilizador").onsubmit = (e) => {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const idade = document.querySelector("#idade").value;
  document.querySelector("#mensagem-utilizador").innerText =
    `Olá, o ${nome} tem ${idade}!`;
};

// Select flex
document.querySelector("#select-flex").addEventListener("change", function () {
  document.querySelector("#flex-container").style.flexDirection = this.value;
});
