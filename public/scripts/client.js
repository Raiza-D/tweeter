/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1652654002002,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1652740402002,
    },
    {
      user: {
        name: "Theodore",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@theo",
      },
      content: {
        text: "Much ado about nothing",
      },
      created_at: 1652740402002,
    },
  ];

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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  renderTweets(data);
});