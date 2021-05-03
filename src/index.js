import "./styles.css";

// initial deck of 52 cards, undrawn and not dealt
const startingDeck = [
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [10, 1],
  [11, 1],
  [12, 1],
  [13, 1],
  [14, 1],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [7, 2],
  [8, 2],
  [9, 2],
  [10, 2],
  [11, 2],
  [12, 2],
  [13, 2],
  [14, 2],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [6, 3],
  [7, 3],
  [8, 3],
  [9, 3],
  [10, 3],
  [11, 3],
  [12, 3],
  [13, 3],
  [14, 3],
  [2, 4],
  [3, 4],
  [4, 4],
  [5, 4],
  [6, 4],
  [7, 4],
  [8, 4],
  [9, 4],
  [10, 4],
  [11, 4],
  [12, 4],
  [13, 4],
  [14, 4]
];

// straight and flush arrays to test
const strArr = [
  [2, 4],
  [3, 3],
  [4, 2],
  [5, 1],
  [6, 2]
];

const fluArr = [
  [3, 2],
  [7, 2],
  [11, 2],
  [1, 2],
  [5, 2]
];

// set up all variables for cleaner code
var startingDeckDiv = document.getElementById("starting-deck");
var dealCardBtn = document.getElementById("deal-card");
var shuffledDeckDiv = document.getElementById("shuffled-deck");
var shuffledCounterDiv = document.getElementById("shuffled-counter");
var shuffleDeckBtn = document.getElementById("shuffle-deck");
var drawnDeckDiv = document.getElementById("drawn-deck");
var drawnCounterDiv = document.getElementById("drawn-counter");
var displayDeckBtn = document.getElementById("display-decks");
var displayCardBtn = document.getElementById("display-card");
var currentHandDiv = document.getElementById("current-hand");
var handCounterDiv = document.getElementById("hand-counter");
var isStrFluDiv = document.getElementById("hand-straight");
var displayHandBtn = document.getElementById("display-hand");
var addCardBtn = document.getElementById("add-card");
var sortSuitBtn = document.getElementById("sort-suit");
var sortValueBtn = document.getElementById("sort-value");
var isStrFluBtn = document.getElementById("is-flustr");
var currentHand2Div = document.getElementById("current-hand-2");
var handCounter2Div = document.getElementById("hand-counter-2");
var isStrFlu2Div = document.getElementById("hand-straight-2");
var displayHand2Btn = document.getElementById("display-hand-2");
var addCard2Btn = document.getElementById("add-card-2");
var sortSuit2Btn = document.getElementById("sort-suit-2");
var sortValue2Btn = document.getElementById("sort-value-2");
var isStrFlu2Btn = document.getElementById("is-flustr-2");

// array to hold dealt deck
let dealtDeck = [];

// deck class and methods
class Deck {
  constructor() {
    // use slice to create an new shuffled array
    this.deck = startingDeck.slice();
    this.cards = new Cards();
  }

  shuffle() {
    const { deck } = this;
    let m = deck.length;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    // refresh display after shuffle
    this.display();

    return this;
  }

  // method to show deck in html
  display() {
    this.cards.displayCards(shuffledDeck.deck, shuffledDeckDiv, 0);
    shuffledCounterDiv.innerHTML =
      shuffledDeck.deck.filter((item) => item).length + " card(s) not drawn";
    this.cards.displayCards(dealtDeck, drawnDeckDiv, 0);
    drawnCounterDiv.innerHTML =
      dealtDeck.filter((item) => item).length + " card(s) drawn";
  }

  // deal method, added times to control number of dealt cards
  dealOne(times = 1) {
    for (let i = 1; i <= times; i++) {
      // push first index to hand
      dealtDeck.push(this.deck[0]);

      // splice out first index
      this.deck.splice(0, 1);
    }
  }

  show() {
    document.getElementById("shuffled-deck").classList.remove("back");
  }
}

// hand class and methods
class Hand {
  constructor() {
    this.deck = new Deck();
    this.cards = new Cards();
    this.hand = [];
  }

  display(hand) {
    let displayDiv = hand === "handOne" ? currentHandDiv : currentHand2Div;
    let countDiv = hand === "handOne" ? handCounterDiv : handCounter2Div;
    this.cards.displayCards(this.hand, displayDiv, 0);
    countDiv.innerHTML =
      this.hand.filter((item) => item).length + " card(s) in this hand";
  }

  // deal method
  addCard(times = 1, hand) {
    for (let i = 1; i <= times; i++) {
      // push first index to hand
      this.hand.push(shuffledDeck.deck[0]);

      // splice out first index
      shuffledDeck.deck.splice(0, 1);
    }

    this.display(hand);
    this.deck.display();
  }

  show(divName) {
    document.getElementById(divName).classList.remove("back");
  }

  // sort by suit
  sortBySuit(hand) {
    this.cardSort(this.hand, 1);
    this.display(hand);
  }

  // sort by value
  sortByValue(hand) {
    //this.hand.sort((a, b) => a[0] - b[0]);
    this.cardSort(this.hand, 0);
    this.display(hand);
  }

  // bubble sort
  cardSort(array, index) {
    for (let i = array.length - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (array[j - 1][index] > array[j][index]) {
          let tmp = array[j - 1][index];
          array[j - 1][index] = array[j][index];
          array[j][index] = tmp;
        }
      }
    }
    return array;
  }

  isFlushStraight(hand) {
    let strFluDiv = hand === "handOne" ? isStrFluDiv : isStrFlu2Div;
    let isStraight = true;
    let isFlush = true;

    // test stright and flush uncommenting one of these
    //let sorted = strArr.sort((a, b) => a[0] - b[0]);
    //let sorted = fluArr.sort((a, b) => a[0] - b[0]);

    let sorted = this.hand.sort((a, b) => a[0] - b[0]);
    let compareNum = sorted[0][0];
    let compareSuit = sorted[0][1];

    for (let i = 1; i < sorted.length; i++) {
      compareNum + 1 === sorted[i][0]
        ? (compareNum = sorted[i][0])
        : (isStraight = false);
      compareSuit === sorted[i][1]
        ? (compareSuit = sorted[i][1])
        : (isFlush = false);
    }

    strFluDiv.innerHTML = "straight: " + isStraight + ", flush: " + isFlush;
  }
}

class Cards {
  displayCards(object, div, hide) {
    let content = "";
    let rank, suit;
    let back = hide === 1 ? "back " : "";
    // loop the outer array
    for (let i = 0; i < object.length; i++) {
      // get the size of the inner array
      var innerArrayLength = object[i].length;
      // loop the inner array
      for (let j = 0; j < innerArrayLength; j++) {
        if (j === 0) {
          rank = this.getFace(object[i][j]);
        } else {
          suit = this.getSuit(object[i][j]);
        }
      }
      content +=
        '<div class="card ' +
        back +
        "rank-" +
        rank +
        " " +
        suit +
        '" "' +
        suit +
        '"><span class="rank">' +
        rank +
        '</span><span class="suit">&' +
        suit +
        ";</span></div>";
    }
    div.innerHTML = content;
  }

  getFace(rank) {
    return rank === 11
      ? "J"
      : rank === 12
      ? "Q"
      : rank === 13
      ? "K"
      : rank === 14
      ? "A"
      : rank;
  }

  getSuit(suit) {
    return suit === 1
      ? "clubs"
      : suit === 2
      ? "diams"
      : suit === 3
      ? "hearts"
      : "spades";
  }
}

// load up original deck order by default
const newCards = new Cards();
newCards.displayCards(startingDeck, startingDeckDiv, 0);

// on page load, shuffle the deck and display as undrawn
const shuffledDeck = new Deck();
shuffledDeck.shuffle();

// on page load, create two hands and draw 5 cards from undrawn
const handOne = new Hand();
const handTwo = new Hand();
handOne.display("handOne");
handOne.addCard(5, "handOne");
handTwo.display("handTwo");
handTwo.addCard(5, "handTwo");

// Button Actions

// draw one card and display drawn deck and show updated deck
dealCardBtn.onclick = () => {
  shuffledDeck.dealOne();
  shuffledDeck.display();
};

// shuffle undrawn deck and refresh display
displayDeckBtn.onclick = () => {
  shuffledDeck.show();
};

// shuffle undrawn deck and refresh display
shuffleDeckBtn.onclick = () => {
  shuffledDeck.shuffle();
};

displayHandBtn.onclick = () => {
  handOne.show("current-hand");
};

displayHand2Btn.onclick = () => {
  handTwo.show("current-hand-2");
};

// take card from drawn deck and add to hand
addCardBtn.onclick = () => {
  handOne.addCard(1, "handOne");
};

// take card from drawn deck and add to hand
addCard2Btn.onclick = () => {
  handTwo.addCard(1, "handTwo");
};

// sort by suit
sortSuitBtn.onclick = () => {
  handOne.sortBySuit("handOne");
};

// sort by value
sortValueBtn.onclick = () => {
  handOne.sortByValue("handOne");
};

// sort by value
isStrFluBtn.onclick = () => {
  handOne.isFlushStraight("handOne");
};

// sort by suit
sortSuit2Btn.onclick = () => {
  handTwo.sortBySuit("handTwo");
};

// sort by value
sortValue2Btn.onclick = () => {
  handTwo.sortByValue("handTwo");
};

// sort by value
isStrFlu2Btn.onclick = () => {
  handTwo.isFlushStraight("handTwo");
};
