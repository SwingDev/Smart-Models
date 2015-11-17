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

},{"./utils":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvZmFrZV8zZWM5OGQyZS5qcyIsIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFHYixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUE7QUFDdEIsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUE7O0FBRWpDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7O0lBRWpDLFVBQVU7QUFDSCxXQURQLFVBQVUsQ0FDRixJQUFJLEVBQUU7MEJBRGQsVUFBVTs7QUFFWixRQUFHLENBQUMscUJBQXFCLEVBQUU7QUFDekIsWUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3ZIO0FBQ0QsVUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQixXQUFPLElBQUksQ0FBQztHQUNiOztlQVBHLFVBQVU7O1dBU0ksdUJBQUc7QUFDbkIsYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCOzs7V0FXWSxrQkFBRztBQUNkLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUVZLGdCQUFDLElBQUksRUFBRTtBQUNsQixVQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZCLGNBQU0sSUFBSSxLQUFLLENBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSx5QkFBc0IsQ0FBQztPQUN4RDtBQUNELFVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDdEMsWUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsY0FBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQixlQUFPLFlBQVksQ0FBQztPQUNyQjs7O0FBR0QsMkJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFVBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLDJCQUFxQixHQUFHLEtBQUssQ0FBQztBQUM5QixVQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDL0MsYUFBTyxTQUFTLENBQUM7S0FDbEI7OztXQUVnQixzQkFBRztBQUNsQixtQkFBYSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7O1NBakNlLGVBQUc7QUFDakIsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUVsQyxVQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzNCLHFCQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztPQUNyQztBQUNELGFBQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDOzs7U0FwQkcsVUFBVTs7O0FBZ0RmLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7Ozs7O0FDMUQ1QixTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDakIsT0FBSSxJQUFJLEdBQUcsQ0FBQztPQUFDLENBQUMsQ0FBQzs7QUFFZixPQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDNUIsVUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ3hFLFdBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNULGFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDNUI7SUFDSjs7QUFFRCxVQUFPLElBQUksQ0FBQztDQUNmLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNoQixTQUFNLEVBQUUsZ0JBQVMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUN0QixXQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtBQUNqQixhQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsZUFBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUNuQjtPQUNIO0lBQ0g7QUFDRCxPQUFJLEVBQUUsUUFBUTtDQUNqQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuXG5sZXQgc21hcnRNb2RlbE1hcCA9IHt9XG5sZXQgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2VcblxubGV0IGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5leHRlbmQ7XG5cbmNsYXNzIFNtYXJ0TW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgaWYoIWNvbnN0cnVjdG9yRnJvbVN0YXRpYykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYWxsaW5nIGNvbnN0cnVjdG9ycyBvbiBTbWFydE1vZGVscyBpcyBmb3JiaWRkZW4sIHVzZSAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJy5jcmVhdGUgaW5zdGVhZCcpO1xuICAgIH1cbiAgICBleHRlbmQodGhpcywgZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FjaGVLZXkoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgY2FjaGUoKSB7XG4gICAgbGV0IGNhY2hlS2V5ID0gdGhpcy5nZXRDYWNoZUtleSgpO1xuXG4gICAgaWYoIXNtYXJ0TW9kZWxNYXBbY2FjaGVLZXldKSB7XG4gICAgICBzbWFydE1vZGVsTWFwW2NhY2hlS2V5XSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNtYXJ0TW9kZWxNYXBbY2FjaGVLZXldO1xuICB9XG5cbiAgc3RhdGljIGdldEtleSgpIHtcbiAgICByZXR1cm4gJ2lkJztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZGF0YSkge1xuICAgIGlmKCFkYXRhW3RoaXMuZ2V0S2V5KCldKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5nZXRLZXkoKX0gZmllbGQgaXMgcmVxdWlyZWQuYCk7XG4gICAgfVxuICAgIGlmKHRoaXMuY2FjaGUuaGFzKGRhdGFbdGhpcy5nZXRLZXkoKV0pKSB7XG4gICAgICB2YXIgY2FjaGVkT2JqZWN0ID0gdGhpcy5jYWNoZS5nZXQoZGF0YVt0aGlzLmdldEtleSgpXSk7XG4gICAgICBleHRlbmQoY2FjaGVkT2JqZWN0LCBkYXRhKTtcbiAgICAgIHJldHVybiBjYWNoZWRPYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaXQncyBmaXJzdCB0aW1lIHRoaXMgb2JqZWN0IGFwcGVhcmVkXG4gICAgY29uc3RydWN0b3JGcm9tU3RhdGljID0gdHJ1ZTtcbiAgICB2YXIgbmV3T2JqZWN0ID0gbmV3IHRoaXMoZGF0YSk7XG4gICAgY29uc3RydWN0b3JGcm9tU3RhdGljID0gZmFsc2U7XG4gICAgdGhpcy5jYWNoZS5zZXQoZGF0YVt0aGlzLmdldEtleSgpXSwgbmV3T2JqZWN0KTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG5cbiAgc3RhdGljIGNsZWFyQ2FjaGUoKSB7XG4gICAgc21hcnRNb2RlbE1hcCA9IHt9O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU21hcnRNb2RlbDtcbiIsImZ1bmN0aW9uIGRlZXBDb3B5KG8pIHtcbiAgICB2YXIgY29weSA9IG8saztcbiBcbiAgICBpZiAobyAmJiB0eXBlb2YgbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29weSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/IFtdIDoge307XG4gICAgICAgIGZvciAoayBpbiBvKSB7XG4gICAgICAgICAgICBjb3B5W2tdID0gZGVlcENvcHkob1trXSk7XG4gICAgICAgIH1cbiAgICB9XG4gXG4gICAgcmV0dXJuIGNvcHk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihvYmosIG9iajIpIHtcbiAgICAgICBmb3IgKHZhciBpIGluIG9iajIpIHtcbiAgICAgICAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgIG9ialtpXSA9IG9iajJbaV07XG4gICAgICAgICAgfVxuICAgICAgIH1cbiAgICB9LFxuICAgIGNvcHk6IGRlZXBDb3B5XG59OyJdfQ==
