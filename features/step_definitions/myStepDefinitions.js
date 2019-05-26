const { Given, When, Then } = require('cucumber');
const { generateBackoff } = require('exponential-backoff-generator');
const path = require('path');
const $ = require('cheerio');
const _ = require('lodash');
const { delay } = require('bluebird');

const scope = require('../support/scope');

/**
 * Returns puppeteer config for current env.
 *
 */
const isDebugging = () =>
  process.env.NODE_ENV === 'debug'
    ? {
        headless: false,
        slowMo: 250,
        devtools: true,
      }
    : {};

Given('The app is open', async function() {
  // Launch the browser and a page while setting the viewing options.
  if (!scope.browser) scope.browser = await scope.driver.launch(isDebugging());
  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.emulate({
    viewport: {
      width: 800,
      height: 600,
    },
    userAgent: '',
  });

  // Visit the homepage.
  const backoff = generateBackoff();
  for (const { sleep } of backoff) {
    try {
      return await scope.context.currentPage.goto('http://localhost:3000');
    } catch (error) {
      await sleep(); // wait 100ms, 200ms, 400ms, 800ms ...
    }
  }
});

Then('I nevagated to the {string} page', async function(rawPageName) {
  const pageName = _.camelCase(rawPageName);
  const visit = await scope.context.currentPage.goto(`http://localhost:3000/${pageName}/`);
  return visit;
});

Then('wait {}', async function(forWhat) {
  return delay(3 * 1000);
});

Then('I have same items amongs {string} and {string}', function(dbLocation, className) {
  return 'pending';
});
