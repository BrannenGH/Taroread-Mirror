import React, { useEffect, useState } from 'react';
import { ChooseSuit } from './choose-suit/choose-suit';
import axios from 'axios';

const apiBase = 'https://api.hallb.me'

const Learn = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(apiBase + '/tarot-cards').then(res => setCards(res.data))
  }, [])

    return (
        <ChooseSuit 
            cards={cards}
        ></ChooseSuit>
    )
}

export { Learn }