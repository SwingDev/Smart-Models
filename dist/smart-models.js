(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./SmartModel":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmartModel = require('./SmartModel');

var _require = require('./utils');

var extend = _require.extend;
var copy = _require.copy;

var RollbackableSmartModel = (function (_SmartModel) {
  _inherits(RollbackableSmartModel, _SmartModel);

  function RollbackableSmartModel() {
    _classCallCheck(this, RollbackableSmartModel);

    _get(Object.getPrototypeOf(RollbackableSmartModel.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(RollbackableSmartModel, [{
    key: 'rollback',
    value: function rollback() {
      extend(this, this.__defaults);
    }
  }, {
    key: 'commit',
    value: function commit() {
      var _this = this;

      // Maybe better name for this method
      var model = this;
      Object.keys(this.__defaults).forEach(function (key) {
        return _this.__defaults[key] = model[key];
      });
    }
  }, {
    key: 'isPristine',
    value: function isPristine() {
      var _this2 = this;

      var model = this;
      var mapToBools = function mapToBools(key) {
        return _this2.__defaults[key] === model[key];
      };
      var mappedBools = Object.keys(this.__defaults).map(mapToBools);

      var isPristine = mappedBools.reduce(function (value, memo) {
        return value && memo;
      }, true);

      return isPristine;
    }
  }, {
    key: 'isDirty',
    value: function isDirty() {
      return !this.isPristine();
    }
  }, {
    key: 'rollbackValue',
    value: function rollbackValue(key) {
      return this.__defaults[key];
    }
  }], [{
    key: 'create',
    value: function create(data) {
      var model = _get(Object.getPrototypeOf(RollbackableSmartModel), 'create', this).call(this, data);
      Object.defineProperty(model, '__defaults', {
        enumerable: false,
        configurable: false,
        writable: true,
        value: copy(data)
      });

      return model;
    }
  }]);

  return RollbackableSmartModel;
})(SmartModel);

module.exports = RollbackableSmartModel;

},{"./SmartModel":3,"./utils":5}],3:[function(require,module,exports){
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

},{"./utils":5}],4:[function(require,module,exports){
// Smart Models
'use strict';

window.SmartModel = require('./SmartModel');
window.RollbackableSmartModel = require('./RollbackableSmartModel');

// Collections
window.Collection = require('./Collection');

},{"./Collection":1,"./RollbackableSmartModel":2,"./SmartModel":3}],5:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvQ29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvc3JjL1JvbGxiYWNrYWJsZVNtYXJ0TW9kZWwuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvc21hcnQtbW9kZWxzL3NyYy9TbWFydE1vZGVsLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvZmFrZV9jYjM3ZmRkNS5qcyIsIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFeEIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDOztBQUVsQyxNQUFNLENBQUMsT0FBTztZQUFTLFVBQVU7O0FBQ3BCLFdBRFUsVUFBVSxDQUNuQixHQUFHLEVBQUU7MEJBREksVUFBVTs7QUFFN0IsK0JBRm1CLFVBQVUsNkNBRXJCO0FBQ1IsUUFBRyxDQUFDLHFCQUFxQixFQUFFO0FBQ3pCLFlBQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztLQUN2SDtBQUNELFFBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7O0FBRTVCLFFBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0QsUUFBRyxnQkFBZ0IsRUFB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InNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vU21hcnRNb2RlbCcpO1xuXG5sZXQgY29sbGVjdGlvbkNhY2hlID0ge307XG5sZXQgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2U7IC8vIFRoaXMgaXMgdmVyeSB1Z2x5IGhhY2sgYnV0IGl0J3MgbmVzc2VzYXJ5IGFzIGxvbmcgYXMgSlMgZG9lc24ndCBoYXZlIHByaXZhdGUgcHJvcGVydGllc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBBcnJheSB7XG4gIGNvbnN0cnVjdG9yKGtleSkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYoIWNvbnN0cnVjdG9yRnJvbVN0YXRpYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsaW5nIGNvbnN0cnVjdG9ycyBvZiBDb2xsZWN0aW9ucyBpcyBmb3JiaWRkZW4sIHVzZSAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJy5jcmVhdGUgaW5zdGVhZCcpO1xuICAgIH1cbiAgICB0aGlzLl9fY29sbGVjdGlvbk5hbWUgPSBrZXk7XG4gICAgLy8gSGVyZSBsb2FkaW5nIGRhdGEgZnJvbSBjYWNoZVxuICAgIGxldCBsb2NhbFN0b3JhZ2VJdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5jYWNoZUtleU5hbWUpO1xuICAgIGlmKGxvY2FsU3RvcmFnZUl0ZW0pIHtcbiAgICAgIGxldCBjb2xsZWN0aW9uID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VJdGVtKTtcblxuICAgICAgLy8gcmlnaHQgbm93IHdlIGFzc3VtZSBhbGwgb2JqZWN0cyBpbnNpZGUgdGhlIGNvbGxlY3Rpb24gYXJlIHRoZSBpbnN0YW5jZSBvZiB0aGUgc2FtZSBjbGFzcy4gSWYgbm90LCB3ZSBzaG91bGQgY2hhbmdlIHNlcmlhbGl6YXRvciBhbmQgZGVzZXJpYWxpemF0b3JcblxuICAgICAgZm9yKGxldCBpdGVtIG9mIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5wdXNoKHRoaXMudHlwZS5jcmVhdGUoaXRlbSkpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldENhY2hlS2V5KGtleSkge1xuICAgIHJldHVybiBbdGhpcy5uYW1lICwga2V5IF0uam9pbignX19fJyk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGtleSkge1xuICAgIHZhciBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXkoa2V5KTtcbiAgICBpZihjb2xsZWN0aW9uQ2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbkNhY2hlW2NhY2hlS2V5XTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zdHJ1Y3RvckZyb21TdGF0aWMgPSB0cnVlO1xuICAgICAgdmFyIG5ld0NvbGxlY3Rpb24gPSBuZXcgdGhpcyhrZXkpO1xuICAgICAgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2U7XG5cbiAgICAgIGNvbGxlY3Rpb25DYWNoZVtjYWNoZUtleV0gPSBuZXdDb2xsZWN0aW9uO1xuICAgICAgcmV0dXJuIG5ld0NvbGxlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgc2F2ZUNhY2hlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuY29uc3RydWN0b3IuZ2V0Q2FjaGVLZXkodGhpcy5fX2NvbGxlY3Rpb25OYW1lKSwgSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtcykpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIFNtYXJ0TW9kZWw7XG4gIH1cblxuICBnZXQgW1N5bWJvbC5pc0NvbmNhdFNwcmVhZGFibGVdKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubGV0IFNtYXJ0TW9kZWwgPSByZXF1aXJlKCcuL1NtYXJ0TW9kZWwnKTtcbmxldCB7ZXh0ZW5kLCBjb3B5fSA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuY2xhc3MgUm9sbGJhY2thYmxlU21hcnRNb2RlbCBleHRlbmRzIFNtYXJ0TW9kZWwge1xuICBzdGF0aWMgY3JlYXRlKGRhdGEpIHtcbiAgICBsZXQgbW9kZWwgPSBzdXBlci5jcmVhdGUoZGF0YSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCAnX19kZWZhdWx0cycsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGNvcHkoZGF0YSlcbiAgICB9KTtcblxuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIHJvbGxiYWNrKCkge1xuICAgIGV4dGVuZCh0aGlzLCB0aGlzLl9fZGVmYXVsdHMpO1xuICB9XG5cbiAgY29tbWl0KCkgeyAvLyBNYXliZSBiZXR0ZXIgbmFtZSBmb3IgdGhpcyBtZXRob2RcbiAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX19kZWZhdWx0cykuZm9yRWFjaCgoa2V5KSA9PiB0aGlzLl9fZGVmYXVsdHNba2V5XSA9IG1vZGVsW2tleV0pO1xuICB9XG5cbiAgaXNQcmlzdGluZSgpIHtcbiAgICBsZXQgbW9kZWwgPSB0aGlzO1xuICAgIHZhciBtYXBUb0Jvb2xzID0gKGtleSkgPT4gdGhpcy5fX2RlZmF1bHRzW2tleV0gPT09IG1vZGVsW2tleV07XG4gICAgbGV0IG1hcHBlZEJvb2xzID0gT2JqZWN0LmtleXModGhpcy5fX2RlZmF1bHRzKS5tYXAobWFwVG9Cb29scyk7XG5cbiAgICBsZXQgaXNQcmlzdGluZSA9IG1hcHBlZEJvb2xzLnJlZHVjZSgodmFsdWUsIG1lbW8pID0+IHZhbHVlICYmIG1lbW8sIHRydWUpO1xuXG4gICAgcmV0dXJuIGlzUHJpc3RpbmU7XG4gIH1cblxuICBpc0RpcnR5KCkge1xuICAgIHJldHVybiAhdGhpcy5pc1ByaXN0aW5lKCk7XG4gIH1cblxuICByb2xsYmFja1ZhbHVlKGtleSkge1xuICAgIHJldHVybiB0aGlzLl9fZGVmYXVsdHNba2V5XTtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9sbGJhY2thYmxlU21hcnRNb2RlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuXG5sZXQgc21hcnRNb2RlbE1hcCA9IHt9XG5sZXQgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2VcblxubGV0IGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5leHRlbmQ7XG5cbmNsYXNzIFNtYXJ0TW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgaWYoIWNvbnN0cnVjdG9yRnJvbVN0YXRpYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsaW5nIGNvbnN0cnVjdG9ycyBvbiBTbWFydE1vZGVscyBpcyBmb3JiaWRkZW4sIHVzZSAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJy5jcmVhdGUgaW5zdGVhZCcpO1xuICAgIH1cbiAgICBleHRlbmQodGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FjaGVLZXkoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgY2FjaGUoKSB7XG4gICAgbGV0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSgpO1xuXG4gICAgaWYoIXNtYXJ0TW9kZWxNYXBbY2FjaGVLZXldKSB7XG4gICAgICBzbWFydE1vZGVsTWFwW2NhY2hlS2V5XSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNtYXJ0TW9kZWxNYXBbY2FjaGVLZXldO1xuICB9XG5cbiAgc3RhdGljIGdldEtleSgpIHtcbiAgICByZXR1cm4gJ2lkJztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZGF0YSkge1xuICAgIGlmKCFkYXRhW3RoaXMuZ2V0S2V5KCldKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5nZXRLZXkoKX0gZmllbGQgaXMgcmVxdWlyZWQuYCk7XG4gICAgfVxuICAgIGlmKHRoaXMuY2FjaGUuaGFzKGRhdGFbdGhpcy5nZXRLZXkoKV0pKSB7XG4gICAgICB2YXIgY2FjaGVkT2JqZWN0ID0gdGhpcy5jYWNoZS5nZXQoZGF0YVt0aGlzLmdldEtleSgpXSk7XG4gICAgICBleHRlbmQoY2FjaGVkT2JqZWN0LCBkYXRhKTtcbiAgICAgIHJldHVybiBjYWNoZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaXQncyBmaXJzdCB0aW1lIHRoaXMgb2JqZWN0IGFwcGVhcmVkXG4gICAgY29uc3RydWN0b3JGcm9tU3RhdGljID0gdHJ1ZTtcbiAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IHRoaXMoZGF0YSk7XG4gICAgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2U7XG4gICAgdGhpcy5jYWNoZS5zZXQoZGF0YVt0aGlzLmdldEtleSgpXSwgbmV3T2JqZWN0KTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG5cbiAgc3RhdGljIGNsZWFyQ2FjaGUoKSB7XG4gICAgc21hcnRNb2RlbE1hcCA9IHt9O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU21hcnRNb2RlbDtcbiIsIi8vIFNtYXJ0IE1vZGVsc1xud2luZG93LlNtYXJ0TW9kZWwgPSByZXF1aXJlKCcuL1NtYXJ0TW9kZWwnKTtcbndpbmRvdy5Sb2xsYmFja2FibGVTbWFydE1vZGVsID0gcmVxdWlyZSgnLi9Sb2xsYmFja2FibGVTbWFydE1vZGVsJyk7XG5cbi8vIENvbGxlY3Rpb25zXG53aW5kb3cuQ29sbGVjdGlvbiA9IHJlcXVpcmUoJy4vQ29sbGVjdGlvbicpOyIsImZ1bmN0aW9uIGRlZXBDb3B5KG8pIHtcbiAgICB2YXIgY29weSA9IG8saztcbiBcbiAgICBpZiAobyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29weSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/IFtdIDoge307XG4gICAgICAgIGZvciAoayBpbiBvKSB7XG4gICAgICAgICAgICBjb3B5W2tdID0gZGVlcENvcHkob1trXSk7XG4gICAgICAgIH1cbiAgICB9XG4gXG4gICAgcmV0dXJuIGNvcHk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihvYmosIG9iajIpIHtcbiAgICAgICBmb3IgKHZhciBpIGluIG9iajIpIHtcbiAgICAgICAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgIG9ialtpXSA9IG9iajJbaV07XG4gICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9LFxuICAgIGNvcHk6IGRlZXBDb3B5XG59OyJdfQ==
