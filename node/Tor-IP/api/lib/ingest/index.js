`use strict`;

const fetch = require(`node-fetch`);

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${ response.status }`);
    
    return response.text();
  } catch (error) {
    console.error(`Error fetching data:`, error);

    return ``;
  }
};

module.exports = fetchData;
