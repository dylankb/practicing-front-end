(function() {
  function newModifiedObject(args, element, { pick, omit } = {}) {
    var obj = {};
    args.forEach(function(key) {
      for (var prop in element) {
        if (prop === key) {
          if (pick) { obj[key] = element[key]; }
        } else {
          if (omit) { obj[key] = element[key]; }
        }
      }
    });

    return obj;
  }

  function findObjs(element, searchObj, { multiple } = {}) {
    var match = multiple ? [] : undefined;
    /*
      We use `Array.prototype.some()` here rather than a `forEach` in order to short circut the iteration if a true value is returned in the callback. By default, you cannot break out of a `forEach` method.
    */
    element.some(function(obj) {
      var allMatch = true;
      for (var prop in searchObj) {
        if (obj[prop] !== searchObj[prop]) {
          allMatch = false;
        }
      }

      if (allMatch) {
        if (multiple) {
          match.push(obj);
        }
        else {
          match = obj;
          return true;  // Short circuts callback, so search stops
        }
      }
    });

    return match;
  }

  var _ = function(element) {
    u = {
      first: function() {
        return element[0];
      },
      last: function() {
        return element[element.length - 1];
      },
      without: function() {
        var arr = [];
        var args = Array.prototype.slice.call(arguments);
        element.forEach(function(ele) {
          if (args.indexOf(ele) === -1) { arr.push(ele); }
        });

        return arr;
      },
      lastIndexOf: function(value) {
        return element.lastIndexOf(value);
      },
      sample: function(qty) {
        var arr = [];

        function getRandomEle(max) {
          return Math.floor(Math.random() * max);
        }

        if (!qty) {
          return element[getRandomEle(0)];
        } else {
          while (arr.length < qty) {
            index = getRandomEle(qty);
            if (arr.indexOf(element[index]) === -1) {
              arr.push(element[index]);
            }
          }
        }
        return arr;
      },
      findWhere: function(searchObj) {
        return findObjs(element, searchObj, { multiple: false });
      },
      where: function(searchObj) {
        return findObjs(element, searchObj, { multiple: true });
        // var arr = [];
        //
        // element.forEach(function(obj) {
        //   for (var prop in searchObj) {
        //     if (obj[prop] === searchObj[prop]) {
        //       arr.push(obj);
        //     }
        //   }
        // });
        //
        // return arr;
      },
      pluck: function(searchKey) {
        var arr = [];

        element.forEach(function(obj) {
          if (obj[searchKey]) {
            arr.push(obj[searchKey]);
          }
        });

        return arr;
      },
      keys: function() {
        return Object.keys(element);
      },
      values: function() {
        return Object.values(element);
      },
      pick: function() {
        var args = [].slice.call(arguments);

        return newModifiedObject(args, element, { pick: true });
      },
      omit: function() {
        var args = [].slice.call(arguments);

        return newModifiedObject(args, element, { omit: true });
      },
      has: function(property) {
        return Object.prototype.hasOwnProperty.call(element, property);
      },
    };

    (["isElement", "isArray", "isObject", "isBoolean", "isString", "isFunction", "isNumber"]).forEach(function(method) {
      u[method] = function() { _[method].call(u, element); };
    });

    return u;
  };

  _.range = function(start, stop) {
    var arr = [];
    if (!stop) {
      stop = start;
      start = 0;
    }

    for (var i=start; i < stop; i++) {
      arr.push(i);
    }
    return arr;
  };

  _.extend = function() {
    var args = [].slice.call(arguments);

    var oldObj = args[0];
    var newObjs = args.slice(1);

    newObjs.forEach(function(obj) {
      for (var prop in obj) {
        oldObj[prop] = obj[prop];
      }
    });

    return oldObj;
  };

  _.isElement = function(ele) {
    return ele && ele.nodeType === 1;
  };

  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };

  _.isObject = function(obj) {
    var type = typeof obj;

    return type === "function" || type === "object" && !!obj;
  };

  _.isFunction = function(obj) {
    var type = typeof obj;

    return type === "function";
  };

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === ["object " + method];
    };
  });

  _.isBoolean = function(obj) {
    return toString.call(obj) === "[object Boolean]";
  };

  _.isString = function(obj) {
    return toString.call(obj) === "[object String]";
  };

  _.isNumber = function(obj) {
    return toString.call(obj) === "[object Number]";
  };

  window._ = _;
})();
