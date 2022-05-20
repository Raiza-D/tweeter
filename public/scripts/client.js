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
        <p></p>
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
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const userTweet = $(createTweetElement(tweet));
      userTweet.find(".article-body p").text(tweet.content.text);
      $("#tweets-container").prepend(userTweet);
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
    $(".error-msg").slideUp();
    
    if (!$("textarea").val()) {
      // alert("Tweet form cannot be empty!");
      $(".error-msg p").empty().append("Tweet form cannot be empty!");
      $(".error-msg").slideDown("medium");
      return;
    }

    
    if ($("textarea").val().length > 140) {
      // alert("Tweet length cannot exceed 140 characters!");
      $(".error-msg p").empty().append("Tweet length cannot exceed 140 characters!");
      $(".error-msg").slideDown("medium");
      return;
    }
    
    // $(".error-msg").hide();

    const textAreaData = $(this).serialize();

    $.post("/tweets", textAreaData)
       .then(result => {
         $("#tweet-text").val('').trigger("input");
        //  $("#tweet-text").trigger("input");
         loadTweets();
      })
    })

});
