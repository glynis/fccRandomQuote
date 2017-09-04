/* is.950.08.2017 */

function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

var currentQuote = '', currentAuthor = '';

function openURL(url) {
  window.open(url, 'Share', 'width=500, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
}

// https://market.mashape.com/andruxnet/random-famous-quotes
// https://quotesondesign.com/api-v4-0/

$('#new-quote').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    success: function(data) {
      var post = data.shift(); // data is array of posts, grab the first one
      $('#quote-text').html('"' + post.content + '" ');
      if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
        $('#quote-source').html('- ' + post.custom_meta.Source); // if the source is available, display it
      } else {
        $('#quote-source').text(''); // else, don't
      }
    },
    cache:false
  });
});
//$(document).ready(function() {
//  $('#new-quote').on('click', getQuote);
//  $('#tweet-quote').on('click', function() {
//    if(!inIframe()) {
//      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
//    }
//  });
// });
