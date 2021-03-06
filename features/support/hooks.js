// Hooks are fired before and after each cucumber scenario and are used
// for context setups and teardowns.
const handler = require('serve-handler');
const http = require('http');
const { Before, After, BeforeAll, AfterAll } = require('cucumber');
const scope = require('./scope');

Before(async () => {
  // You can clean up database models here
});

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.context.currentPage) {
    // if it has, find all the cookies, and delete them
    const cookies = await scope.context.currentPage.cookies();
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies);
    }
    // close the web page down
    await scope.context.currentPage.close();
    // wipe the context's currentPage value
    scope.context.currentPage = null;
  }
});

BeforeAll(async () => {
  // create a static server servin ./build
  scope.server = http.createServer((request, response) => {
    return handler(request, response, { public: './build' });
  });

  scope.server.listen(3000, () => {
    console.log('Running at http://localhost:3000');
  });
});
AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close();
  // also close the static server
  scope.server.close();
});
