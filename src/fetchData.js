const axios = require('axios');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'tickers.json');

async function fetchAndStoreData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = response.data;

    const tickers = Object.values(data)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);

    const tickerData = tickers.map(ticker => ({
      name: ticker.name,
      last: parseFloat(ticker.last),
      buy: parseFloat(ticker.buy),
      sell: parseFloat(ticker.sell),
      volume: parseFloat(ticker.volume),
      base_unit: ticker.base_unit,
    }));

    fs.writeFileSync(filePath, JSON.stringify(tickerData, null, 2));

    console.log('Top 10 tickers saved to JSON file');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
}

fetchAndStoreData();
