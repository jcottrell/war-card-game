class Card {
    rank = ''
    suit = ''
    score = 0
    constructor(rank, suit, score) {
        this.rank = rank+''
        this.suit = suit
        this.score = score
    }
    getValue() {
        return this.score
    }
    show() {
        return this.rank+' '+this.suit
    }
}
