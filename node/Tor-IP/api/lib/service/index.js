`use strict`;

const router = require(`express`).Router();
const fetchData = require(`../ingest`);
const parseData = require(`../parse`);
const {
  isValidIPv4,
  isValidExternalSource
} = require(`../validate`);
const { findAll,
  findOne,
  update,
  findOrCreate
} = require(`../data/operations`);

/**
 * @openapi
 * /tor/ip:
 *   get:
 *     summary: Get IPs obtained from the external sources EXCLUDING those found in the database
 *     responses:
 *       200:
 *         description: An array of Ips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal Server Error
 */
router.get(`/tor/ip`, async (_req, res) => {
  try {
    const ips = await findAll({ excluded: false });
    const listIps = ips.map(({ ipAddress }) => ipAddress);
  
    res.send(listIps);
  } catch (_error) { res.sendStatus(500); }
});

/**
 * @openapi
 * /tor/ip/exclude:
 *   post:
 *     summary: POST endpoint that receives an IP and adds it to a database which contains all the IPs that we DO NOT want to appear in the output GET Endpoint 1
 *     consumes:
 *        - application/json
 *     requestBody:
 *        description: A JSON object containing user information
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        ipAddress:
 *                            type: string
 *                            description: The Ip address to be excluded
 *                            example: 1.1.1.1
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post(`/tor/ip/exclude`, async ({ body }, res) => {
  const { ipAddress } = body;
  
  if (!isValidIPv4(ipAddress)) return res.sendStatus(400);

  try {
    const hasIpData = await findOne({ ipAddress, excluded: false });
    if (!hasIpData) return res.sendStatus(404);

    await update({ ipAddress });

    res.sendStatus(200);
  } catch (_error) { res.sendStatus(500); }
});

/**
 * @openapi
 * /tor/ip/ingest:
 *   put:
 *     summary: Obtain a list of Tor network IPs (https://www.torproject.org) from different external sources and present them in a way that allows us to programmatically parse/ingest them. Additionally, this application must have the functionality of EXCLUDING certain IPs from the list that gets returned.
 *     consumes:
 *        - application/json
 *     requestBody:
 *        description: A JSON object containing user information
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        url:
 *                            type: string
 *                            description: The url of external source
 *                            example: https://udger.com/resources/ip-list/tor_exit_node
 *                        type:
 *                            type: string
 *                            description: The type of parsing from external source
 *                            example: html
 *                        ipKey:
 *                            type: string
 *                            description: The IP cloumn in key to parse
 *                            example: IP address
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put(`/tor/ip/ingest`, async ({ body }, res) => {
  const { url, type, ipKey } = body;

  if (!isValidExternalSource(url, type, ipKey)) return res.sendStatus(400);

  try {
    const excludedIps = new Set(await findAll({ excluded: true }));
    const ingestedData = await fetchData(url);
    const parsedData = parseData(ingestedData, ipKey)
      .filter(isValidIPv4)
      .filter((ip) => !excludedIps.has(ip));

    for (const ipAddress of parsedData) {
      await findOrCreate({ ipAddress });
    }
  
    res.sendStatus(200);
  } catch (_error) { res.sendStatus(500); }
});

module.exports = router;