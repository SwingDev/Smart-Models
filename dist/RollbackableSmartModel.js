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

},{"./SmartModel":1,"./utils":3}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvU21hcnRNb2RlbC5qcyIsIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvc3JjL2Zha2VfZWNlODVmYWIuanMiLCIvVXNlcnMva3VsYWsvc3dpbmcvc21hcnQtbW9kZWxzL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7O0FBR2IsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFBO0FBQ3RCLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFBOztBQUVqQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDOztJQUVqQyxVQUFVO0FBQ0gsV0FEUCxVQUFVLENBQ0YsSUFBSSxFQUFFOzBCQURkLFVBQVU7O0FBRVosUUFBRyxDQUFDLHFCQUFxQixFQUFFO0FBQ3pCLFlBQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztLQUN2SDtBQUNELFVBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkIsV0FBTyxJQUFJLENBQUM7R0FDYjs7ZUFQRyxVQUFVOztXQVNJLHVCQUFHO0FBQ25CLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNsQjs7O1dBV1ksa0JBQUc7QUFDZCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFWSxnQkFBQyxJQUFJLEVBQUU7QUFDbEIsVUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtBQUN2QixjQUFNLElB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LENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDbkI7T0FDSDtJQUNIO0FBQ0QsT0FBSSxFQUFFLFFBQVE7Q0FDakIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cblxubGV0IHNtYXJ0TW9kZWxNYXAgPSB7fVxubGV0IGNvbnN0cnVjdG9yRnJvbVN0YXRpYyA9IGZhbHNlXG5cbmxldCBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzJykuZXh0ZW5kO1xuXG5jbGFzcyBTbWFydE1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIGlmKCFjb25zdHJ1Y3RvckZyb21TdGF0aWMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FsbGluZyBjb25zdHJ1Y3RvcnMgb24gU21hcnRNb2RlbHMgaXMgZm9yYmlkZGVuLCB1c2UgJyArIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcuY3JlYXRlIGluc3RlYWQnKTtcbiAgICB9XG4gICAgZXh0ZW5kKHRoaXMsIGRhdGEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhdGljIGdldENhY2hlS2V5KCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGNhY2hlKCkge1xuICAgIGxldCBjYWNoZUtleSA9IHRoaXMuZ2V0Q2FjaGVLZXkoKTtcblxuICAgIGlmKCFzbWFydE1vZGVsTWFwW2NhY2hlS2V5XSkge1xuICAgICAgc21hcnRNb2RlbE1hcFtjYWNoZUtleV0gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIHJldHVybiBzbWFydE1vZGVsTWFwW2NhY2hlS2V5XTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRLZXkoKSB7XG4gICAgcmV0dXJuICdpZCc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKGRhdGEpIHtcbiAgICBpZighZGF0YVt0aGlzLmdldEtleSgpXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuZ2V0S2V5KCl9IGZpZWxkIGlzIHJlcXVpcmVkLmApO1xuICAgIH1cbiAgICBpZih0aGlzLmNhY2hlLmhhcyhkYXRhW3RoaXMuZ2V0S2V5KCldKSkge1xuICAgICAgdmFyIGNhY2hlZE9iamVjdCA9IHRoaXMuY2FjaGUuZ2V0KGRhdGFbdGhpcy5nZXRLZXkoKV0pO1xuICAgICAgZXh0ZW5kKGNhY2hlZE9iamVjdCwgZGF0YSk7XG4gICAgICByZXR1cm4gY2FjaGVkT2JqZWN0O1xuICAgIH1cblxuICAgIC8vIGl0J3MgZmlyc3QgdGltZSB0aGlzIG9iamVjdCBhcHBlYXJlZFxuICAgIGNvbnN0cnVjdG9yRnJvbVN0YXRpYyA9IHRydWU7XG4gICAgdmFyIG5ld09iamVjdCA9IG5ldyB0aGlzKGRhdGEpO1xuICAgIGNvbnN0cnVjdG9yRnJvbVN0YXRpYyA9IGZhbHNlO1xuICAgIHRoaXMuY2FjaGUuc2V0KGRhdGFbdGhpcy5nZXRLZXkoKV0sIG5ld09iamVjdCk7XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckNhY2hlKCkge1xuICAgIHNtYXJ0TW9kZWxNYXAgPSB7fTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNtYXJ0TW9kZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbmxldCBTbWFydE1vZGVsID0gcmVxdWlyZSgnLi9TbWFydE1vZGVsJyk7XG5sZXQge2V4dGVuZCwgY29weX0gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmNsYXNzIFJvbGxiYWNrYWJsZVNtYXJ0TW9kZWwgZXh0ZW5kcyBTbWFydE1vZGVsIHtcbiAgc3RhdGljIGNyZWF0ZShkYXRhKSB7XG4gICAgbGV0IG1vZGVsID0gc3VwZXIuY3JlYXRlKGRhdGEpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgJ19fZGVmYXVsdHMnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBjb3B5KGRhdGEpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICByb2xsYmFjaygpIHtcbiAgICBleHRlbmQodGhpcywgdGhpcy5fX2RlZmF1bHRzKTtcbiAgfVxuXG4gIGNvbW1pdCgpIHsgLy8gTWF5YmUgYmV0dGVyIG5hbWUgZm9yIHRoaXMgbWV0aG9kXG4gICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9fZGVmYXVsdHMpLmZvckVhY2goKGtleSkgPT4gdGhpcy5fX2RlZmF1bHRzW2tleV0gPSBtb2RlbFtrZXldKTtcbiAgfVxuXG4gIGlzUHJpc3RpbmUoKSB7XG4gICAgbGV0IG1vZGVsID0gdGhpcztcbiAgICB2YXIgbWFwVG9Cb29scyA9IChrZXkpID0+IHRoaXMuX19kZWZhdWx0c1trZXldID09PSBtb2RlbFtrZXldO1xuICAgIGxldCBtYXBwZWRCb29scyA9IE9iamVjdC5rZXlzKHRoaXMuX19kZWZhdWx0cykubWFwKG1hcFRvQm9vbHMpO1xuXG4gICAgbGV0IGlzUHJpc3RpbmUgPSBtYXBwZWRCb29scy5yZWR1Y2UoKHZhbHVlLCBtZW1vKSA9PiB2YWx1ZSAmJiBtZW1vLCB0cnVlKTtcblxuICAgIHJldHVybiBpc1ByaXN0aW5lO1xuICB9XG5cbiAgaXNEaXJ0eSgpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNQcmlzdGluZSgpO1xuICB9XG5cbiAgcm9sbGJhY2tWYWx1ZShrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fX2RlZmF1bHRzW2tleV07XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvbGxiYWNrYWJsZVNtYXJ0TW9kZWw7XG4iLCJmdW5jdGlvbiBkZWVwQ29weShvKSB7XG4gICAgdmFyIGNvcHkgPSBvLGs7XG4gXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvcHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XScgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKGsgaW4gbykge1xuICAgICAgICAgICAgY29weVtrXSA9IGRlZXBDb3B5KG9ba10pO1xuICAgICAgICB9XG4gICAgfVxuIFxuICAgIHJldHVybiBjb3B5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24ob2JqLCBvYmoyKSB7XG4gICAgICAgZm9yICh2YXIgaSBpbiBvYmoyKSB7XG4gICAgICAgICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICBvYmpbaV0gPSBvYmoyW2ldO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSxcbiAgICBjb3B5OiBkZWVwQ29weVxufTsiXX0=
