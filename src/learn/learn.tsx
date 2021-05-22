import React, { useEffect, useState } from 'react';
import { ChooseSuit } from './choose-suit/choose-suit';
import axios from 'axios';
import { ChooseCard } from './choose-card/choose-card';

const apiBase = 'https://api.hallb.me'

const Learn = () => {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(apiBase + '/tarot-cards').then(res => setAllCards(res.data))
  }, [])

  if (cards && cards.length > 0) {
    return (
      <ChooseCard
        cards={cards}>
      </ChooseCard>
    )
  } else {
    return (
      <ChooseSuit 
          cards={allCards}
          onSelection={(suit: string) => setCards(allCards.filter((card: any) => card.suit == suit)) }
      ></ChooseSuit>
    )
  }
}

export { Learn }