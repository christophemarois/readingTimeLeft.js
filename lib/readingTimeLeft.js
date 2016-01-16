/**
 * @author  Christophe Marois
 * @license https://github.com/christophemarois/readingTimeLeft/blob/master/license.md MIT
 * @version 1.0
 */
$.fn.readingTimeLeft = function (options) {

  var s = $.extend({}, {
    stepSelector: '*',
    wordPerMinute: 270,
    eventName: 'timechange'
  }, options);

  var $this   = $(this)
    , $window = $(window)
    , $steps  = $this.find(s.stepSelector);

  // For each step element, store the quantity of words to come
  $steps.each(function (i, el) {
    var textAhead =  $steps.slice(i, $steps.length).text();
    $(el).data('words-left', textAhead.trim().split(/\s+/g).length);
  });

  // Filters elements that are in viewport
  $.fn.filterVisible = function () {
    var wW = $window.width(), wH = $window.height();
    return this.filter(function(i, e){
      var rect = e.getBoundingClientRect();
      return rect.top >= 0 && rect.right <= wW &&
        rect.bottom <= wH && rect.left >= 0;
    });
  }

  function throttle (fn, limit) {
    var wait = false;
    return function () {
      if (wait) return;
      fn.call(); wait = true;
      setTimeout(function () { wait = false; }, limit);
    }
  };

  var triggerOn = 'scroll.' + s.eventName + ' resize.' + s.eventName;

  // Throttle updating to 50ms
  $(window).on(triggerOn, throttle(function (e) {
    var wordsLeft = $steps.filterVisible().last().data('words-left');
    $this.trigger(s.eventName, wordsLeft / s.wordPerMinute);
  }, 50));

  // Destroy function
  $this.on('destroy.readingTimeLeft', function (e) {
    $(window).off(triggerOn);
    $steps.removeData('words-left');
  });

  return $this;

};
