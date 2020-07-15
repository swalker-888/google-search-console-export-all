# GSC Export All Data

Use this script to export all your SEO data from Google Search Console including URLs, queries, clicks, impressions and rankings.

The Google Search Console interface is limited to exports of 1000 rows, the sample Google API is limited to 25,000 rows - this script exports ALL data.

## Prerequisites

- This script uses [Node.js](https://nodejs.org/en/)

- You can only collect data from sites where you are a 'verified owner' [GSC permissions](https://developers.google.com/webmaster-tools/search-console-api-original/v3/prereqs)

## Set Up

- Using Terminal or command line, navigate to the script folder and run 'npm install'

- Create a project in [Google's Developer Console](https://console.developers.google.com/projectcreate)

- Ensure you have enabled the Google Search Console API for your project found in the [API library](https://console.developers.google.com/apis/library)

- You will need OAuth credentials to access your GSC data

  - Head to [Google's Developer Console](https://console.cloud.google.com/apis/credentials) clicking your project --> APIs & auth --> credentials

  - Navigate to the [Cloud Console](https://console.cloud.google.com/apis/credentials) and Create a new OAuth2 Client Id

  - Select Web Application for the application type

  - Add an authorized redirect URI with the value http://localhost:3000/oauth2callback (or applicable value for your scenario)

  - Click the Download icon next to your newly created OAuth2 Client Id

  - Save the credentials file in the scripts folder as 'oauth2.keys.json'

- Update the index.js file with your siteUrl, startDate, endDate variables (line 8-10)

- To start the script, navigate to the script folder using Terminal or command line and run 'node index.js'

- When running the script you will be directed to a Google login screen, access whichever account has the permissions to the GSC profile you want to collect data from

- Once the script is complete a gsc-export.csv file will be created containing all of your data for the given date range
