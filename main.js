/**********
/*  DOM 
**********/

// btns
const $startBtn = document.querySelector('#startBtn')
const $skipBtn = document.querySelector('#skipBtn')
const $replayBtn = document.querySelector('#replayBtn')

// div où on affiche les cartes
const $carteOrdi = document.querySelector('#carteOrdi')
const $cartesJoueur = document.querySelector('#cartesJoueur')

// cartes
const $cartes = document.querySelectorAll('.carte')

// points
const $points = document.querySelector('.points')

const $textes = document.querySelector('.txt')

/**********
/*  VAR
**********/

// les cartes du joueur
let cartesJ = []
// la carte actuelle de l'ordi
let carteO = []
// historique des cartes tirées par l'ordi
let histoTirage = []
// les points du joueur
let points = 0

/**********
/*  FCT 
**********/

//
// fct qui démare le jeu
//
const Start = async () => {

  // on cache le btn 'start'
  Hide($startBtn)
  // on affiche le btn 'skip'
  Show($skipBtn)

  Show($textes)

  // on tire les 5 cartes du joueur
  await GetPlayerCards()
  // on affiche les cartes du joueur
  await RenderPlayerCards()

  // on tire la première carte de l'ordi
  await GetComputerCard()
  // on affiche la carte de l'ordi
  await RenderComputerCard()

}

//
// fct qui tire la carte de l'odri
//
const GetComputerCard = () => {
  carteO = []
  while (carteO.length < 1) {
    let carte = GetRandomNumb()
    if (!histoTirage.includes(carte)) {
      carteO.push(carte)
    }
  }
}


//
// fct qui affiche la carte de l'odri
//
const RenderComputerCard = () => {
  $carteOrdi.innerHTML = null
  let template = `
    <div class="carte" data-value="${carteO[0]}">${carteO[0]}</div>
  `
  $carteOrdi.innerHTML = template
}


//
// fct qui affiche les cartes du joueur
//
const RenderPlayerCards = () => {
  $cartesJoueur.innerHTML = null
  cartesJ.forEach(carte => {
    let template = `
      <div class="carte" data-value="${carte}">${carte}</div>
    `
    $cartesJoueur.innerHTML += template
  })
}


//
// fct qui tire les 5 cartes du joueur
//
const GetPlayerCards = () => {

  cartesJ = []
  // génère un nbre aléatoire pour chaque carte jusqu'à en avoir 5 différentes
  while (cartesJ.length < 5) {
    let carte = GetRandomNumb()
    // Vérifie si la carte existe déjà
    if (!cartesJ.includes(carte)) {
        cartesJ.push(carte)
    }
  }
  // trie les cartes
  cartesJ.sort(CompareNumbers)
  //console.log(cartesJ)

}


//
// fct qui trie les cartes par ordre croissant
//
function CompareNumbers(a, b) {
  return a - b;
}


//
// fct qui génère un nbre aléatoire compris entre 1 et 10
//
function GetRandomNumb() {
  return Math.floor(Math.random() * (10 - 1) + 1);
}


//
// cache quelque chose
//
const Hide = (e) => {
  e.classList.add('hidden')
}


//
// affiche quelque chose
//
const Show = (e) => {
  e.classList.remove('hidden')
}


//
// fct qui initialise tout
//
const Init = () => {

  // écoute le click sur les cartes
  //$cartes.addEventListener('click', )

  // écoute du btn 'start'
  $startBtn.addEventListener('click', Start)

}

Init()