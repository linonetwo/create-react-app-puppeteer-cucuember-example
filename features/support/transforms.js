const { defineParameterType } = require('cucumber');

defineParameterType({
  regexp: /[0-9]+([.]{1}[0-9]+){0,1}/,
  transformer(s) {
    return Number(s);
  },
  name: 'number',
});
