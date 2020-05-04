class Deck {
    cards = []
    constructor(initialCards = []) {
        if (initialCards.length !== 0) {
            this.cards = initialCards
        } else {
            const suits = ['♤', '♡', '♢', '♧']
            for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
                for (let i = 2; i <= 14; i += 1) {
                    let rank = i
                    if (rank > 10) {
                        if (rank === 11) {
                            rank = 'J'
                        } else if (rank === 12) {
                            rank = 'Q'
                        } else if (rank === 13) {
                            rank = 'K'
                        } else if (rank === 14) {
                            rank = 'A'
                        }
                    }
                    this.cards.push(new Card(rank, suits[suitIndex], i))
                }
            }
        }
    }
    shuffle(numberOfTimesToShuffle = 1) {
        for (let i = 0; i < numberOfTimesToShuffle * 52; i += 1) {
            let randomCardIndex = Math.floor(Math.random() * 52)
            let randomCard = this.cards[randomCardIndex]
            this.removeIndex(randomCardIndex)
            this.cards.splice(0, 0, randomCard)
        }
    }
    removeIndex(i) {
        this.cards = (this.cards.slice(0, i)).concat(this.cards.slice(i + 1))
    }
    display() {
        this.cards.forEach(card => console.log(card.show()))
    }
    draw(numberToDraw = 1) {
        const cardsToReturn = this.cards.slice(0, numberToDraw)
        this.cards = this.cards.slice(numberToDraw)
        return cardsToReturn
    }
    getNumberOfRemainingCards() {
        return this.cards.length
    }
    add(cardsToAdd) {
        this.cards = this.cards.concat(cardsToAdd)
    }
}
