/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     user: {
//       name: "Newton",
//       avatars: "https://i.imgur.com/73hZDYK.png",
//       handle: "@SirIsaac",
//     },
//     content: {
//       text: "If I have seen further it is by standing on the shoulders of giants",
//     },
//     created_at: 1461116232227,
//   },
//   {
//     user: {
//       name: "Descartes",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@rd",
//     },
//     content: {
//       text: "Je pense , donc je suis",
//     },
//     created_at: 1461113959088,
//   },
//   {
//     user: {
//       name: "Lizzy",
//       avatars: "https://i.imgur.com/nlhLi3I.png",
//       handle: "@lizzy",
//     },
//     content: {
//       text: "lorum ipsum",
//     },
//     created_at: 1461113959088,
//   },
// ];

$(document).ready(function () {
  // RENDER TWEET
  const renderTweets = function (tweets) {
    const $tweetWrapper = $("#tweet-wrapper");

    for (const tweet of tweets) {
      $tweetWrapper.append(createTweetElement(tweet));
    }
  };

  // CREATE NEW TWEET ELEMENT
  const createTweetElement = function (tweetData) {
    const $tweet = $(`
    <article>
      <header>
    <div class="tweet-img-name">
    <img src ="${tweetData.user.avatars}"/>
    <h1>${tweetData.user.name}</h1>
    </div>
    <div class="tweet-username">
    <h2>${tweetData.user.handle}</h2>
    </div>
    </header>

    <div class="tweet-content">
    <p>${tweetData.content.text}</p>
    </div>

    <footer>
    <h3>${tweetData.created_at}</h3>
    <div class="footer-icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    </article>
    `);
    return $tweet;
  };

  $(".form-new-tweet").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        console.log(data);
      },
    });
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
});
