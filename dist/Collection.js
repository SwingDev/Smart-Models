(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var smartModelMap = {};
var constructorFromStatic = false;

var extend = require('./utils').extend;

var SmartModel = (function () {
  function SmartModel(data) {
    _classCallCheck(this, SmartModel);

    if (!constructorFromStatic) {
      throw new Error('Calling constructors on SmartModels is forbidden, use ' + this.constructor.name + '.create instead');
    }
    extend(this, data);
    return this;
  }

  _createClass(SmartModel, null, [{
    key: 'getCacheKey',
    value: function getCacheKey() {
      return this.name;
    }
  }, {
    key: 'getKey',
    value: function getKey() {
      return 'id';
    }
  }, {
    key: 'create',
    value: function create(data) {
      if (!data[this.getKey()]) {
        throw new Error(this.getKey() + ' field is required.');
      }
      if (this.cache.has(data[this.getKey()])) {
        var cachedObject = this.cache.get(data[this.getKey()]);
        extend(cachedObject, data);
        return cachedObject;
      }

      // it's first time this object appeared
      constructorFromStatic = true;
      var newObject = new this(data);
      constructorFromStatic = false;
      this.cache.set(data[this.getKey()], newObject);
      return newObject;
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      smartModelMap = {};
    }
  }, {
    key: 'cache',
    get: function get() {
      var cacheKey = this.getCacheKey();

      if (!smartModelMap[cacheKey]) {
        smartModelMap[cacheKey] = new Map();
      }
      return smartModelMap[cacheKey];
    }
  }]);

  return SmartModel;
})();

;

module.exports = SmartModel;

},{"./utils":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./SmartModel');

var collectionCache = {};
var constructorFromStatic = false; // This is very ugly hack but it's nessesary as long as JS doesn't have private properties

module.exports = (function (_Array) {
  _inherits(Collection, _Array);

  function Collection(key) {
    _classCallCheck(this, Collection);

    _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this);
    if (!constructorFromStatic) {
      throw new Error('Calling constructors of Collections is forbidden, use ' + this.constructor.name + '.create instead');
    }
    this.__collectionName = key;
    // Here loading data from cache
    var localStorageItem = localStorage.getItem(this.cacheKeyName);
    if (localStorageItem) {
      var collection = JSON.parse(localStorageItem);

      // right now we assume all objects inside the collection are the instance of the same class. If not, we should change serializator and deserializator

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = collection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          this.push(this.type.create(item));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  _createClass(Collection, [{
    key: 'saveCache',
    value: function saveCache() {
      localStorage.setItem(this.constructor.getCacheKey(this.__collectionName), JSON.stringify(this.items));
    }
  }, {
    key: 'type',
    get: function get() {
      return SmartModel;
    }
  }, {
    key: Symbol.isConcatSpreadable,
    get: function get() {
      return false;
    }
  }], [{
    key: 'getCacheKey',
    value: function getCacheKey(key) {
      return [this.name, key].join('___');
    }
  }, {
    key: 'create',
    value: function create(key) {
      var cacheKey = this.getCacheKey(key);
      if (collectionCache[cacheKey]) {
        return collectionCache[cacheKey];
      } else {

        constructorFromStatic = true;
        var newCollection = new this(key);
        constructorFromStatic = false;

        collectionCache[cacheKey] = newCollection;
        return newCollection;
      }
    }
  }]);

  return Collection;
})(Array);

},{"./SmartModel":1}],3:[function(require,module,exports){
'use strict';

function deepCopy(o) {
   var copy = o,
       k;

   if (o && typeof o === 'object') {
      copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
      for (k in o) {
         copy[k] = deepCopy(o[k]);
      }
   }

   return copy;
};

module.exports = {
   extend: function extend(obj, obj2) {
      for (var i in obj2) {
         if (obj2.hasOwnProperty(i)) {
            obj[i] = obj2[i];
         }
      }
   },
   copy: deepCopy
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvU21hcnRNb2RlbC5qcyIsIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvc3JjL2Zha2VfN2QxYjM4Y2UuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvc21hcnQtbW9kZWxzL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBR2IsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO0FBQ3RCLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFBOztBQUVqQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDOztJQUVqQyxVQUFVO0FBQ0gsV0FEUCxVQUFVLENBQ0YsSUFBSSxFQUFFOzBCQURkLFVBQVU7O0FBRVosUUFBRyxDQUFDLHFCQUFxQixFQUFFO0FBQ3pCLFlBQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztLQUN2SDtBQUNELFVBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkIsV0FBTyxJQUFJLENBQUM7R0FDYjs7ZUFQRyxVQUFVOztXQVNJLHVCQUFHO0FBQ25CLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7O1dBV1ksa0JBQUc7QUFDZCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFWSxnQkFBQyxJQUFJLEVBQUU7QUFDbEIsVUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUN2QixjQUFNLElB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SSxDQUFDLElBQUksSUFBSSxFQUFFO0FBQ2pCLGFBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN6QixlQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ25CO09BQ0g7SUFDSDtBQUNELE9BQUksRUFBRSxRQUFRO0NBQ2pCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmxldCBzbWFydE1vZGVsTWFwID0ge31cbmxldCBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSBmYWxzZVxuXG5sZXQgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscycpLmV4dGVuZDtcblxuY2xhc3MgU21hcnRNb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBpZighY29uc3RydWN0b3JGcm9tU3RhdGljKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgY29uc3RydWN0b3JzIG9uIFNtYXJ0TW9kZWxzIGlzIGZvcmJpZGRlbiwgdXNlICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnLmNyZWF0ZSBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIGV4dGVuZCh0aGlzLCBkYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYWNoZUtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc3RhdGljIGdldCBjYWNoZSgpIHtcbiAgICBsZXQgY2FjaGVLZXkgPSB0aGlzLmdldENhY2hlS2V5KCk7XG5cbiAgICBpZighc21hcnRNb2RlbE1hcFtjYWNoZUtleV0pIHtcbiAgICAgIHNtYXJ0TW9kZWxNYXBbY2FjaGVLZXldID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICByZXR1cm4gc21hcnRNb2RlbE1hcFtjYWNoZUtleV07XG4gIH1cblxuICBzdGF0aWMgZ2V0S2V5KCkge1xuICAgIHJldHVybiAnaWQnO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZShkYXRhKSB7XG4gICAgaWYoIWRhdGFbdGhpcy5nZXRLZXkoKV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmdldEtleSgpfSBmaWVsZCBpcyByZXF1aXJlZC5gKTtcbiAgICB9XG4gICAgaWYodGhpcy5jYWNoZS5oYXMoZGF0YVt0aGlzLmdldEtleSgpXSkpIHtcbiAgICAgIHZhciBjYWNoZWRPYmplY3QgPSB0aGlzLmNhY2hlLmdldChkYXRhW3RoaXMuZ2V0S2V5KCldKTtcbiAgICAgIGV4dGVuZChjYWNoZWRPYmplY3QsIGRhdGEpO1xuICAgICAgcmV0dXJuIGNhY2hlZE9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpdCdzIGZpcnN0IHRpbWUgdGhpcyBvYmplY3QgYXBwZWFyZWRcbiAgICBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSB0cnVlO1xuICAgIHZhciBuZXdPYmplY3QgPSBuZXcgdGhpcyhkYXRhKTtcbiAgICBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSBmYWxzZTtcbiAgICB0aGlzLmNhY2hlLnNldChkYXRhW3RoaXMuZ2V0S2V5KCldLCBuZXdPYmplY3QpO1xuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cblxuICBzdGF0aWMgY2xlYXJDYWNoZSgpIHtcbiAgICBzbWFydE1vZGVsTWFwID0ge307XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTbWFydE1vZGVsO1xuIiwicmVxdWlyZSgnLi9TbWFydE1vZGVsJyk7XG5cbmxldCBjb2xsZWN0aW9uQ2FjaGUgPSB7fTtcbmxldCBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSBmYWxzZTsgLy8gVGhpcyBpcyB2ZXJ5IHVnbHkgaGFjayBidXQgaXQncyBuZXNzZXNhcnkgYXMgbG9uZyBhcyBKUyBkb2Vzbid0IGhhdmUgcHJpdmF0ZSBwcm9wZXJ0aWVzXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5IHtcbiAgY29uc3RydWN0b3Ioa2V5KSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZighY29uc3RydWN0b3JGcm9tU3RhdGljKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmcgY29uc3RydWN0b3JzIG9mIENvbGxlY3Rpb25zIGlzIGZvcmJpZGRlbiwgdXNlICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnLmNyZWF0ZSBpbnN0ZWFkJyk7XG4gICAgfVxuICAgIHRoaXMuX19jb2xsZWN0aW9uTmFtZSA9IGtleTtcbiAgICAvLyBIZXJlIGxvYWRpbmcgZGF0YSBmcm9tIGNhY2hlXG4gICAgbGV0IGxvY2FsU3RvcmFnZUl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmNhY2hlS2V5TmFtZSk7XG4gICAgaWYobG9jYWxTdG9yYWdlSXRlbSkge1xuICAgICAgbGV0IGNvbGxlY3Rpb24gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZUl0ZW0pO1xuXG4gICAgICAvLyByaWdodCBub3cgd2UgYXNzdW1lIGFsbCBvYmplY3RzIGluc2lkZSB0aGUgY29sbGVjdGlvbiBhcmUgdGhlIGluc3RhbmNlIG9mIHRoZSBzYW1lIGNsYXNzLiBJZiBub3QsIHdlIHNob3VsZCBjaGFuZ2Ugc2VyaWFsaXphdG9yIGFuZCBkZXNlcmlhbGl6YXRvclxuXG4gICAgICBmb3IobGV0IGl0ZW0gb2YgY29sbGVjdGlvbikge1xuICAgICAgICB0aGlzLnB1c2godGhpcy50eXBlLmNyZWF0ZShpdGVtKSk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FjaGVLZXkoa2V5KSB7XG4gICAgcmV0dXJuIFt0aGlzLm5hbWUgLCBrZXkgXS5qb2luKCdfX18nKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoa2V5KSB7XG4gICAgdmFyIGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleShrZXkpO1xuICAgIGlmKGNvbGxlY3Rpb25DYWNoZVtjYWNoZUtleV0pIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uQ2FjaGVbY2FjaGVLZXldO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIGNvbnN0cnVjdG9yRnJvbVN0YXRpYyA9IHRydWU7XG4gICAgICB2YXIgbmV3Q29sbGVjdGlvbiA9IG5ldyB0aGlzKGtleSk7XG4gICAgICBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSBmYWxzZTtcblxuICAgICAgY29sbGVjdGlvbkNhY2hlW2NhY2hlS2V5XSA9IG5ld0NvbGxlY3Rpb247XG4gICAgICByZXR1cm4gbmV3Q29sbGVjdGlvbjtcbiAgICB9XG4gIH1cblxuICBzYXZlQ2FjaGUoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5jb25zdHJ1Y3Rvci5nZXRDYWNoZUtleSh0aGlzLl9fY29sbGVjdGlvbk5hbWUpLCBKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW1zKSk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gU21hcnRNb2RlbDtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZV0oKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiZnVuY3Rpb24gZGVlcENvcHkobykge1xuICAgIHZhciBjb3B5ID0gbyxrO1xuIFxuICAgIGlmIChvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb3B5ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nID8gW10gOiB7fTtcbiAgICAgICAgZm9yIChrIGluIG8pIHtcbiAgICAgICAgICAgIGNvcHlba10gPSBkZWVwQ29weShvW2tdKTtcbiAgICAgICAgfVxuICAgIH1cbiBcbiAgICByZXR1cm4gY29weTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKG9iaiwgb2JqMikge1xuICAgICAgIGZvciAodmFyIGkgaW4gb2JqMikge1xuICAgICAgICAgIGlmIChvYmoyLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgb2JqW2ldID0gb2JqMltpXTtcbiAgICAgICAgICB9XG4gICAgICAgfVxuICAgIH0sXG4gICAgY29weTogZGVlcENvcHlcbn07Il19
