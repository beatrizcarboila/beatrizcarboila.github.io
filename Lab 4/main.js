let texto = document.getElementById("textopiada")
let piadas = [
 "Porque é que o computador foi à escola? Para melhorar o processador!",
 "O que faz uma abelha no ginásio? Zumba!",
 "Porque é que a aranha é um bom programador? Porque sabe criar a web",
 "O que disse o tomate ao outro tomate na corrida? Ketchup!"
]

texto.addEventListener("mouseover", function(){
 let n = Math.floor(Math.random() * piadas.length)
 texto.textContent = piadas[n]
})

let alegria = document.getElementById("alegria")
let tristeza = document.getElementById("tristeza")
let medo = document.getElementById("medo")
let nojo = document.getElementById("nojo")
let raiva = document.getElementById("raiva")
let ansiedade = document.getElementById("ansiedade")
let inveja = document.getElementById("inveja")
let tedio = document.getElementById("tedio")
let vergonha = document.getElementById("vergonha")

alegria.addEventListener("click", function() {
  document.body.style.backgroundColor = "#fff12dff"
})

tristeza.addEventListener("click", function() {
  document.body.style.backgroundColor = "#a8dadc"
  })

medo.addEventListener("click", function() {
  document.body.style.backgroundColor = "#e8b7ecff"
  })

nojo.addEventListener("click", function() {
  document.body.style.backgroundColor = "#acfc86ff"
  })

raiva.addEventListener("click", function() {
  document.body.style.backgroundColor = "#ff1111ff"
  })

ansiedade.addEventListener("click", function() {
  document.body.style.backgroundColor = "#ffa733ff"
  })

inveja.addEventListener("click", function() {
  document.body.style.backgroundColor = "#88fff9ff"
  })

tedio.addEventListener("click", function() {
  document.body.style.backgroundColor = "#965d8cff"
  })

vergonha.addEventListener("click", function() {
  document.body.style.backgroundColor = "#ff93faff"
  })

let caixa = document.getElementById("caixa")
let cores = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf"]
let pos = 0
caixa.addEventListener("input", function(){
     caixa.style.backgroundColor = cores[pos]
     pos++
     if(pos == cores.length){
         pos = 0
     }
})

let riso = document.getElementById("riso")
let numero = document.getElementById("numero")
let conta = 0
riso.addEventListener("click", function(){
     conta ++
     numero.textContent = conta
})

let img = document.getElementById("fotografia")
img.addEventListener("mouseover", function(){
     let x = Math.random() * 300;
     let y = Math.random() * 200;
     img.style.transform = "translate(" + x + "px," + y + "px)";
});
