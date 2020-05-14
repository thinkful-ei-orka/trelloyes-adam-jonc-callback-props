import React, { Component } from 'react';
import List from './List'
import './App.css';

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };
  constructor (props){
    super(props)
    this.state={store:props.store}
  }

  onDeleteClick = (listKey='not assigned',cardKey='not assigned') => {
    const newStore = this.state.store;
    newStore.lists[listKey-1].cardIds=newStore.lists[listKey-1].cardIds.filter(card=>card!==cardKey)
    this.setState({store:newStore})
  }
  onNewRandomCard = (listKey) =>{
    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      }
    }
    //Creating instance of a new card
    const createdCard=newRandomCard();
    //Create a copy of the store to work with (no direct manipulation)
    const newStore = this.state.store;
    //Add the newly created card (in it's entirety) to the list of cards to pull from (ie-'allCards')
    newStore.allCards[createdCard.id]=createdCard
    //Add the id of the  newly created card to the array of cards to be renered within that specific list
    newStore.lists.find(list=>list.id===listKey).cardIds=[...newStore.lists.find(list=>list.id===listKey).cardIds,createdCard.id]
    //Set the state (store) to the copied and edited store object
    this.setState({store:newStore})
  }
  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              listKey={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              deleteHandler={this.onDeleteClick}
              newCard={this.onNewRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
