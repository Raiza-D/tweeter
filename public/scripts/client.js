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
      $("#tweets-container").prepend($tweet);
    }
  };

  $("form").submit(function(event) {
    event.preventDefault();

    const textAreaValue = $("textarea").val();
    const booleanValue = Boolean($("textarea").val());
    const booleanOppositeValue = !$("textarea").val();
    const booleanValueRevertBack = !!$("textarea").val(); // This double flips. Same boolean value as booleanValue variable
    console.log("This is the textarea value: ", textAreaValue);
    console.log("This is the boolean value: ", booleanValue);
    console.log("This is the opposite boolean value: ", booleanOppositeValue);
    console.log("We reverted back so it's the same as booleanValue: ", booleanValueRevertBack);

    if (true) {
      console.log("It's hitting true!");
    }

    if (false) {
      console.log("It's hitting FALSE!");
    }

    if (!false) {
      console.log("It's hitting TRUE because we have flipped false to true!");
    }


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

  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };
  
  loadTweets();
});
