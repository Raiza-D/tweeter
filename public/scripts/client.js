/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $(".new-tweet").hide();
  $(".scroll-comp").hide();

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

  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();


  $("form").submit(function(event) {
    event.preventDefault();
    $(".error-msg").hide();
    
    if (!$("textarea").val()) {
      $(".error-msg span").empty().append("Tweet form cannot be empty");
      $(".error-msg").slideDown();
      return;
    }
    
    if ($("textarea").val().length > 140) {
      $(".error-msg span").empty().append("Tweet exceeds 140 characters. Re-submit a shorter tweet.");
      $(".error-msg").slideDown();
      return;
    }
    
    const textAreaData = $(this).serialize();

    $.post("/tweets", textAreaData)
       .then(result => {
         $("#tweet-text").val('').trigger("input");
         loadTweets();
      })
    })

  // When user clicks on compose button top right. New-tweet section toggle show/hide.
  $(".compose").on("click", function() {
    $(".new-tweet").toggle();
    $("#tweet-text").focus();
  })

  // When user scrolls down, the round button appears. The top-right compose button is hidden.
  // When user scrolls up, Compose button top right re-appears. Then the round button disappears.
  
let startValScrollY = 0;

$(window).scroll(function(event) {
  console.log("This is scroll X: ", scrollX); // This is horizontal scroll
  console.log("This is scroll Y: ", scrollY); // This is vertical scroll
  console.log("This is scrollTop: ", $(window).scrollTop());

  let scrollTopPosition = $(this).scrollTop();
  if (scrollTopPosition > startValScrollY) {
    // When user scrolls down, execute:
    $(".scroll-comp").show();
    $(".compose").hide();
    // When user scrolls up, execute:
  } else {
    $(".scroll-comp").hide();
    $(".compose").show();
  }
  startValScrollY = scrollTopPosition;
})

  // let lastScrollTop = 0;

  // $(window).scroll(function(event) {
  //   let st = $(this).scrollTop();

  //   if (st > lastScrollTop) {
  //     console.log("ST no 1: ", st);
  //     // downscroll code
  //     $(".scroll-comp").show();
  //     $(".compose").hide();
  //   } else {
  //     console.log("ST no 2: ", st);
  //     // upscroll code
  //     $(".scroll-comp").hide();
  //     $(".compose").show();
  //   }
  //   lastScrollTop = st;
  //   console.log(lastScrollTop);
  // });

// $(window).scroll(function () {
  // When user scrolls down
  // $(".scroll-comp").show();
  // $(".compose").hide();
// });

  // When user clicks on round button, page auto scrolls to top. New tweet form appears.
  // Text area enabled automatically.
  $(".scroll-comp").on("click", function() {
    $(".new-tweet").show();
    $("#tweet-text").focus();
  })


});