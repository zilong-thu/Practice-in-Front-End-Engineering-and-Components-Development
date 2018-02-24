define([
  'jquery',
  '/jquery-amd-clock/clock.js',
], function($, Clock) {
  var cl = new Clock({
    container: $('#clock-container')[0],
  });
});
