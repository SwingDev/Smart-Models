(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rdWxhay9zd2luZy9zbWFydC1tb2RlbHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2t1bGFrL3N3aW5nL3NtYXJ0LW1vZGVscy9zcmMvZmFrZV81MjU4M2MwMC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ2pCLE9BQUksSUFBSSxHQUFHLENBQUM7T0FBQyxDQUFDLENBQUM7O0FBRWYsT0FBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQzVCLFVBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUN4RSxXQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDVCxhQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQzVCO0lBQ0o7O0FBRUQsVUFBTyxJQUFJLENBQUM7Q0FDZixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDaEIsU0FBTSxFQUFFLGdCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdEIsV0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDakIsYUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pCLGVBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFDbkI7T0FDSDtJQUNIO0FBQ0QsT0FBSSxFQUFFLFFBQVE7Q0FDakIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmdW5jdGlvbiBkZWVwQ29weShvKSB7XG4gICAgdmFyIGNvcHkgPSBvLGs7XG4gXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvcHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XScgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKGsgaW4gbykge1xuICAgICAgICAgICAgY29weVtrXSA9IGRlZXBDb3B5KG9ba10pO1xuICAgICAgICB9XG4gICAgfVxuIFxuICAgIHJldHVybiBjb3B5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24ob2JqLCBvYmoyKSB7XG4gICAgICAgZm9yICh2YXIgaSBpbiBvYmoyKSB7XG4gICAgICAgICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICBvYmpbaV0gPSBvYmoyW2ldO1xuICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSxcbiAgICBjb3B5OiBkZWVwQ29weVxufTsiXX0=
