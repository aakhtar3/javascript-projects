const https = require("https");
const request = require('request');

function getHTML(url){
  return new Promise((resolve, reject) => {
    https.get(url, res => {

      res.setEncoding("utf8");
      let body = "";

      res.on("data", data => {
        body += data;
      });

      res.on("end", () => {
        try {
          body = JSON.parse(body);
        } catch (e) {}

        resolve(body);
      });
    });
  });
}


function getData(coin) {
  return new Promise((resolve, reject) => {
    request(`https://api.coinmarketcap.com/v1/ticker/${coin.coin.toLowerCase()}`, (err, res, body) => {
      if (err) reject(err);
      try { body = JSON.parse(body); }
      catch (e) {} // Do nothing

      if (body.error) reject(body.error);
      else resolve(coin ? body[0] : body);
    });
  });
}

function getDataForCoins(coins) {
  return Promise.resolve(Promise.all(coins.map(getData)));
}

module.exports = {
  getHTML: getHTML,
  getDataForCoins: getDataForCoins,
};
