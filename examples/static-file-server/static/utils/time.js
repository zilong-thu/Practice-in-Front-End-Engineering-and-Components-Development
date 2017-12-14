;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.Time = factory();
}(this, function () {
  'use strict';

  function Time() {
    var param = arguments.length ? new Date(arguments[0]) : new Date();
    this._date = param;
  }

  var DAY = 24 * 60 * 60 * 1000;

  Time.prototype.toString = function() {
    return this._date.toString();
  };

  Time.prototype.valueOf = function() {
    return this._date.valueOf();
  };

  return Time;
}));

