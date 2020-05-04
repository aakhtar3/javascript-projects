import { getRecentHistory, getRecentHistoryLimit, insertHistory } from "../../api/history/methods";
import { getCoin } from "../../api/coin/methods";


function scoreFromPreviousRecord(coin1, coin2, key) {
  let score = 0.0;

  try {
    if (coin1[key] && typeof coin1[key] !== 'number') {
      coin1[key] = parseInt(coin1[key]);
    }

    if (coin2[key] && typeof coin2[key] !== 'number') {
      coin2[key] = parseInt(coin2[key]);
    }
  } catch (e) {}


  const hasChanged = coin1[key] && coin2[key] && coin2[key] > coin1[key];
  return hasChanged ? score + 1.0 : score;
}

function scoreOneMinPercentChange (percent) {
  let score = 0;

  if (percent > 0 && percent <= 0.25) {
    score = 0.25;
  } else if (percent > 0.25 && percent <= 0.50) {
    score = 0.50;
  } else if (percent > 0.50 && percent <= 0.75) {
    score = 0.75;
  } else if (percent > 0.75 && percent <= 1) {
    score = 1;
  } else {
    score = parseInt(percent);
  }

  return score;
}


function addRecentHistoicalScore(coins) {
  const oldCoins = [];
  const previousEvent = getRecentHistory.call();

  if(previousEvent) {
    previousEvent.ids.forEach(id => {
      const coin = getCoin.call(id);
      if (coin) oldCoins.push(coin);
    });
  }

  coins.forEach(coin => {
    oldCoins.forEach(oCoin => {
      if (coin.pair === oCoin.pair) {
        let posScore = 0.0;
        let negScore = 0.0;

        if (oCoin['#'] > coin['#']) {
          posScore = posScore + 1.0;
          coin.logs.push(`+ rank 1`);
        } else if (coin['#'] > oCoin['#']) {
          negScore = negScore + 1.0;
          coin.logs.push(`- rank 1`);
        }

        posScore = posScore + scoreFromPreviousRecord(coin, oCoin, 'w1h#');
        negScore = negScore + scoreFromPreviousRecord(oCoin, coin, 'w1h#');

        posScore = posScore + scoreFromPreviousRecord(coin, oCoin, 'w24h#');
        negScore = negScore + scoreFromPreviousRecord(oCoin, coin, 'w24h#');

        posScore = posScore + scoreFromPreviousRecord(coin, oCoin, 'w7d#');
        negScore = negScore + scoreFromPreviousRecord(oCoin, coin, 'w7d#');


        posScore = posScore + scoreFromPreviousRecord(oCoin, coin, 'l1h#');
        negScore = negScore + scoreFromPreviousRecord(coin, oCoin, 'l1h#');

        posScore = posScore + scoreFromPreviousRecord(oCoin, coin, 'l24h#');
        negScore = negScore + scoreFromPreviousRecord(coin, oCoin, 'l24h#');

        posScore = posScore + scoreFromPreviousRecord(oCoin, coin, 'l7d#');
        negScore = negScore + scoreFromPreviousRecord(coin, oCoin, 'l7d#');

        coin.posScore = coin.posScore + posScore;
        coin.negScore = coin.negScore + negScore;

        if (posScore > 0) coin.logs.push(`+ His ${posScore}`);
        if (negScore > 0) coin.logs.push(`- His ${negScore}`);

        coin['<10m'] = parseFloat(((coin.price - oCoin.price) / (coin.price)) * 100).toFixed(4);

        if (coin['<10m'] > 0) {
          const s = scoreOneMinPercentChange(coin['<10m']);
          if (s > 0) coin.logs.push(`+ <10m ${s}`);
          coin.posScore = coin.posScore + s
        } else if (coin['<10m'] < 0) {
          const s = scoreOneMinPercentChange(coin['<10m']) * -1;
          if (s > 0) coin.logs.push(`- <10m ${s}`);
          coin.negScore = coin.negScore + s;
        } else {
          coin['<10m'] = oCoin['<10m'];

          if (coin['<10m'] > 0) {
            const s = scoreOneMinPercentChange(coin['<10m']);
            if (s > 0) coin.logs.push(`+ <10m ${s}`);
            coin.posScore = coin.posScore + s
          } else if (coin['<10m'] < 0) {
            const s = scoreOneMinPercentChange(coin['<10m']) * -1;
            if (s > 0) coin.logs.push(`- <10m ${s}`);
            coin.negScore = coin.negScore + s;
          }
        }

        // if(coin['<10m'] === 0 || !coin['<10m']) {
        //   console.log(coin.coin, coin['<10m'], oCoin['<10m']);
        // }

      }
    })
  });

  return coins;
}

function addTimeHistoicalScore(coins) {

  const oldCoins = [];

  // try {
  //   const previousEvent = getRecentHistoryLimit.call({limit:15});
  //
  //   if(previousEvent) {
  //     previousEvent.ids.forEach(id => {
  //       const coin = getCoin.call(id);
  //       if (coin) oldCoins.push(coin);
  //     });
  //   }
  // } catch(e) {}


  return coins;
}


function addHistory(event) {
  return insertHistory.call(event);
}




module.exports = {
  addRecentHistoicalScore: addRecentHistoicalScore,
  addTimeHistoicalScore: addTimeHistoicalScore,
  addHistory: addHistory,
};