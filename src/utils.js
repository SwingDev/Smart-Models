function deepCopy(o) {
    var copy = o,k;
 
    if (o && typeof o === 'object') {
        copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
        for (k in o) {
            copy[k] = deepCopy(o[k]);
        }
    }
 
    return copy;
};

module.exports = {
	extend: function(obj, obj2) {
       for (var i in obj2) {
          if (obj2.hasOwnProperty(i)) {
             obj[i] = obj2[i];
          }
       }
    },
    copy: deepCopy
};