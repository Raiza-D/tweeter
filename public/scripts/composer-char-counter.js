/* This file will be responsible for the character counter feature of our SPA */

$(document).ready(function() {
  // code goes here
  $("textarea").keyup(function() {
    const characterCount = $(this).val().length,
      counter = $(".counter");
  
  counter.text(characterCount);
  })
});