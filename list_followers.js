 $(document).ready(function(){
function peopleToFollow(){
    for(var j = 0; j < $usernames.length; j++){
      $listFollowers += '<a href="#" class="' + $usernames[j] + '-suggested">@' + $usernames[j] + '</a><br />';
    }
    return $listFollowers;
  }

  //Show new Tweets
  var runtime = 0;
  var interval = setInterval(function(){
    runtime += 1;
    displayTweets();
    if(runtime === 5){
      clearInterval(interval);
      peopleToFollow();
      $('.suggested').append($listFollowers);
      // $('<button class="more">Show More</button>').appendTo($('.tweets'));
    }
  },1000);
});