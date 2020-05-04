import { insertCoin, deleteCoins } from "../../api/coin/methods";
import { deleteHistory } from "../../api/history/methods"

const request = require('./request');
const polarization = require('./polarization');
const date = require('./date');
const parse = require('./parse');

function asyncData() {
  return new Promise((resolve, reject) => {
    try {
      const promises = [];

      const gainersLosersURL = 'https://coinmarketcap.com/gainers-losers/';
      const bagPromise = request.getHTML(gainersLosersURL)
        .then(parse.getBiggestGainAndLoser);

      const bittrexVolumeURL = 'https://coinmarketcap.com/exchanges/bittrex/';
      const bVolPromise = request.getHTML(bittrexVolumeURL)
        .then(parse.getBittrex);

      const binanceVolumeURL = 'https://coinmarketcap.com/exchanges/binance/';
      const biVolPromise = request.getHTML(binanceVolumeURL)
        .then(parse.getBittrex);

      // const monthlyVolumeURL = 'https://coinmarketcap.com/currencies/volume/monthly/';
      // const monthVolPromise = request.getHTML(monthlyVolumeURL)
      //   .then(parse.getVolume);

      promises.push(bagPromise, bVolPromise, biVolPromise);

      resolve(Promise.all(promises));
    } catch (e) {
      reject(e);
    }
  });
}

function identifyExchange(coinData) {
  coinData[1].forEach(c => {
    c.exchange = 'bittrex';
  });
  coinData[2].forEach(c => {
    c.exchange = 'binance';
  });

  return coinData;
}

function lookForMatch(coin, list, searchKey, addKey, addRank) {
  list[searchKey].forEach(c => {
    if (coin.symbol === c.symbol) {
      coin[addKey] = c['vol%'];
      coin[addRank] = c['#'];
      coin.posScore = 0.0;
      coin.negScore = 0.0;
      coin.tradingPairs = [];
      coin.logs = [];
    }
  });
}

function filterCoins(coinData) {
  const coins = [];

  coinData[1].map((coin) => {
    lookForMatch(coin, coinData[0].gainers, '1h', 'w1h', 'w1h#');
    lookForMatch(coin, coinData[0].gainers, '7d', 'w7d', 'w7d#');
    lookForMatch(coin, coinData[0].gainers, '24h', 'w24h', 'w24h#');
    lookForMatch(coin, coinData[0].losers, '1h', 'l1h', 'l1h#');
    lookForMatch(coin, coinData[0].losers, '7d', 'l7d', 'l7d#');
    lookForMatch(coin, coinData[0].losers, '24h', 'l24h', 'l24h#');
    return coin;
  }).filter(date.addTimeStamp)
    .forEach(c => {
      coins.push(c);
    });

  coinData[2].map((coin) => {
    lookForMatch(coin, coinData[0].gainers, '1h', 'w1h', 'w1h#');
    lookForMatch(coin, coinData[0].gainers, '7d', 'w7d', 'w7d#');
    lookForMatch(coin, coinData[0].gainers, '24h', 'w24h', 'w24h#');
    lookForMatch(coin, coinData[0].losers, '1h', 'l1h', 'l1h#');
    lookForMatch(coin, coinData[0].losers, '7d', 'l7d', 'l7d#');
    lookForMatch(coin, coinData[0].losers, '24h', 'l24h', 'l24h#');
    return coin;
  }).filter(date.addTimeStamp)
    .forEach(c => {
      coins.push(c);
    });

  return coins;
}

function identifyTradingPairs(coins) {
  const map = {};
  let pairs = [];

  coins.forEach(c => {
    if (map.hasOwnProperty(c.symbol)) {
      map[c.symbol].push(c.pair)
    } else {
      map[c.symbol] = [c.pair];
    }
  });

  for (const coin in map) {
    if (map[coin].length > 1){
      pairs = pairs.concat(map[coin]);
    }
  }

  pairs.forEach(pair => {
    const split = pair.split('/');
    const symbol = split[0];
    const tPair = split[1];
    coins.forEach(c => {
      if (symbol === c.symbol && pair !== c.pair) {
        c.tradingPairs.push(tPair);
      }
    })
  });

  return coins;
}

function hasCurrentSentiment(coin, prop) {
  return coin.hasOwnProperty(prop);
}


function splitBySentiment(coins) {
  const positive = [];
  const negative = [];

  const pos = ['w1h', 'w7d', 'w24h'];
  const neg = ['l1h', 'l7d', 'l24h'];

  coins.forEach(c => {
    let posSen = 0;
    let negSen = 0;

    pos.forEach(prop => {
      if(hasCurrentSentiment(c, prop)) posSen++;
    });

    neg.forEach(prop => {
      if(hasCurrentSentiment(c, prop)) negSen++;
    });

    if (posSen > negSen) {
      c.posScore = c.posScore + posSen;
      c.negScore = c.negScore + negSen;
      c.polarization = 'pos';

      c.logs.push(`+ ${c.posScore}`);
      if (c.negScore > 0) c.logs.push(`- ${c.negScore}`);

      positive.push(c);
    }  else if (negSen) {
      negSen = negSen * 2.25;
      c.negScore = c.negScore + negSen;
      c.posScore = c.posScore + posSen;
      c.polarization = 'neg';

      if (c.posScore > 0) c.logs.push(`+ ${c.posScore}`);
      c.logs.push(`- ${c.negScore}`);

      negative.push(c);
    }

  });

  return {
    positive,
    negative,
  };
}

function collapseSentiment(sentiment) {
  const coins = [];
  let score = 0.0;

  sentiment.positive.forEach(c => {
    score = score + polarization.exchangeVol(c, 'vol%');

    score = score + polarization.w1hVol(c, 'w1h');
    score = score + polarization.scoreRank(c, 'w1h#');

    score = score + polarization.w24hVol(c, 'w24h');
    score = score + polarization.scoreRank(c, 'w24h#');

    score = score + polarization.w7dVol(c, 'w7d');
    score = score + polarization.scoreRank(c, 'w7d#');

    if(c.tradingPairs.length > 0) {
      score = score + c.tradingPairs.length;
    }

    c.posScore = c.posScore + score;
    c.logs.push(`+ pairs ${score}`);

    coins.push(c);
    score = 0.0;
  });

  sentiment.negative.forEach(c => {
    score = score + polarization.l1hVol(c, 'l1h');
    score = score + polarization.scoreRank(c, 'l1h#');

    score = score + polarization.l24hVol(c, 'l24h');
    score = score + polarization.scoreRank(c, 'l24h#');

    score = score + polarization.l7dVol(c, 'l7d');
    score = score + polarization.scoreRank(c, 'l7d#');

    if(c.tradingPairs.length > 0) {
      score = score + c.tradingPairs.length;
    }

    c.negScore = c.negScore + score;
    c.logs.push(`- pairs ${score}`);

    coins.push(c);
    score = 0.0;
  });


  return coins;
}


function addCoinEntry(coins) {
  const ids = [];
  const _date = date.parseDate(coins[0].timestamp);

  coins.filter(c => {
    if (c.polarization === 'pos') return c;
  }).sort((a, b) => {
    return b.posScore - a.posScore;
  }).forEach(c => {
    const id = insertCoin.call(c);
    ids.push(id);
  });

  coins.filter(c => {
    if (c.polarization === 'neg') return c;
  }).sort((a, b) => {
    return a.negScore - b.negScore;
  }).forEach(c => {
    const id = insertCoin.call(c);
    ids.push(id);
  });

  const event = {
    ids: ids,
    entries: ids.length
  };

  return Object.assign(event, _date);
}

function removeData(){
  const threeDaysAgo = date.getOldDate();
  deleteCoins.call(threeDaysAgo);
  deleteHistory.call(threeDaysAgo);
}


module.exports = {
  asyncData: asyncData,
  identifyExchange: identifyExchange,
  filterCoins: filterCoins,
  identifyTradingPairs: identifyTradingPairs,
  splitBySentiment: splitBySentiment,
  collapseSentiment: collapseSentiment,
  addCoinEntry: addCoinEntry,
  removeData: removeData
};
