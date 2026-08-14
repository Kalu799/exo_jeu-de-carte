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

// timer
const $temps = document.querySelector('.temps')

// texte
const $textes = document.querySelector('.txt')

// zone pour drop les cartes
const $drop = document.querySelector('.drop');

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
// raison de la défaite
let messageLoose = null
// temps écoulé
let tempsEcoule = 0
// variable pour le timer
let myInterval = null
// variable pour si une carte est drag
let dragged = null

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
  // on affiche la zone de drop
  Show($drop)
  // on affiche les textes
  Show($textes)

  // on tire les 5 cartes du joueur
  await GetPlayerCards()
  // on affiche les cartes du joueur
  await RenderPlayerCards()

  // on tire la première carte de l'ordi
  await GetComputerCard()
  // on affiche la carte de l'ordi
  await RenderComputerCard()

  // lance le timer
  Timer()
}

//
// fct qui tire la carte de l'odri
//
const GetComputerCard = () => {
  carteO = []
  while (carteO.length < 1) {

    let carteNbre = GetRandomNumb()
    let carteColor = GetRandomColor()

    const carteExiste = histoTirage.some(carte => {
      return carte[0] === carteNbre && carte[1] === carteColor
    })

    if (!carteExiste) {

      const carte = [carteNbre, carteColor]

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
  //console.log(carteO)
  //console.log(histoTirage)
  let template = `
    <div class="carte ${carteO[0][1]}" data-value="${carteO[0][0]}">${carteO[0][0]}</div>
  `
  $carteOrdi.innerHTML = template
}

//
// fct qui affiche les cartes du joueur
//
const RenderPlayerCards = () => {
  $cartesJoueur.innerHTML = null
  cartesJ.forEach(carte => {
    //console.log(carte)
    let template = `
      <div class="carte ${carte[1]} drag" data-value="${carte[0]}" draggable="true">${carte[0]}</div>
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

    let carteNbre = GetRandomNumb()
    let carteColor = GetRandomColor()

    // Vérifie si une carte avec le même nombre ET la même couleur existe déjà
    const carteExiste = cartesJ.some(carte => {
      return carte[0] === carteNbre && carte[1] === carteColor
    })

    if (!carteExiste) {
      cartesJ.push([carteNbre, carteColor])
    }
  }
  // trie les cartes
  //cartesJ.sort(CompareNumbers)
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
// fct qui génère une couleur aléatoire pour la carte
//
function GetRandomColor() {
  let colorNbre = Math.floor(Math.random() * 2)
  if (colorNbre === 0) {
    return ('rouge')
  }
  else if (colorNbre === 1) {
    return ('noire')
  }
  else {
    return ('jsp comment je suis arrivé ici')
  }
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
const CardClick = (carte) => {

  // récupère les informations de la carte
  const carteNbre = Number(carte.dataset.value)
  const carteColor = carte.classList.contains('rouge')
    ? 'rouge'
    : 'noire'

  // vérifie si la carte correspond à celle de l'ordinateur
  if (
    carteNbre === carteO[0][0] &&
    carteColor === carteO[0][1]
  ) {

    console.log("Les cartes correspondent")

    // on cache la carte utilisée
    Hide(carte)

    // on ajoute un point
    points = points + 1

    // on met à jour l'affichage du score
    ScoreUpdate()

    // on tire une nouvelle carte
    if (points === 5) {
      win = true
      Endgame()
    }

    else if (histoTirage.length < 20) {
      GetComputerCard()
      RenderComputerCard()
    }

    else {
      messageLoose = "Toutes les cartes ont été tirées."
      win = false
      Endgame()
    }

    return true
  }

  // mauvaise carte
  else {
    alert("La carte choisie ne correspond pas à celle de l'ordinateur.")
    return false
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
  if (histoTirage.length < 20) {
    // on tire la première carte de l'ordi
    await GetComputerCard()
    // on affiche la carte de l'ordi
    await RenderComputerCard()
    //console.log(histoTirage)
  }
  else {
    //console.log('perdu')
    messageLoose = "Toutes les cartes ont été tirées."
    win = false
    Endgame()
  }
}

//
// fct qui s'exec à la fin du jeu
//
const Endgame = () => {

  // si le joueur a gagné
  if (win === true) {
    console.log('win')
    clearInterval(myInterval)
    Hide($skipBtn)
    Show($replayBtn)
    alert('Bravo ! Vous avez gagné !')
  }

  // si le joueur a perdu
  else if (win === false) {
    console.log('loose')
    clearInterval(myInterval)
    Hide($skipBtn)
    Show($replayBtn)
    alert(messageLoose + ' Vous avez perdu.')
  }

  else {
    //console.log('fin alternative')
    alert('Bravo vous avez débloqué une fin alternative ! Comment êtes-vous arrivez ici ?')
  }
}

//
// fct qui lance le restart de la partie
//
const Restart = () => {
  //console.log('restart')

  // reset les var avec leurs valeurs par défaut
  cartesJ = []
  carteO = []
  histoTirage = []
  points = 0
  win = null
  messageLoose = null
  tempsEcoule = 0

  // cache le btn replay
  Hide($replayBtn)
  // update le score
  ScoreUpdate()
  // démare une nouvelle partie
  Start()
}

//
// fcts du timer
//
const Timer = () => {
  $temps.innerText = 60
  myInterval = setInterval(Decompte, 1000)
}

const Decompte = () => {
  if (tempsEcoule < 60) {
    tempsEcoule = tempsEcoule + 1
    let tempsDisplay = (60 - tempsEcoule)
    //console.log(tempsEcoule)
    $temps.innerText = tempsDisplay
  }
  else if (tempsEcoule === 60) {
    messageLoose = "Le temps est écoulé."
    win = false
    Endgame()
  }
}

//
// fct qui initialise tout
//
const Init = () => {

  // 
  // Drag & drop
  // 

  // début du drag
  $cartesJoueur.addEventListener('dragstart', e => {
    if (e.target.classList.contains('drag')) {
      dragged = e.target
      dragged.classList.add('active')
      e.dataTransfer.effectAllowed = "move"
    }
  })

  // autorise le drop
  $drop.addEventListener('dragover', e => {
    e.preventDefault()
    $drop.classList.add('active')
  })

  // quitte la zone
  $drop.addEventListener('dragleave', e => {
    $drop.classList.remove('active')
  })

  // drop
  $drop.addEventListener('drop', e => {
    e.preventDefault()
    $drop.classList.remove('active')
    if (!dragged) return
    const bonneCarte = CardClick(dragged)
    if (!bonneCarte) {
      $cartesJoueur.appendChild(dragged)
    }
    dragged.classList.remove('active')
    dragged = null
  })


  // 
  // Boutons
  // 

  $startBtn.addEventListener('click', Start)
  $skipBtn.addEventListener('click', Skip)
  $replayBtn.addEventListener('click', Restart)
}

Init()