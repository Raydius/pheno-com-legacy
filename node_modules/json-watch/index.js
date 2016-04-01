var fs = require('fs');

var self = this;
self._jsonObject = null;

var watching = false;

var getJson = function (path) {
  var o = null;
  try {
    o = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}));
  } catch (e) {
    o = {
      error: e
    };
  }
  return o;
};

var main = function (path) {
  if (!watching) {
    self._jsonObject = getJson(path);
    fs.watch(path, function () {
      self._jsonObject = getJson(path);
      console.log(path, 'changed', self._jsonObject);
    });
    watching = true;
  }
};

module.exports.watch = main;
module.exports.get = function () {
  return self._jsonObject
};