  $(document).ready(function(){
    //variables
    var $listOfUsers = streams.users;
    var $usernames = [];
    var $listOfTweets = [];
    var $listFollowers = '';
    var $num = 0;
		var $tweet = $('<div class="message"></div>');
    var $randomQuote = [
			    "Leverage agile frameworks to provide a robust synopsis.", 
			    "Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.", 
			    "Bring to the table win-win survival strategies to ensure proactive domination.", 
			    "At the end of the day, going forward, a new normal that has evolved from generation X.", 
			    "User generated content in real-time will have multiple touchpoints for offshoring.", 
			    "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.", 
			    "Override the digital divide with additional clickthroughs from DevOps. ", 
			    "Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.", 
			    "Collaboratively administrate empowered markets via plug-and-play networks.", 
			    "Podcasting operational change management inside of workflows to establish a framework."
    		];
 
    //make an array of users
		for(var user in $listOfUsers){
			$usernames.push({
				'name': user,
				'hero': 'img/hero/' + $num + '.jpg',
				'profile': 'img/profile/' +$num + '.jpg'
			});
			$num++;
		}

    //Add users to follow list
    function suggestedUsers(){
    for(var i = 0; i < $usernames.length; i++){
        $listFollowers += '<a class="' + $usernames[i]['name'] + '-suggested">@' + $usernames[i]['name'] + '</a><br />';
      }
      return $listFollowers;
    }
    suggestedUsers();
    $('.suggested').append($listFollowers);


    //Display new Tweets
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

			$tweet.fadeIn('slow').prepend('<a class="' + tweet.user + '"><strong> @' + tweet.user + '</strong></a>: ' + tweet.message + '<br />' + timeSyntax );
			$listOfTweets.push($tweet);

			$tweet.appendTo($('.tweets'));
			index -= 1;

			var $theUser = '.' + tweet.user;
			var $userLink = 'a.' + tweet.user;
			var $userSuggested = $theUser + '-suggested';
			var num = 0;
			$($userLink).on('click', (event) => {
				event.stopPropagation();
				$(this).closest($('div.message')).show();
				$('div.message a:not(' + $theUser + ')').closest($('div.message')).hide();
				$('.profile-name').html(tweet.user);
				clearInterval(interval);
				for(var i = 0; i < $usernames.length; i++){
					if(tweet.user === $usernames[i]['name']){
						$('.profile-pic').attr('src', $usernames[i]['profile']);
						$('.hero-image').attr('src', $usernames[i]['hero']);
						$('.quote').html($randomQuote[i]);
					}
				}
			});

			$($userSuggested).on('click', (event) => {
				event.stopPropagation();
				$($userLink).closest($('div.message')).show();
				$('div.message a:not(' + $theUser + ')').closest($('div.message')).hide();
				$('.profile-name').html(tweet.user);
				clearInterval(interval);
				for(var i = 0; i < $usernames.length; i++){
					if(tweet.user === $usernames[i]['name']){
						$('.profile-pic').attr('src', $usernames[i]['profile']);
						$('.hero-image').attr('src', $usernames[i]['hero']);
						$('.quote').html($randomQuote[i]);
					}
				}
			});

 
 			$('.title').on('click', () => {
 				$('div.message').show();
 				$('.profile-name').html('not-tom');
 				$('.profile-pic').attr('src', 'img/profile/default.jpg');
 				$('.hero-image').attr('src', 'img/hero/default.jpg');
 				$('.quote').html("I'm totally not Tom from MySpace, and I show the most recent tweets!");
			});

    }

    //Show new Tweets
		var runtime = 0;
		var interval = setInterval(myInterval, 1000);
		function myInterval(){
			runtime += 1;
			displayTweets();
			if(runtime === streams.home.length){
				clearInterval(interval);
			}
		};

		// var flag = true;
		// function myInterval(){
		// 	flag = false;
		// 	var runtime = 0;
		// 	var interval = setInterval(function(){
		// 		runtime += 1;
		// 		displayTweets();
		// 		if(runtime === streams.home.length){
		// 			clearInterval(interval);
		// 		}
		// 	},1000);
		// }

		// if(flag){
		// 	myInterval();			
		// } else {
		// 	clearInterval(interval);
		// }

 });