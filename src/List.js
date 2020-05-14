import React from 'react';
import Card from './Card'
import './List.css';

export default function List(props) {
  return (
    <section className='List'>
      <header className='List-header'>
        <h2>{props.header}</h2>
      </header>
      <div className='List-cards'>
        {props.cards.map((card) =>
          <Card
            key={card.id}
            cardKey={card.id}
            title={card.title}
            content={card.content}
            deleteHandler={props.deleteHandler}
            listKey={props.listKey}
          />
        )}
        <button
          type='button'
          className='List-add-button'
          onClick={()=>props.newCard(props.listKey)}
        >
          + Add Random Card
        </button>
      </div>
    </section>
  )
}
