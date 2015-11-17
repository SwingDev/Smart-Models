require('./SmartModel');

let collectionCache = {};
let constructorFromStatic = false; // This is very ugly hack but it's nessesary as long as JS doesn't have private properties

module.exports = class Collection extends Array {
  constructor(key) {
    super();
    if(!constructorFromStatic) {
      throw new Error('Calling constructors of Collections is forbidden, use ' + this.constructor.name + '.create instead');
    }
    this.__collectionName = key;
    // Here loading data from cache
    let localStorageItem = localStorage.getItem(this.cacheKeyName);
    if(localStorageItem) {
      let collection = JSON.parse(localStorageItem);

      // right now we assume all objects inside the collection are the instance of the same class. If not, we should change serializator and deserializator

      for(let item of collection) {
        this.push(this.type.create(item));
      }

    }
  }

  static getCacheKey(key) {
    return [this.name , key ].join('___');
  }

  static create(key) {
    var cacheKey = this.getCacheKey(key);
    if(collectionCache[cacheKey]) {
      return collectionCache[cacheKey];
    } else {

      constructorFromStatic = true;
      var newCollection = new this(key);
      constructorFromStatic = false;

      collectionCache[cacheKey] = newCollection;
      return newCollection;
    }
  }

  saveCache() {
    localStorage.setItem(this.constructor.getCacheKey(this.__collectionName), JSON.stringify(this.items));
  }

  get type() {
    return SmartModel;
  }

  get [Symbol.isConcatSpreadable]() {
    return false;
  }
};
