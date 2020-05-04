

function exchangeVol(coin, vol) {
  let exchangeScore = 0.0;
  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if (volPercent >= 0.5 && volPercent < 2.0) {
      exchangeScore = 0.25;
    } else if (volPercent >= 2.0 && volPercent < 3.0) {
      exchangeScore = 0.5;
    } else if (volPercent >= 3.0 && volPercent < 4.0) {
      exchangeScore = 0.75;
    } else if (volPercent >= 4.0 && volPercent < 5.0) {
      exchangeScore = 1.0;
    } else if (volPercent >= 5.0 && volPercent < 6.0) {
      exchangeScore = 1.25;
    } else if (volPercent >= 6.0 && volPercent < 8.5) {
      exchangeScore = 1.5;
    } else if (volPercent >= 8.5) {
      exchangeScore = 2.0;
    }
    if (exchangeScore > 0) coin.logs.push(`exch ${exchangeScore}`);
  }

  return exchangeScore;
}

function scoreRank(coin, key) {
  let scoreRank = 0.0;

  if(coin.hasOwnProperty(key)){
    let rank = coin[key];

    if(rank >= 1 && rank < 5) {
      scoreRank = 1.0;
    } else if (rank >= 5 && rank < 10) {
      scoreRank = 0.75;
    } else if (rank >= 10 && rank < 20) {
      scoreRank = 0.5;
    } else if (rank >= 20 ) {
      scoreRank = 0.25;
    }
    if (scoreRank > 0) coin.logs.push(`${coin.polarization === 'pos' ? '+' : '-'} # ${scoreRank}`)
  }

  return scoreRank;
}


function w1hVol(coin, vol){
  let w1hScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 5.0 && volPercent < 10.0) {
      w1hScore = 0.25;
    } else if (volPercent >= 10.0 && volPercent < 20.0) {
      w1hScore = 0.50;
    } else if (volPercent >= 20.0 && volPercent < 30.0) {
      w1hScore = 1.0;
    } else if (volPercent >= 30.0 && volPercent < 40.0) {
      w1hScore = 1.5;
    } else if (volPercent >= 30.0 && volPercent < 40.0) {
      w1hScore = 2.0;
    }
    if (w1hScore > 0) coin.logs.push(`w1h ${w1hScore}`);
  }

  return w1hScore;
}

function w24hVol(coin, vol){
  let w24hScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 30.0 && volPercent < 40) {
      w24hScore = 0.25;
    } else if (volPercent >= 40.0 && volPercent < 50.0) {
      w24hScore = 0.50;
    } else if (volPercent >= 50.0 && volPercent < 60.0) {
      w24hScore = 0.75;
    } else if (volPercent >= 60.0 && volPercent < 90.0) {
      w24hScore = 1.0;
    } else if (volPercent >= 90.0 && volPercent < 140.0) {
      w24hScore = 1.5;
    } else if (volPercent >= 140.0) {
      w24hScore = 2.0;
    }
    if (w24hScore > 0) coin.logs.push(`w24h ${w24hScore}`);
  }

  return w24hScore;
}

function w7dVol(coin, vol){
  let w7dScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 0 && volPercent < 5) {
      w7dScore = 1.25;
    } else if (volPercent >= 5 && volPercent < 10) {
      w7dScore = 1.50;
    } else if (volPercent >= 10 && volPercent < 20) {
      w7dScore = 1.75;
    } else if (volPercent >= 20) {
      w7dScore = 2.0;
    }
    if (w7dScore > 0) coin.logs.push(`w7d ${w7dScore}`);
  }

  return w7dScore;
}

function l1hVol(coin, vol){
  let l1hScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 100 && volPercent < 200) {
      l1hScore = 1.25;
    } else if (volPercent >= 200 && volPercent < 300) {
      l1hScore = 1.50;
    } else if (volPercent >= 300) {
      l1hScore = 2.0;
    }
    if (l1hScore > 0) coin.logs.push(`l1h ${l1hScore}`);
  }

  return l1hScore;
}

function l24hVol(coin, vol){
  let l24hScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 10.0 && volPercent < 20.0) {
      l24hScore = 1.25;
    } else if (volPercent >= 20.0 && volPercent < 30.0) {
      l24hScore = 1.50;
    } else if (volPercent >= 40.0) {
      l24hScore = 2.0;
    }
    if (l24hScore > 0) coin.logs.push(`l24h ${l24hScore}`);
  }

  return l24hScore;
}

function l7dVol(coin, vol){
  let l7dScore = 0.0;

  if(coin.hasOwnProperty(vol)){
    let volPercent = coin[vol];

    if(volPercent >= 10.0 && volPercent < 20.0) {
      l7dScore = 1.25;
    } else if (volPercent >= 20.0 && volPercent < 30.0) {
      l7dScore = 1.50;
    } else if (volPercent >= 40.0) {
      l7dScore = 2.0;
    }
    if (l7dScore > 0) coin.logs.push(`l7d ${l7dScore}`)
  }

  return l7dScore;
}



module.exports = {
  exchangeVol: exchangeVol,
  scoreRank: scoreRank,

  w1hVol: w1hVol,
  w24hVol: w24hVol,
  w7dVol: w7dVol,

  l1hVol: l1hVol,
  l24hVol: l24hVol,
  l7dVol: l7dVol,

};
