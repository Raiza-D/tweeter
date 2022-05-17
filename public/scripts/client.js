/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }


const createTweetElement = function(tweet) {
  let $tweet =
  `<article class="tweet-container">
    <header class="inner-header">
      <img src=${tweet.user.avatars}>
      <div class="name-handle">
        <span>${tweet.user.name}</span>
        <a href="#">${tweet.user.handle}</a>
      </div>
    </header>

    <section class="article-body">
      <p>${tweet.content.text}</p>
    </section>
    
    <footer class="article-footer">
      <span>${tweet.created_at}</span>
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;

  return $tweet;
};

const $tweet = createTweetElement(tweetData);

console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});

