const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const webmasters = google.webmasters("v3");

const siteUrl = "https://www.example.com";
const startDate = "2020-04-01";
const endDate = "2020-04-30";

async function collectAllGSCData(siteUrl, startDate, endDate) {
  //   Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "./oauth2.keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/webmasters.readonly",
    ],
  });
  google.options({
    auth,
    retryConfig: {
      // The number of times to retry the request.  Defaults to 3.
      "retry?": 10,
      // When there is no response, the number of retries to attempt. Defaults to 2.
      "noResponseRetries?": 10,
    },
  });

  const maxRows = 25000;
  let i = 0;
  const rows = [];
  let rowCheck = true;

  do {
    let loopStartRow = i * maxRows;
    const res = await webmasters.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date", "page", "query"],
        rowLimit: maxRows,
        startRow: loopStartRow,
      },
    });
    if (res.data.rows) {
      res.data.rows.map((row) => {
        let data = {};
        data.date = row.keys[0];
        data.url = row.keys[1];
        data.query = row.keys[2];
        data.clicks = row.clicks;
        data.impressions = row.impressions;
        data.ctr = row.ctr;
        data.position = row.position;
        rows.push(data);
      });
    } else {
      rowCheck = false;
    }
    i = i + 1;
    console.log(`Google API Search Console Request #${i}`);
  } while (rowCheck);

  const csvWriter = createCsvWriter({
    path: "gsc-export.csv",
    header: [
      { id: "date", title: "Date" },
      { id: "url", title: "URL" },
      { id: "query", title: "Query" },
      { id: "clicks", title: "Clicks" },
      { id: "impressions", title: "Impressions" },
      { id: "ctr", title: "CTR" },
      { id: "position", title: "Position" },
    ],
  });

  csvWriter
    .writeRecords(rows)
    .then(() => console.log("GSC API requests complete"));
}

if (module === require.main) {
  collectAllGSCData(siteUrl, startDate, endDate).catch(console.error);
}
module.exports = collectAllGSCData;
