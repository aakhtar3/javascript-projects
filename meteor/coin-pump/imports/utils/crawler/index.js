
const historical = require('./historical');
const coin = require('./coin');

coinData();
removeOldData();

function coinData() {
  return coin.asyncData()
    .then(coin.identifyExchange)
    .then(coin.filterCoins)
    .then(coin.identifyTradingPairs)
    .then(coin.splitBySentiment)
    .then(coin.collapseSentiment)
    .then(historical.addRecentHistoicalScore)
    .then(historical.addTimeHistoicalScore)
    .then(coin.addCoinEntry)
    .then(historical.addHistory)
    .then(console.dir)
    .catch(console.error);
}

function removeOldData() {
  return coin.removeData();
}

module.exports = {
  coinData: coinData,
  removeOldData: removeOldData
};

