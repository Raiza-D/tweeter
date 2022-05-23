/* This file will be responsible for the character counter feature of our SPA */

$(document).ready(function() {
  $("textarea").on("input", onChange);

  $(".new-tweet").hide();
  $(".scroll-comp").hide();

  // When user clicks on compose button, toggle show/hide new-tweet form. Text area auto enabled.
  $(".compose").on("click", function (event) {
    $(".new-tweet").toggle();
    $("#tweet-text").focus();
  });

  // When user scrolls down, scroll-comp button appears; compose hidden.
  // When user scrolls up, compose button appears. scroll-comp button hidden.
  let startValScrollY = 0;

  $(window).scroll(function (event) {
    let scrollTopPosition = $(this).scrollTop();

    if (scrollTopPosition > startValScrollY) {
      // When user scrolls down, execute:
      $(".scroll-comp").show();
      $(".right-nav-elem").hide();

      // When user scrolls up, execute:
    } else {
      $(".scroll-comp").hide();
      $(".right-nav-elem").show();
    }
    startValScrollY = scrollTopPosition;
  });

  // When user clicks on scroll-comp, page auto-scrolls to top. new-tweet form appears,
  // text area enabled
  $(".scroll-comp").on("click", function (event) {
    $(".new-tweet").show();
    $("#tweet-text").focus();
  });

});

const onChange = function() {
  const maxLength = 140;

  const form = $(this).closest("form"); // Traverse up the DOM tree using closest() and find "form" element. The 'this' refers to the textarea.

  const counter = form.find(".counter"); // Then within form element, use find() to grab a "counter" class within the form element.

  let inputLength = $("textarea").val().length;

  const remainingLength = maxLength - inputLength;
  counter.text(remainingLength); // Use 'counter' variable and update the remaining character length

  if (remainingLength < 0) {
    counter.addClass("red"); // Add class 'red' (which has a colour value of red). This changes the
    // counter's colour to 'red'.
    return;
  }

  counter.removeClass("red"); // If this code is removed, our counter will be red even if
  // its value is NOT less than zero.
};
