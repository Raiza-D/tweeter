/* This file will be responsible for the character counter feature of our SPA */

$(document).ready(function() {

    $("textarea").on("input", onChange);

  });

const onChange = function() {
  const maxLength = 140;

  const form = $(this).closest("form"); // Traverse up the DOM tree using closest() and find "form" element. The 'this' refers to the form.

  const counter = form.find(".counter"); // Then within form element, use find() to grab a "counter" class within the form element.

  let inputLength = $(this).val().length;
  
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

/* Notes from session with mentor Gary Jipp:
-The best event to use for the character counter is 'input'. My use of 'keypress' before prevented any mouse 'copy + paste' actions from being recognized by the textarea. So the counter was not affected even though I had values inside the textarea element.

-The onChange function above still works even though it is defined after it is passed in as a callback on Lne 6 because the 'composer-char-counter.js' script has already been run when the browser loads the page. Therefore, the lines of code within the onChange function definition have already been run and therefore recognized. THEN after the document object is ready, we run Line 6.
This is why we don't get a reference error when we've referenced onChange as a function on Line 6.

-The above code is cleaner. In professional practice, the area inside the document.ready is kept to a minimum. All other code is written below/outside of the document.ready. The problem with this however as Gary mentioned, is that the functions defined below document.ready are in global scope and can be accessed (perhaps inadvertently). We don't want that. So then that's why we encapsulated the code in this entire file into an IIFE.

-What if we had used the class 'counter' in other elements of our HTML code? Then the code I had written originally will affect all of the elements with the class 'counter'. We made use of the closest(), find(), and 'this' keyword in Lines 12 and 13 to avoid this issue.

-IIFE (Immediately Invoked Function Expression) approach is applied is when the function is going to be used only ONCE and we want to hide the function and its contents from the global scope so the variable names etc are not interferred with. The variable names can be used again and since the IIFE is an unnamed function, we don't have to worry about not having to accidently use that same name somewhere else in our code.

-IIFE is to also used for encapsulation. This idea of encapsulation is kind of like modularizing our code. When you have THOUSANDS of lines of code, encapsulation is useful. You don't want to take any chances and accidently use the same function name or variable twice or even reference the WRONG variable or function. Encapsulation prevents issues like these.

-There are other libraries that use the '$' dollar sign as a function. It's not just jQuery.
$ = jQuery --> these are the same thing. The dollar sign is a function.

(function($) {

.... code here...

})(jQuery);
In the above IIFE, we're passing in jQuery as an argument to the IIFE. Then the parameter is a dollar sign. So in our code, we can continue to use the '$' sign. This is to avoid the issue of conflicting the use of the dollar sign for jQuery with another library that uses the dollar sign. In place of the dollar sign above, that parameter can be anything like 'x' or 'y'. You'd have to update your inner code though accordingly.
*/
