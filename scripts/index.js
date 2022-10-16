const shuffle = document.getElementById('practice-towns');
const draw = document.getElementById('draw-deck');
const spread = document.getElementById('spread');
const sp_1 = document.getElementById('spread-1');
const sp_2 = document.getElementById('spread-2');
const sp_3 = document.getElementById('spread-3');
const last = document.getElementById('last-selected');

const baseCards = [
    'wood', 'wood', 'wood', 
    'glass', 'glass', 'glass', 
    'stone', 'stone', 'stone', 
    'brick', 'brick', 'brick', 
    'wheat', 'wheat', 'wheat'
];

let shuffled = [];
let threeCards = [];

let shuffledDeck = () => {
    let deck = [...baseCards];

    while(deck.length > 0) {
        let heldCard;
        let rand = Math.floor(Math.random() * deck.length);

        heldCard = deck[rand];
        shuffled.push(heldCard);
        deck.splice(rand, 1);
    }

    // need to comment this out if displaying Draw Deck
    draw.innerHTML = '<h3>Ready to Draw</h3>'

    // displayDrawDeck(shuffled);
}

let threeCardSpread =() => {
    
    if(threeCards.length <= 0) {
        for(let i = 0; i < 3; i++) {
            threeCards.push(shuffled[0]);
            shuffled.shift();
        }
    }

    threeCards.map((x, i) => {

        if(i === 0) {
            sp_1.innerText = x;
            sp_1.style = `
                background-color: ${setColor(x)};
                color: whitesmoke;
            `;
        } else if (i === 1) {
            sp_2.innerText = x;
            sp_2.style = `
            background-color: ${setColor(x)};
            color: whitesmoke;
            `;  
        } else {
            sp_3.innerText = x;
            sp_3.style =`
            background-color: ${setColor(x)};
            color: whitesmoke;
            `;
        }
    });

    displayDrawDeck(shuffled);
}

function displayDrawDeck(deck) {

    /* NOTE: KEEP 
        - Keeping this here just in case I need to see the display later.
        - #draw-deck: in HTML will need to be uncommented out to display
    */


    // while(draw.firstChild) {
    //     draw.removeChild(draw.firstChild);
    // }

    // deck.map((x, i) => {
    //     let p = document.createElement('p');
    //     p.setAttribute('id',`card-${i+1}`);
    //     p.innerText = x;
    //     p.style = `
    //         color: ${setColor(x)};
    //         font-weight: strong;
    //     `
    //     draw.appendChild(p);
    // });

}

function setColor(value) {
    let color = 
        value === 'wood'  ? 'rgb(79, 50, 33)' : 
        value === 'brick' ? 'red' :
        value === 'glass' ? 'darkblue' :
        value === 'stone' ? 'darkgray' :
        'darkgoldenrod';
    
    return color;
}

function chosenCard(x) {
    let pos = x.id[x.id.length - 1] - 1;
    let topCard = shuffled[0];

    shuffled.push(threeCards[pos]);
    lastSelected(threeCards[pos]);
    threeCards.splice(pos, 1, topCard);
    shuffled.shift();

    // console.table('Shuffled:',shuffled);
    // console.table('3 Cards:',threeCards);

    threeCardSpread();
}

function lastSelected(card) {
    last.innerText = `Last Selected: ${card}`;
    last.style = `
        background-color: ${setColor(card)};
        text-align: center;
    `
}

// Event Listeners
shuffle.firstElementChild.addEventListener('click', shuffledDeck);
shuffle.childNodes[5].addEventListener('click', threeCardSpread);

sp_1.addEventListener("click", () => chosenCard(sp_1));
sp_2.addEventListener("click", () => chosenCard(sp_2));
sp_3.addEventListener("click", () => chosenCard(sp_3));