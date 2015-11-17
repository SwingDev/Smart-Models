'use strict';

let SmartModel = require('./SmartModel');
let {extend, copy} = require('./utils');

class RollbackableSmartModel extends SmartModel {
  static create(data) {
    let model = super.create(data);
    Object.defineProperty(model, '__defaults', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: copy(data)
    });

    return model;
  }

  rollback() {
    extend(this, this.__defaults);
  }

  commit() { // Maybe better name for this method
    let model = this;
    Object.keys(this.__defaults).forEach((key) => this.__defaults[key] = model[key]);
  }

  isPristine() {
    let model = this;
    var mapToBools = (key) => this.__defaults[key] === model[key];
    let mappedBools = Object.keys(this.__defaults).map(mapToBools);

    let isPristine = mappedBools.reduce((value, memo) => value && memo, true);

    return isPristine;
  }

  isDirty() {
    return !this.isPristine();
  }

  rollbackValue(key) {
    return this.__defaults[key];
  }

}

module.exports = RollbackableSmartModel;
