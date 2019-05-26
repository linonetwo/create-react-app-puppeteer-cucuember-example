const { setWorldConstructor, setDefaultTimeout } = require('cucumber');
const puppeteer = require('puppeteer');
const scope = require('./scope');

class World {
  constructor() {
    scope.driver = puppeteer;
    scope.context = {};
  }
}

setDefaultTimeout(30 * 1000);
setWorldConstructor(World);
