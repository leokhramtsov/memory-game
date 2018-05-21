import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import Card from './Card';
import Navbar from './Navbar';
import './App.css';

const CardState = {
  HIDING: 0,
  SHOWING: 1,
  MATCHING: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    
    // The cards that we will use for our state.
    let cards = [
      {id: 0, cardState: CardState.HIDING, bgColor: 'red'},
      {id: 1, cardState: CardState.HIDING, bgColor: 'red'},
      {id: 2, cardState: CardState.HIDING, bgColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, bgColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, bgColor: 'green'},
      {id: 5, cardState: CardState.HIDING, bgColor: 'green'},
      {id: 6, cardState: CardState.HIDING, bgColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, bgColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, bgColor: 'black'},
      {id: 9, cardState: CardState.HIDING, bgColor: 'black'},
      {id: 10, cardState: CardState.HIDING, bgColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, bgColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, bgColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, bgColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, bgColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, bgColor: 'lightskyblue'}
    ];
    cards = shuffle(cards);
    this.state = {
      cards,
      noClick: false,
      numTurns: 0,
      numMatches: 0
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.onNewGame = this.onNewGame.bind(this);
  }
  
  handleClick(id) {
    const mapCardState = (cards, idsToChange, newCardState) => {
      return cards.map(card => {
        if (idsToChange.includes(card.id)) {
          return {...card, cardState: newCardState}
        }
        return card;
      });
    }
    
    // identify found(clicked) card 
    const foundCard = this.state.cards.find(card => card.id === id);
    
    // check if the card is already showing, if it is showing - do nothing
    //  if noClick is true, no more clicks allowed
    if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
      return;
    }
    
    let noClick = false;
    
    // map the card that was clicked on to be SHOWING
    let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);
    
    // filter out cards which are SHOWING
    const showingCards = cards.filter(card => card.cardState === CardState.SHOWING);
    
    // get SHOWING cards
    const ids = showingCards.map(card => card.id);
    
    if (showingCards.length === 2 && showingCards[0].bgColor === showingCards[1].bgColor) {
      // if matchin, set to MATCHING
      cards = mapCardState(cards, ids, CardState.MATCHING);
      // adding matched pairs  turns +1,
      this.setState(prevState => ({
        cards, noClick, numTurns: prevState.numTurns + 1, numMatches: prevState.numMatches + 1,
      }))
    } else if (showingCards.length === 2) {
      // if not matching, set back to HIDING
      let hidingCards = mapCardState(cards, ids, CardState.HIDING);
      
      noClick = true;
      
      // this will keep the cards shown for 1.3 seconds
      this.setState({cards, noClick}, () => {
        setTimeout(() => {
          // this will set the state of the cards to hiding after 1.3 seconds
          this.setState(prevState => ({
            cards: hidingCards, noClick: false, numTurns: prevState.numTurns + 1,
          }))
        }, 1300);
      });
      return;
    } // else if (showingCards.length === 2) ENDING
    
    // reach this only if there is 1 card showing that is not matched
    // or if there are 2 cards showing that match
    this.setState({cards, noClick});
  }
  
  onNewGame() {
    let cards = this.state.cards.map(card => (
      {...card, cardState: CardState.HIDING}
    ));
    cards = shuffle(cards);
    this.setState({cards, numTurns: 0, numMatches: 0})
  }

  render() {
    const cards = this.state.cards.map((card, i) => (
      <Card
        key={card.id}
        // showing is {TRUE} if CardState is not HIDING (MATCHING OR SHOWING)
        showing={card.cardState !== CardState.HIDING}
        bgColor={card.bgColor}
        onClick={() => this.handleClick(card.id)}
      />
    ));
    
    return (
      <div className="app">
      <Navbar
        onNewGame={this.onNewGame}
        numTurns={this.state.numTurns}
        numMatches={this.state.numMatches}
      />
        {cards}
      </div>
    );
  }
}

export default App;
