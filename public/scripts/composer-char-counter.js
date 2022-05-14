/* This file will be responsible for the character counter feature of our SPA */

$(document).ready(function() {
  // code goes here
  let maxLength = 140;

  $("textarea").keyup(function() {
    let length = $(this).val().length;
    length = maxLength - length;
    $(".counter").text(length);
  })
});