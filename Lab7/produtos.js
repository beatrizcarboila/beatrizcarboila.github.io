const produtos = [
  {
    id: 1,
    title: "O mundo do binário",
    price: 22.5,
    description:
      "Mostra ao mundo que percebes de matemática fora da caixa! Com esta t-shirt, podes provar que 1 + 1 = 10... mas só para os génios da programação e entusiastas do sistema binário. Perfeita para descontrair o ambiente e deixar toda a gente a pensar. Quem disse que estilo e código não combinam?",
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-1-1.png",
    rating: {
      rate: 4.7,
      count: 200,
    },
  },
  {
    id: 10,
    title: "As 6 fases do debugging",
    price: 13,
    description:
      'A jornada épica de todo programador, onde cada erro é uma montanha a escalar. Começas com uma negação absoluta, segues para o clássico "Isso não acontece na minha máquina!", até chegares à aceitação... mas lá no fundo sabes que a solução nunca é tão simples quanto parece. Se já passaste por todas estas fases (e muitas mais!), esta t-shirt é para ti! Porque quem programa sabe que o verdadeiro bug está sempre a um "não deveria acontecer" de distância! 😅💻🛠️',
    category: "Canecas",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/mug-debugging.png",
    rating: {
      rate: 3.8,
      count: 230,
    },
  },
  {
    id: 7,
    title: "Hello World",
    price: 7.5,
    description:
      'Para quem vive entre o código e o estilo! Estas meias são a combinação perfeita de geek e confortável, com 101010101 para os amantes de binário e Hello World para os que sabem que toda jornada começa com um simples "olá" ao computador. Porque até os pés merecem um pouco de programação! 🧦💻👾',
    category: "Meias",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/socks-00.png",
    rating: {
      rate: 4.2,
      count: 125,
    },
  },
  {
    id: 12,
    title: "do or do not. no try",
    price: 19.85,
    description:
      'Sabias que até o mestre Yoda tem algo a ensinar aos programadores? Quando o código está a falhar, não há espaço para tentar. Ou faz ou não faz — e, se não está a funcionar, o comando "try" não vai salvar ninguém! Se és fã de Star Wars e da sabedoria do mestre Jedi, esta t-shirt é para ti. Porque na programação, tal como na Força, não há lugar para meias medidas! ⚡💻👽',
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/do-or-do-not.png",
    rating: {
      rate: 4.5,
      count: 132,
    },
  },
  {
    id: 4,
    title: "10 tipos de pessoas",
    price: 19.9,
    description:
      'Para os amantes de códigos e piadas geek, esta t-shirt é o que falta para mostrar a tua verdadeira natureza! Porque, sejamos sinceros, há aqueles que sabem que "10" não é só o número de uma contagem… é 2 em binário! Se estás no lado dos que entendem, esta é para ti. Para os outros... bem, vamos deixar a matemática para depois! 😎👕',
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-10.png",
    rating: {
      rate: 4.7,
      count: 322,
    },
  },
  {
    id: 8,
    title: "Erro 404: não estou disponível!",
    price: 18.5,
    description:
      'Quando o mundo tenta chamar a tua atenção, mas tu estás demasiado ocupado... resolvendo bugs, claro! Esta t-shirt é para aqueles momentos em que o "não disponível" é o teu estado natural. Porque, convenhamos, a melhor resposta para muitas coisas na vida é simplesmente um "Erro 404". 🖥️🚫',
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt_Error.png",
    rating: {
      rate: 4.7,
      count: 100,
    },
  },
  {
    id: 6,
    title: "não perturbar, estou a programar!",
    price: 7.5,
    description:
      'A solução perfeita para quem não consegue desligar, nem quando está de meias! Com estas meias, o código nunca pára. Ideal para aqueles momentos em que o mundo lá fora não entende que "estou a programar, não me chames". Porque cada linha de código é uma linha de foco – e quem tem um bug para resolver, não tem tempo para distrações! 🧦💻🚫',
    category: "Meias",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/do-not-disturb.png",
    rating: {
      rate: 3.2,
      count: 67,
    },
  },
  {
    id: 5,
    title: "comer, programar, dormir, repetir!",
    price: 16.5,
    description:
      "A rotina perfeita para quem vive no loop infinito do código! Esta t-shirt é para quem só precisa de três coisas na vida: comer, codificar e dormir. E repete. Se o teu ciclo de vida é basicamente isso (com algumas pausas para café, claro), então este design foi feito para ti! Ideal para programadores, devs e todos os que sabem que a vida é apenas um código em execução... com alguns erros de vez em quando! 😎💻🍕💤",
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-eat-sleep-code.png",
    rating: {
      rate: 4.3,
      count: 234,
    },
  },
  {
    id: 3,
    title: "És o CSS do meu HTML",
    price: 25,
    description:
      "A combinação perfeita entre estilo e estrutura! Se o teu código HTML sem o teu CSS é como um corpo sem alma, esta t-shirt é para ti. Porque sem um bom design, o conteúdo não brilha! Ideal para quem sabe que a beleza está nos detalhes… e no código. 💻✨",
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-css.png",
    rating: {
      rate: 4.9,
      count: 250,
    },
  },
  {
    id: 9,
    title: "odeio.. adoro programar!",
    price: 12,
    description:
      "Aquela montanha-russa emocional que só quem programa conhece bem! Quando tudo parece dar errado, e a frustração bate forte, mas de repente... puff, o código funciona! Uma mistura de ódio e amor, porque ser programador é exatamente isso: uma relação complicada, mas cheia de recompensas. Se tu também já passaste por isso, esta t-shirt é para ti! 💻❤️🤦‍♂️",
    category: "Canecas",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/mug-programming.png",
    rating: {
      rate: 4.6,
      count: 99,
    },
  },
  {
    id: 2,
    title: "Programar: 10% vs. 90%",
    price: 20,
    description:
      'Quando achas que já entendeste o problema, mas ainda precisas de mais 3 horas de "esboços" no quadro branco. Ideal para quem passa mais tempo a tentar perceber o que está a acontecer do que realmente a programar. Porque ser programador é, antes de tudo, entender o caos antes de o controlar!',
    category: "T-shirts",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-10-90.png",
    rating: {
      rate: 3.8,
      count: 150,
    },
  },
  {
    id: 11,
    title: "se café vazio...",
    price: 14,
    description:
      "O código perfeito para quem sabe que a vida de um programador depende de um único ciclo: se o café acabar, refilamos; se ainda houver café, bebemos. Nada de complicações — apenas lógica pura! Se o teu estado de espírito e produtividade estão diretamente ligados ao nível da tua xícara de café, então esta t-shirt é para ti! ☕💻🔁",
    category: "Canecas",
    image:
      "https://deisishop.pythonanywhere.com/media/produto_imagens/muf-coffee.png",
    rating: {
      rate: 3.6,
      count: 140,
    },
  },
];
