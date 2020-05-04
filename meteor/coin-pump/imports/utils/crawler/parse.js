const cheerio = require('cheerio');

function parse(elem, a, b, c) {
  let text = '';

  if (elem && elem.children && elem.children[a] && elem.children[a].children && elem.children[a].children[b] && elem.children[a].children[b].children && elem.children[a].children[b].children[c] && elem.children[a].children[b].children[c].data) {
    text = elem.children[a].children[b].children[c].data.replace(/\n|\r/g, "").trim();

  } else if (elem && elem.children && elem.children[a] && elem.children[a].children && elem.children[a].children[b] && elem.children[a].children[b].data) {
    text = elem.children[a].children[b].data.replace(/\n|\r/g, "").trim();
  }

  return text;
}


export function getBiggestGainAndLoser(data) {
  const gainers1h = [];
  const gainers7d = [];
  const gainers24h = [];

  const losers1h = [];
  const losers7d = [];
  const losers24h = [];

  let counter = 0;
  let words = [];

  const $ = cheerio.load(data);
  $('tr').each((i, elem) => {
    if (i !== 0 && i !== 31 && i !== 62 && i !== 93 && i !== 124 && i !== 155 && elem && elem.children && elem.children.length === 13) {

      let text = parse(elem, 1, 0); // elem.children[1].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }

      text = parse(elem, 3, 3, 0); // elem.children[3].children[3].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }

      text = parse(elem, 5, 0, 0); // elem.children[5].children[0].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }

      text = parse(elem, 7, 1, 0); // elem.children[7].children[1].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }

      text = parse(elem, 9, 1, 0); // elem.children[9].children[1].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }

      text = parse(elem, 11, 0);   // elem.children[11].children[0].data
      if (text) {
        words.push(text);
        counter++;
      }
    }

    if (counter === 6) {
      const obj = {
        '#': parseInt(words[0]),      // 1
        'name': words[1],   // 2
        'symbol': words[2], // 3
        'vol24h': Number(words[3].replace(/[^0-9\.-]+/g,"")), // 4
        'price':  Number(words[4].replace(/[^0-9\.-]+/g,"")), // 5
        'vol%': parseFloat(words[5].substring(0, words[5].length - 1)),// 6
      };
      counter = 0;
      words = [];

      if(i > 0 && i <= 30) {
        gainers1h.push(obj);
      } else if (i > 30 && i <= 61) {
        gainers7d.push(obj);
      } else if (i > 61 && i <= 92) {
        gainers24h.push(obj);
      } else if (i > 92 && i <= 124) {
        losers1h.push(obj);
      } else if (i > 124 && i <= 155) {
        losers7d.push(obj);
      } else {
        losers24h.push(obj);
      }
    }
  });

  const response = {
    gainers: {
      '1h': gainers1h,
      '7d': gainers7d,
      '24h': gainers24h,
    },
    losers: {
      '1h': losers1h,
      '7d': losers7d,
      '24h': losers24h,
    }
  };

  return response;
}

export function getBittrex(data) {
  const $ = cheerio.load(data);
  const coins = [];

  let counter = 0;
  let words = [];

  $('td').each((i, elem) => {
    // Rank + Volume %
    if (elem && elem.children && elem.children[0] && elem.children[0].data) {
      let text = elem.children[0].data.replace(/\n|\r/g, "").trim();

      if (text && text !== 'Recently' && text !== '***' && text !== '*') {
        words.push(text);
        counter++;
      } else if (text === '***' || text === '*' && elem && elem.children && elem.children[1] && elem.children[1].children && elem.children[1].children[0] && elem.children[1].children[0].data) {
        text = elem.children[1].children[0].data.replace(/\n|\r/g, "").trim();

        if (text) {
          words.push(text);
          counter++;
        }

      } else if (elem && elem.children && elem.children[1] && elem.children[1] && elem.children[1].children && elem.children[1].children[0] && elem.children[1].children[0].data) {
        text = elem.children[1].children[0].data.replace(/\n|\r/g, "").trim();
        words.push(text);
        counter++;
      }

      // Coin
    } else if (elem && elem.children && elem.children[1] && elem.children[1].children && elem.children[1].children[0] && elem.children[1].children[0].data) {
      const text = elem.children[1].children[0].data.replace(/\n|\r/g, "").trim();

      if (text) {
        words.push(text);
        counter++;
      }
      // Pair
    } else if (elem && elem.children && elem.children[0] && elem.children[0].children && elem.children[0].children[0] && elem.children[0].children[0].data) {
      const text = elem.children[0].children[0].data.replace(/\n|\r/g, "").trim();

      if (text) {
        words.push(text);
        counter++;
      }
    }

    if(counter === 6) {
      const obj = {
        '#': parseInt(words[0]),     // 1
        'coin': words[1],  // 2
        'symbol': words[2].split('/')[0],
        'pair': words[2],  // 3
        'vol24h': Number(words[3].replace(/[^0-9\.-]+/g,"")),// 4
        'price': Number(words[4].replace(/[^0-9\.-]+/g,"")), // 5
        'vol%': parseFloat(words[5].substring(0, words[5].length - 1)),  // 6
      };

      if(obj['vol%'] === 0) {
        obj['vol%'] = 0.01
      }

      coins.push(obj);

      counter = 0;
      words = [];
    }
  });

  return coins;
}


export function getVolume(data) {
  const $ = cheerio.load(data);
  const coins = [];

  let counter = 0;
  let words = [];

  $('td').each((i, elem) => {
    // Rank + Name
    if (elem && elem.children && elem.children[0] && elem.children[0].data) {
      let text = elem.children[0].data.replace(/\n|\r/g, "").trim();

      if (text) {
        words.push(text);
        counter++;
      } else if (elem && elem.children && elem.children[1] && elem.children[1] && elem.children[1].children && elem.children[1].children[0] && elem.children[1].children[0].data) {
        text = elem.children[1].children[0].data.replace(/\n|\r/g, "").trim();
        words.push(text);
        counter++;
      } else if (elem && elem.children && elem.children.length === 5 && elem.children[3] && elem.children[3].children && elem.children[3].children[0].data) {
        const text = elem.children[3].children[0].data.replace(/\n|\r/g, "").trim();

        if (text) {
          words.push(text);
          counter++;
        }
      }

      // Coin
    } else if (elem && elem.children && elem.children[1] && elem.children[1].children && elem.children[1].children[0] && elem.children[1].children[0].data) {
      const text = elem.children[1].children[0].data.replace(/\n|\r/g, "").trim();

      if (text) {
        words.push(text);
        counter++;
      }
      // Pair
    } else if (elem && elem.children && elem.children[0] && elem.children[0].children && elem.children[0].children[0] && elem.children[0].children[0].data) {
      const text = elem.children[0].children[0].data.replace(/\n|\r/g, "").trim();

      if (text) {
        words.push(text);
        counter++;
      }
    }

    if(counter === 6) {
      const obj = {
        '#': words[0],      // 1
        'name': words[1],   // 2
        'symbol': words[2], // 3
        'vol1d': words[3],  // 4
        'vol7d': words[4],  // 5
        'vol30d': words[5], // 6
      };

      coins.push(obj);

      counter = 0;
      words = [];
    }
  });

  return coins;
}



module.exports = {
  getBiggestGainAndLoser: getBiggestGainAndLoser,
  getBittrex: getBittrex,
  getVolume: getVolume
};