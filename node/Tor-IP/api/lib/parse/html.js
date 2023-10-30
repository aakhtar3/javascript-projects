`use strict`;

const cheerio = require(`cheerio`);

const getHeaders = ($, table) => {
  const headers = [];

  for (const row of table.find(`tr`)) {
    for (const cell of $(row).find(`th`)) {
      headers.push($(cell).text().trim());
    }
  }

  return headers;
};

const getRows = ($, table, headers) => {
  const tableData = [];
  
  for (const row of table.find(`tr`)) {
    const rowData = {};

    $(row).find(`td`).each((headerIndex, cell) => {
      if (!(headerIndex in headers)) return;

      rowData[headers[headerIndex]] = $(cell).text().trim();
    });
    
    if (!Object.keys(rowData).length) continue;

    tableData.push(rowData);
  }

  return tableData;
};

const parseHtml = (html, ipKey) => {
  try {
    const $ = cheerio.load(html);
    const table = $(`table`);
    const headers = getHeaders($, table);
    const rows = getRows($, table, headers);
    const ipAddress = rows.map(({ [ipKey]: ipAddress }) => ipAddress);

    return ipAddress;
  } catch (error) { console.error(error); throw error; }
};

module.exports = parseHtml;
