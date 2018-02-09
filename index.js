// __________________________________________________________
// =================GAME Setup===============================
var game = document.getElementById('game');
var cardData = [
		{img: './pictures/002-avatar-11.png', id: 1,},
		{img: './pictures/003-avatar-10.png', id: 2,},
		{img: './pictures/004-avatar-9.png', id: 3,},
		{img: './pictures/005-avatar-8.png', id: 4,},
		{img: './pictures/006-avatar-7.png', id: 5,},
		{img: './pictures/007-avatar-1.png', id: 6,},
		{img: './pictures/008-avatar-5.png', id: 7,},
		{img: './pictures/009-avatar-4.png', id: 8,},
		{img: './pictures/010-avatar-3.png', id: 9,},
		{img: './pictures/011-avatar-2.png', id: 10,},
		{img: './pictures/012-avatar.png', id: 11,},
		{img: './pictures/013-avatar-6.png', id: 12,},
		{img: './pictures/002-avatar-11.png', id: 13,},
		{img: './pictures/003-avatar-10.png', id: 14,},
		{img: './pictures/004-avatar-9.png', id: 15,},
		{img: './pictures/005-avatar-8.png', id: 16,},
		{img: './pictures/006-avatar-7.png', id: 17,},
		{img: './pictures/007-avatar-1.png', id: 18,},
		{img: './pictures/008-avatar-5.png', id: 19,},
		{img: './pictures/009-avatar-4.png', id: 20,},
		{img: './pictures/010-avatar-3.png', id: 21,},
		{img: './pictures/011-avatar-2.png', id: 22,},
		{img: './pictures/012-avatar.png', id: 23,},
		{img: './pictures/013-avatar-6.png', id: 24,},
];

function startGame(){
  removeChildren()
  cardData = shuffle(cardData)
  cardData.forEach((card)=>{
    var newCard = document.createElement("div")
      newCard.setAttribute('class', 'card')
 
    var newFront = document.createElement("img")
      newFront.setAttribute('src', './pictures/001-pokeball.png')
      newFront.setAttribute('class', 'front')
    
    var newPoke = document.createElement("img")
      newPoke.setAttribute('class', 'back')
      
    newCard.setAttribute('id', card.id)
    newPoke.setAttribute('src', card.img)
    newCard.appendChild(newFront)
    newCard.appendChild(newPoke)
    game.appendChild(newCard)
  })
  addLogic()
  document.querySelector('#game').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function removeChildren(){
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
  document.querySelector('#count').innerHTML = `Count: ${count}`
  count = 0;
}

function shuffle(arr) {
  var m = arr.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function addLogic(){
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flip)
  }
}

document.querySelector('.retry').addEventListener('click', startGame)
document.querySelectorAll('.retry')[1].addEventListener('click', startGame)

// __________________________________________________________
// =================GAME LOGIC===============================
var cards = document.getElementsByClassName('card');
var count = 0
var prevFlip= {
  id: 0,
  img: '',
};

function flip(){
 
//   Test card is not matched or the same card
  if(this.getAttribute('name') !== 'matched' && this.id !== prevFlip.id){
    count++
    document.querySelector('#count').innerHTML = `Count: ${count}`
    this.classList.toggle('flipped')
    this.setAttribute('name', 'showing');
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle('avoid-clicks')
    }
//    Test if its a 2nd click
    if(count % 2 === 0 && count !== 0){
//       Test if cards are equal
      if(prevFlip.img === this.childNodes[1].getAttribute('src')){
        if(this.getAttribute('name') === 'showing'){
          lock()
        }
      }
      else {setTimeout(flipBack, 1000);}
   }
//   1st click  
    else {
      prevFlip.img = this.childNodes[1].getAttribute('src');
      prevFlip.id = this.id;
      unlock()
    }
  }
}

function flipBack(){
 for (var i = 0; i < cards.length; i++) {
  if(cards[i].getAttribute('name') === 'showing'){
    cards[i].classList.toggle('flipped')
    cards[i].setAttribute('name', 'unmatched')
    prevFlip.img = ''
    prevFlip.id = 0
  }
 }
 unlock()
}

function unlock(){
  for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle('avoid-clicks')
  }
}

function lock(){
  for (var i = 0; i < cards.length; i++) {
  if(cards[i].getAttribute('name') === 'showing'){
    cards[i].setAttribute('name', 'matched')
    cards[i].childNodes[1].setAttribute('src', './pictures/pokecoin.png')
    cards[i].classList.toggle('matched')
    prevFlip.img = ''
    prevFlip.id = 0
  }
 }
 if(testVictory()){
   var winState = document.createElement("img")
    winState.setAttribute('id', 'victory')
    winState.setAttribute('src', 'https://media1.tenor.com/images/0ad1882728675604efe70fc224c5711f/tenor.gif?itemid=5110305')
    
    removeChildren();
    game.appendChild(winState)
  }
  unlock()
}

function testVictory(){
  var ans = true;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i].getAttribute('name') !== 'matched') ans = false
  }
  return ans
}


