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
        <p>${escape(tweet.content.text)}</p>
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

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      // const tweetVariable = $(createTweetElement(tweet));
      // tweetVariable.find(".article-body p").text(tweet.content.text);
      $("#tweets-container").prepend($tweet);
    }
  };

/* Mentor session notes:
renderTweets function -- added code to fix bug that was duplicating existing tweets everytime a new tweet is submitted. When page is refreshed, however, the duplicated tweets disappear. Using the empty() jQuery method targetting the tweets-container id for second section HTML child of main elem prevents the duplication of the tweets. The remove() jQuery method also works. The difference between the two: empty() leaves the targetted parent HTML element. It only deletes the text within the parent element, but also any child elements, including the child element texts, if any. With remove(), it deletes the targetted parent element completely -- the text, any children and the parent element HTML and its text.
We use the empty() method as with it, we're targetting the parent element with id of tweets-container. If we used the remove() method, we'd have to target the class of 'tweet-container' for the article element. It's faster for the browser to search for an ID than for it to search for a class within a sea of classes within your entire page. Therefore, in this instance the empty() method is the best one to use. It's more efficient.

To prevent XSS (Cross-Site Scripting) attacks, can use either the .text() method if your create tweet element uses jQuery. Or can define and use an escape function. This second method is best if the tweet element was created using a string literal (not a jQuery object).

My code originally used string literal to create the tweet element. But we made use of the .text() method. In order to do that, first we took the return value of createTweetElement function, WHICH IS HTML, and turned it into jQuery code. We then declared a new variable and stored the return value from createTweetElement function which we turned into a jQuery object into this variable. We reference that jQuery object, searched it (using find() jQuery method) for the user's tweet text. The exact node containing that user tweet text was passed in as a param for find() method. We referenced the article element's class and targetted specifically the p tag that will hold the user's tweet text. THEN we applied the .text() method and passed in the object value for the user's tweet as a parameter for the text method.  In the createTweetElement function, we removed the value inside the p tag holding the user's tweet text. We first want to convert it as a TEXT before adding it onto our page. This works for any new tweet texts being submitted.

Using escape function to escape text and evalute it as text instead of an HTML element (using plain JS):
-Define escape function, that takes in a string parameter.
-Declared a div variable which holds a newly created div element. Use createElement method.
-Use appendChild Node method and append to div. Apply document.createTextNode() method to create a new text node and it escapes HTML characters. This method takes in string param, which is the data that is placed in the text node.
-Return the div.innerHTML. This gets the HTML content of div element we created.
*/


  const loadTweets = function () {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  };

  loadTweets();


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

    $.post("/tweets", textAreaData)
       .then(result => {
         $("#tweet-text").val('');
         loadTweets();
      })
    })

});
