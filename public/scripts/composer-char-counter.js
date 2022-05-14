/* This file will be responsible for the character counter feature of our SPA */

(function($) {

  $(document).ready(function() {
    // code goes here

    $("textarea").on("input", onChange);
  });

  const onChange = function() {
    const maxLength = 10;

    const form = $(this).closest("form");
    const counter = form.find(".counter");

    let inputLength = $(this).val().length;
    const remainingLength = maxLength - inputLength;
    counter.text(remainingLength);

    if (remainingLength < 0) {
      counter.addClass("red");
      return;
    }

    counter.removeClass("red");
  };

})(jQuery);

/* IIFE used if a function is only going to be used ONCE and we want to hide everything from the
global scope so the variable names, etc are not interferred with.
IIFE is to also used for encapsulation. */
