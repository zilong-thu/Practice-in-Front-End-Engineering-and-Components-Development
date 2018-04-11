const madge = require('madge');

madge('./client/home/index.js').then((res) => {
  console.log(res.obj());
});
