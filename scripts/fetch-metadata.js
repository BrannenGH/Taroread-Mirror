const axios = require('axios');
const fs = require('fs');

const apiBase = 'https://api.hallb.me';

const fetchMetadata = () => {
    return axios.get(apiBase + '/tarot-cards')
    // Sort cards by their value attribute
        .then(res => fs.writeFileSync('src/tarot-metadata.json', JSON.stringify(res.data, null, 4)))
}

fetchMetadata();