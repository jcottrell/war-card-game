let deck = new Deck()
deck.shuffle()

let player1 = new Hand(deck.draw(26))
let player2 = new Hand(deck.draw(26))

function getCardsForDisplay(cards) {
    return cards.map(function (card) {
        return card.show()
    }).join(', ')
}

function addCardsToWinner(card1, card2, cardsForWinner) {
    console.log(
        '  Player 1 - ', card1.show(),
        '  |',
        '  Player 2 - ', card2.show()
    )
    if (card1.getValue() === card2.getValue()) {
        console.log('  War!')
        // to avoid one of the players running out of cards while playing this
        //  part of the game
        let numberOfCardsToGamble = Math.min(
            player1.getNumberOfRemainingCards(),
            player2.getNumberOfRemainingCards(),
            4
        ) - 1 // subtract one so that last card can be the deciding card
        let gamblingCardsOfPlayer1 = player1.draw(numberOfCardsToGamble)
        let gamblingCardsOfPlayer2 = player2.draw(numberOfCardsToGamble)
        let displayPlayer1Cards = getCardsForDisplay(gamblingCardsOfPlayer1)
        let displayPlayer2Cards = getCardsForDisplay(gamblingCardsOfPlayer2)
        console.log(
            '  Player one\'s face-down cards:',
            displayPlayer1Cards
        )
        console.log(
            '  Player two\'s face-down cards:',
            displayPlayer2Cards
        )
        let nextCardForPlayer1 = player1.draw()[0]
        let nextCardForPlayer2 = player2.draw()[0]
        cardsForWinner = cardsForWinner.concat(
            gamblingCardsOfPlayer1,
            [nextCardForPlayer1],
            gamblingCardsOfPlayer2,
            [nextCardForPlayer2]
        )
        addCardsToWinner(nextCardForPlayer1, nextCardForPlayer2, cardsForWinner)
    } else if (card1.getValue() > card2.getValue()) {
        console.log('  Player 1 wins ('+getCardsForDisplay(cardsForWinner)+')')
        player1.add(cardsForWinner)
    } else {
        console.log('  Player 2 wins ('+getCardsForDisplay(cardsForWinner)+')')
        player2.add(cardsForWinner)
    }
}

let round = 1
while(!player1.isWinner() && !player2.isWinner()) {
    let cardOfPlayer1 = player1.draw()[0]
    let cardOfPlayer2 = player2.draw()[0]
    // TODO one improvement could be using a third, temporary Hand class for the
    //  cards that are up for grabs, i.e. cardsToTheWinner
    let cardsGoingToTheWinner = [cardOfPlayer1].concat([cardOfPlayer2])
    console.log('Round #', round)
    addCardsToWinner(cardOfPlayer1, cardOfPlayer2, cardsGoingToTheWinner)
    round += 1
}

if (player1.isWinner()) {
    console.log('Player 1 wins the game!')
} else {
    console.log('Player 2 wins the game!')
}
