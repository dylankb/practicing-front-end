var path = require('path'); // sets a normalized path for the file. As long as view directory relative to that file, the path will be correct
var Albums = require(path.resolve(path.dirname(__dirname), 'modules/albums.js'));

module.exports = function routerFunc(router) {
  /* GET home page. */
  router.get('/', function getIndex(req, res) {    // responding to index path
    res.render('index', { albums: Albums.get() }); // take index jade view, and pass it data
  });
};
