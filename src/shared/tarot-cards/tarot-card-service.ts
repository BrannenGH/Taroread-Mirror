import axios from "axios";
import { TarotCardMetadata, PictureMetadata } from "./tarot-card-metadata";
import tarotcardMetadata from "../../tarot-metadata.json";

const apiBase = "https://api.hallb.me";

const getTarotMetadataFromApi = () => {
  const getMetadataAtStart = (start: number) => {
    return axios
      .get(apiBase + `/tarot-cards?_start=${start}`)
      .then(res => res.data)
  }
  
  return (
    axios
      .get(apiBase + '/tarot-cards/count')
      .then(res => {
        const count = res.data;
        const promises = [];
        for(var i = 1; i < count; i += 100) {
          promises.push(getMetadataAtStart(i));
        }

        return Promise.all(promises);
      })
      // Sort cards by their value attribute
      .then((res) =>
          res.flat().sort(function (a, b) {
            return a.value - b.value;
          })
        )
    );
}

const getTarotMetadata: () => Promise<TarotCardMetadata[]> = () => {
  if (!tarotcardMetadata) {
    return getTarotMetadataFromApi();
  } else {
    return new Promise<TarotCardMetadata[]>((resolve) =>
      resolve(tarotcardMetadata as unknown as TarotCardMetadata[])
    ).then((res) =>
      res.sort(function (a: any, b: any) {
        return a.value - b.value;
      })
    );
  }
};

const buildImageUrl: (picture: PictureMetadata) => string = (picture) => {
  return apiBase + picture?.url;
};

const reverse = (normal: TarotCardMetadata, allCards: TarotCardMetadata[]): TarotCardMetadata | undefined => {
  return allCards.find(card => card.value === ((normal.value + 78) % 156));
}

export { getTarotMetadata, buildImageUrl, reverse };
