import React, { useEffect, useState } from 'react';
import { ChooseSuit } from './choose-suit/choose-suit';
import axios from 'axios';
import { ChooseCard } from './choose-card/choose-card';
import { CardDescription } from './card-description/card-description';

const apiBase = 'https://api.hallb.me'

const Learn = () => {
  const [allCards, setAllCards] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    axios.get(apiBase + '/tarot-cards').then(res => setAllCards(res.data))
  }, [])

  if (cards && cards.length > 1) {
    return (
      <ChooseCard
        cards={cards}
        onSelection={(card: any) => setCards([card])}>
      </ChooseCard>
    )
  } else if (cards && cards.length == 1) {
    return (
      <CardDescription card={cards[0]}></CardDescription>
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