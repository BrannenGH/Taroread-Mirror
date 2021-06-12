const axios = require('axios');
const fs = require('fs');

const apiBase = 'https://api.hallb.me';

const getTarotMetadataFromApi = () => {
    const getMetadataAtStart = (start) => {
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

const fetchMetadata = () => {
    return getTarotMetadataFromApi()
        .then(res => fs.writeFileSync('src/tarot-metadata.json', JSON.stringify(res, null, 4)))
}

fetchMetadata();