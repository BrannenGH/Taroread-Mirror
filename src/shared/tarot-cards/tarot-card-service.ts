import axios from 'axios';
import { TarotCardMetadata, PictureMetadata } from './tarot-card-metadata';

const apiBase = 'https://api.hallb.me'

const getTarotMetadata: () => Promise<TarotCardMetadata[]> = () => {
    return axios.get(apiBase + '/tarot-cards')
        // Sort cards by their value attribute
        .then(res => res.data.sort(function(a:any, b:any){return a.value - b.value}))
}

const buildImageUrl: (picture: PictureMetadata) => string = (picture) => {
    return apiBase + picture?.url;
}

export { getTarotMetadata, buildImageUrl };