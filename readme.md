readingTimeLeft.js
================

A lightweight and ultra-performant jQuery plugin that tells you how many minutes there are left to read in a piece of text. Check out the [demo](http://christophemarois.github.io/readingTimeLeft.js/examples/example.html) and send me love.

![](http://christophemarois.github.io/readingTimeLeft.js/examples/example.png)

Installation
----------------
- Get the latest release from [releases/tags](https://github.com/christophemarois/readingTimeLeft/releases) or by running `bower install readingTimeLeft`
- Copy or link to either `readingTimeLeft.js` or `readingTimeLeft.min.js` from the `lib` folder to your folder containing your scripts
- Add it after you include jQuery
- You're ready to go!

Usage
----------------
<a name="bu"/>
#### Basic usage

```javascript
$('#my-container').readingTimeLeft({ options... })
```

`readingTimeLeft()` stores the quantity of words left in every child of the container it has been called on. When scrolling, the plugin detects which children are visible in the viewport and a `timechange` event will be called on the container, containing a computed `minutesLeft` argument, which you can use to update your UI in the way you want to.

###### Example:
```javascript
$('#my-container')
  .readingTimeLeft()
  .on('timechange', function(e, minutesLeft) {

    console.log(minutesLeft);
    // => 3.453984726

    var text;
    if (minutesLeft < 1) {
      text = 'less than 1 min'
    } else {
      text = Math.round(minutesLeft) + ' min';
    }

    window.document.title = text;
    // => 3 minutes left

  });
```

This will update the document title to the amount of time left to read in realtime.

#### Advanced usage

`readingTimeLeft()` can be customized with three options:

`stepSelector`: what type of children to look for in the container.
`wordsPerMinute`: how many wpm we are expecting the user to read at.
`eventName`: the name of the event that will be triggered on the container. It is also appended as a namespace for the `scroll` and `resize` events bound on `window`.

###### Defaults:
- `stepSelector` defaults to `*`
- `wordsPerMinute` defaults to `270`
- `eventName` defaults to `timechange`

###### Example:
```javascript
$('#my-container').readingTimeLeft({
  // Will only select <p> and <blockquote> children
  stepSelector: 'p, blockquote',
  // Consider 400 words per minute of reading time
  wordsPerMinute: 400,
  // Trigger an event named “minutesleft”
  eventName: "minutesleft"
}).on('minutesleft', function (e, minutesLeft) {
  console.log(minutesLeft);
});
```

#### Destroy instance

To destroy an instance of `readingTimeLeft()`, call:

```javascript
  $('#my-container').trigger('destroy.readingTimeLeft');
```

This will remove the data attributes on the children, plus the `scroll` and `resize` event on `window`.

## Support
__Chrome, Firefox 3.0+, IE6+, Safari 4.0+, Opera 10.0+__

Changelog
----------------
`1.0`

- Initial release
