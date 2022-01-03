/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const errorDiv = $(".error");
  errorDiv.hide();

  // RENDER TWEET
  const renderTweets = function (tweets) {
    const $tweetWrapper = $("#tweet-wrapper");
    $tweetWrapper.empty();
    for (const tweet of tweets) {
      $tweetWrapper.prepend(createTweetElement(tweet));
    }
  };

  // CREATE NEW TWEET ELEMENT
  const createTweetElement = function (tweetData) {
    return `
      <article>
        <header>
          <div class="tweet-img-name">
            <img src ="${escape(tweetData.user.avatars)}"/>
            <h1>${escape(tweetData.user.name)}</h1>
          </div>
          <div class="tweet-username">
            <h2>${escape(tweetData.user.handle)}</h2>
          </div>
        </header>

        <div class="tweet-content">
          <p>${escape(tweetData.content.text)}</p>
        </div>

        <footer>
          <h3>${timeago.format(escape(tweetData.created_at))}</h3>
          <div class="footer-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
  };

  $(".form-new-tweet").on("submit", function (event) {
    errorDiv.slideUp(80);
    event.preventDefault();
    const form = this;
    const tweetContent = $(this.text).val();
    const errorMessage = $(".error-message i:first-child");

    if (tweetContent.length === 0) {
      errorMessage.html("You cannot post an empty tweet!").fadeIn(300);
      errorDiv.slideDown("slow");
    } else if (tweetContent.length > 140) {
      errorMessage
        .html("Your tweet is more than the recommended 140 characters!")
        .fadeIn(300);
      errorDiv.slideDown("slow");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
          $(form)[0].reset();
          loadTweets(data);
        },
      });
    }
  });

  //LOAD TWEETS
  const loadTweets = function () {
    return $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      },
    });
  };
  loadTweets();

  //XXS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
