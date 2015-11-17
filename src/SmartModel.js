'use strict';


let smartModelMap = {}
let constructorFromStatic = false

let extend = require('./utils').extend;

class SmartModel {
  constructor(data) {
    if(!constructorFromStatic) {
      throw new Error('Calling constructors on SmartModels is forbidden, use ' + this.constructor.name + '.create instead');
    }
    extend(this, data);
    return this;
  }

  static getCacheKey() {
    return this.name;
  }

  static get cache() {
    let cacheKey = this.getCacheKey();

    if(!smartModelMap[cacheKey]) {
      smartModelMap[cacheKey] = new Map();
    }
    return smartModelMap[cacheKey];
  }

  static getKey() {
    return 'id';
  }

  static create(data) {
    if(!data[this.getKey()]) {
      throw new Error(`${this.getKey()} field is required.`);
    }
    if(this.cache.has(data[this.getKey()])) {
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

  static clearCache() {
    smartModelMap = {};
  }

};

module.exports = SmartModel;
