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
  onDeleteClick = (listKey='not assigned',cardKey='not assigned') => {
    console.log(this.state)
    this.setState(
      this.props.store.lists.find(list=>list.id===listKey).cardIds=this.props.store.lists.find(list=>list.id===listKey).cardIds.filter(card=>card!==cardKey)
    )
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
    this.setState(
      ()=>{let createdCard=newRandomCard()
      this.props.store.allCards[createdCard.id]=createdCard
console.log(this.props.store.allCards)
console.log('clicked',createdCard.id)

      this.props.store.lists.find(list=>list.id===listKey).cardIds=[...this.props.store.lists.find(list=>list.id===listKey).cardIds,createdCard.id]
console.log(this.props.store.lists.find(list=>list.id===listKey).cardIds)
      })
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
