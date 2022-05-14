/* This file will be responsible for the character counter feature of our SPA */

$(document).ready(function() {

    $("textarea").on("input", onChange);

  });

const onChange = function() {
  const maxLength = 140;

  const form = $(this).closest("form"); // Traverse up the DOM tree using closest() and find "form" element. The 'this' refers to the form.

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
