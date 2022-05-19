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
        <p>${tweet.content.text}</p>
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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

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

    $.post("http://localhost:8080/tweets", textAreaData)
       .then(result => {
         $("#tweet-text").val('');
         loadTweets();
      })
    })

  const loadTweets = function() {
    $.get("http://localhost:8080/tweets", function(data) {
      renderTweets(data);
    });
  };
  
  loadTweets();
});

/* Notes from mentor session:
-Placement of createTweetElement function above/before the renderTweets function makese more sense sequentially. renderTweets calls createTweetElement. Therefore, better to place createTweetElement before renderTweets. Compass shows renderTweets placed before createTweetElement.
In terms of behaviour, the output on our page looks the same. The concept of hoisting is applied. That's why renderTweets being placed before createTweetElement still gives the same output, no break in the code. The function definitions are hoisted. So by the time,, the renderTweets function and the createTweetElement are invoked, the program has already seen the two functions and what they're both supposed to do.*/