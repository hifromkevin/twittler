  $(document).ready(function(){
    //variables
    var $usernames = [];
    var $listOfTweets = [];
    var $listFollowers = '';


    //Dislay new Tweets
    function displayTweets() {
			var index = streams.home.length - 1;

			var tweet = streams.home[index];
			var $tweet = $('<div class="message"></div>');

			//military time to regular time
			//cleanup excess time items
			var stringTime = '' + tweet.created_at;
			var splitTime = stringTime.split(' ').splice(0, 7);
			var regularTime = splitTime[4].split(':');
			var timePre = regularTime[0];
			var ampm = 'am';

			if(regularTime[0] > 12){
			timePre -= 12;
			ampm = 'pm';
			}

			regularTime = timePre + ':' + regularTime[1] + ':' + regularTime[2] + ampm;
			var timeSyntax = splitTime[0] + ', ' + splitTime[1] + ' ';
			timeSyntax += splitTime[2] + ', ' + splitTime[3] + ' at '; 
			timeSyntax += regularTime + ' ' + splitTime[6];

			$tweet.fadeIn('slow').html('<a class="' + tweet.user + '"><strong> @' + tweet.user + '</strong></a>: ' + tweet.message + '<br />' + timeSyntax );
			$listOfTweets.push($tweet);

			$tweet.appendTo($('.tweets'));
			index -= 1;

			var flag = true;
			for(var i = 0; i < $usernames.length; i++){
				if(tweet.user === $usernames[i]){
				  flag = false;
				}
			}
			flag ? $usernames.push(tweet.user) : flag = false;
    }

    //Add users to follow list
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
    //Button to show more tweets
    // $('<button class="more">Show More</button>').appendTo($('.tweets'));
    // $('.more').on('click', function(){
    //   $(this).remove();
    //   displayTweets();
    //   $('<button class="more">Show More</button>').appendTo($('.tweets'));
    // });

    //TEST: Create a button that shows more tweets after interval is run
    // $('.more').on('click', function(){
    //   $(this).remove();
    //   runtime = 0;
    //   interval();
    // });


	//click title, changes text in .tweets
	$('#title').on('click', function(){
		$('.tweets').html('');

		for(var i = 0; i < $listOfTweets.length; i++){
		    $('.tweets').append('<div class="message">' + $listOfTweets[i][0]['innerHTML']) + '</div>';
		}
		clearInterval(interval);
		$('.profile-pic').css("background-image", "url('img/profile/default.jpg')"); 
		$('.hero-image').css("background-image", "url('img/hero/wolf.jpg')"); 
	});


$('a.douglascalhoun').on('click', function(event){
    event.stopPropagation();
    $('div.message a.douglascalhoun').closest($('div.message')).show();
    $('div.message a:not(.douglascalhoun)').closest($('div.message')).hide();
});
$('a.douglascalhoun-suggested').on('click', function(){
    $('div.message a.douglascalhoun').closest($('div.message')).show();
    $('div.message a:not(.douglascalhoun)').closest($('div.message')).hide();
});
$('a.sharksforcheap').on('click', function(){
    event.stopPropagation();
    $('div.message a.sharksforcheap').closest($('div.message')).show();
    $('div.message a:not(.sharksforcheap)').closest($('div.message')).hide();
});
$('a.sharksforcheap-suggested').on('click', function(){
    $('div.message a.sharksforcheap').closest($('div.message')).show();
    $('div.message a:not(.sharksforcheap)').closest($('div.message')).hide();
});
    

 });