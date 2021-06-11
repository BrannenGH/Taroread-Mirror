import axios from 'axios';
import { TarotCardMetadata, PictureMetadata } from './tarot-card-metadata';
import tarotcardMetadata from '../../tarot-metadata.json'

const apiBase = 'https://api.hallb.me'

const getTarotMetadata: () => Promise<TarotCardMetadata[]> = () => {
    if (!tarotcardMetadata) {
        return axios.get(apiBase + '/tarot-cards')
            // Sort cards by their value attribute
            .then(res => res.data.sort(function(a:any, b:any){return a.value - b.value}))
    } else {
        return new Promise<TarotCardMetadata[]>((resolve) => resolve((tarotcardMetadata as unknown) as TarotCardMetadata[]))
            .then(res => res.sort(function(a:any, b:any){return a.value - b.value}))
    }
}

const buildImageUrl: (picture: PictureMetadata) => string = (picture) => {
    return apiBase + picture?.url;
}

export { getTarotMetadata, buildImageUrl };