/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
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
        <p>${escape(tweet.content.text)}</p>
      </section>
      
      <footer class="article-footer">
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;

    return $tweet;
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      // const tweetVariable = $(createTweetElement(tweet));
      // tweetVariable.find(".article-body p").text(tweet.content.text);
      $("#tweets-container").prepend($tweet);
    }
  };

  const loadTweets = function () {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  };

  loadTweets();


  $("form").submit(function(event) {
    event.preventDefault();

    if (!$("textarea").val()) {
      alert("Tweet form cannot be empty!");
      return;
    }
    
    if ($("textarea").val().length > 140) {
      alert("Tweet length cannot exceed 140 characters!");
      return;
    }

    const textAreaData = $(this).serialize();

    $.post("/tweets", textAreaData)
       .then(result => {
         $("#tweet-text").val('');
         loadTweets();
      })
    })

});
