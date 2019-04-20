import React from 'react'
import FlowerCard from './FlowerCard';

const FlowerCardList = (props) => {
  let allFlowers = props.products
  let flowerCardList = []
  for (let i = 0; i < allFlowers.length; i += 3) {
    let flowerCards = allFlowers.slice(i, Math.min(i + 3, allFlowers.length))
      .map(p => (
        <FlowerCard
          key={p._id}
          id={p._id}
          name={p.name}
          imageUrl={p.imageUrl}
          description={p.description}
          price={p.price}/>))

    let cardDeck = <div key={i} className='card-deck space-top'>{flowerCards}</div>
    flowerCardList.push(cardDeck)
  }

  return (
    <div className='row'>
      {flowerCardList}
    </div>
  )
}

export default FlowerCardList