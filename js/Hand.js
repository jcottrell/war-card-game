class Hand extends Deck {
    constructor(cards) {
        super(cards)
    }
    isWinner() {
        return this.getNumberOfRemainingCards() === 52
    }
}
