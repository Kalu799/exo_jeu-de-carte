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
// si win = true : le joueur a gagné
// si win = false : le joueur a perdu
let win = null

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
      histoTirage.push(carte)
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
  return Math.floor(Math.random() * 10) + 1
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
// fct qui s'exec quand on click sur une carte
//
const CardClick = (e) => {
  //console.log('click')
  const carte = e.target
  //console.log(carte)

  // si le click est bien sur une carte
  if(carte.classList.contains('carte')) {
    //console.log(carte.dataset.value)
    //console.log(carteO[0])

    // si la valeur de la carte cliquée est la même que celle de la carte de l'ordi
    if(carte.dataset.value == carteO[0]) {
      //console.log("les cartes correspondent")

      // on cache la carte utilisée
      Hide(carte)
      // on ajoute un point
      points = (points + 1)
      // on met à jour l'affichage du score
      ScoreUpdate()
      // on tire une nouvelle carte pour l'ordi et on l'affiche
      if(points == 5) {
        //console.log("vous avez gagné")
        win = true
        Endgame()
      }
      else if (histoTirage.length < 10) {
        // on tire la première carte de l'ordi
        GetComputerCard()
        // on affiche la carte de l'ordi
        RenderComputerCard()
        //console.log(histoTirage)
      }
      else {
        //console.log('perdu')
        win = false
        Endgame()
      }
    }
    else {
      //console.log("ce ne sont pas les mêmes cartes")
      alert('les cartes ne sont pas identiques')
    }
  }
}


//
// fct qui met à jour l'affichage du score
//
const ScoreUpdate = () => {
  $points.innerText = points
}


//
// fct qui s'exec quand on click sur 'skip'
//
const Skip = async () => {
  //console.log('skip')
  if(histoTirage.length < 10) {
    // on tire la première carte de l'ordi
    await GetComputerCard()
    // on affiche la carte de l'ordi
    await RenderComputerCard()
    //console.log(histoTirage)
  }
  else {
    //console.log('perdu')
    win = false
    Endgame()
  }
}


//
// fct qui s'exec à la fin du jeu
//
const Endgame = () => {

  // si le joueur a gagné
  if(win === true) {
    console.log('win')
    alert('Bravo ! Vous avez gagné !')
  }

  // si le joueur a perdu
  else if(win === false) {
    console.log('loose')
    alert('Vous avez perdu.')
  }

  else {
    //console.log('fin alternative')
    alert('Bravo vous avez débloqué une fin alternative ! Comment êtes-vous arrivez ici ?')
  }
}


//
// fct qui initialise tout
//
const Init = () => {

  // écoute le click sur les cartes du joueur
  $cartesJoueur.addEventListener('click', CardClick)

  // écoute du btn 'start'
  $startBtn.addEventListener('click', Start)

  // écoute du btn 'skip'
  $skipBtn.addEventListener('click', Skip)

}

Init()