require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var fs = require("fs");

var command = process.argv[2];

var log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'log.txt' }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'all' }
  }
});

var logger = log4js.getLogger('all'); 

switch(command){
	case "my-tweets":
		myTweets();

		break;

	 case "spotify-this-song":
	 	
	 	var song = "";

	 	for(var i = 3; i < process.argv.length; i++){
	 		song += process.argv[i] + " ";
	 	}

	 	spotify(song);

	 	break;

	 case "movie-this":

	 	var movieName = "";

	 	for(var i = 3; i < process.argv.length; i++){
	 		if(i < process.argv.length - 1){
	 			movieName += process.argv[i] + " ";
	 		}
	 		else{
	 			movieName += process.argv[i];
	 		}
	 	}

	 	movieThis(movieName);

	 	break;

	 case "do-what-it-says":
	 	fs.readFile("random.txt", "utf8", function(error, data) {

			  
			  if (error) {
			    return logger.all(error);
			  }

			  var dataArr = data.split(",");

			  if(dataArr.length === 1){
			  	myTweets();

			  }else{
			  	var data = dataArr[1];
			  	switch(dataArr[0]){
			  		case "my-tweets":
			  			myTweets();
			  			break;

			  		case "spotify-this-song":
			  			spotify(data);
			  			break;

			  		case "movie-this":
			  			movieThis(data);		
			  	}

			  }
			  
		});

}

function myTweets(){

	var client = new Twitter(keys.twitter);

	var params = {screen_name: 'cbanaszak133'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			for(var i = 0; i < 20; i++){
				  if (!error) {
				    //logger.all(JSON.stringify(tweets, null, 2));
				    logger.all("Tweet: " + tweets[i].text);
				    logger.all("Created at: " + tweets[i].created_at);
				    logger.all("-------------------------------------" + "\n");
				}
				
			}
		});
}

function spotify(track){
	var spotify = new Spotify(keys.spotify);

	if(track === ""){
		 	spotify.search({ type: 'track', query: 'The Sign Ace of Base' }, function(err, data) {
				if (err) {
					return logger.all('Error occurred: ' + err);
				}
				logger.all("Artist(s): " + data.tracks.items[0].artists[0].name);
				logger.all("Song name: " + data.tracks.items[0].name);
				logger.all("Preview link: " + data.tracks.items[0].preview_url);
				logger.all("Album: " + data.tracks.items[0].album.name + "\n");
	 
				//logger.all(data.tracks.items[0]); 
			});

	 	}
	 	else{
	 		spotify.search({ type: 'track', query: track }, function(err, data) {
				if (err) {
					return logger.all('Error occurred: ' + err);
				}
				//logger.all(data.tracks.items);
	 
				logger.all("Artist(s): " + data.tracks.items[0].artists[0].name);
				logger.all("Song name: " + data.tracks.items[0].name);
				logger.all("Preview link: " + data.tracks.items[0].preview_url);
				logger.all("Album: " + data.tracks.items[0].album.name + "\n") 
			});


	 	}
}

function movieThis(movieName){

	var movieArr = movieName.split(" ");

	movieName = "";

	for(var i = 0; i < movieArr.length; i++){
	 		if(i < movieArr.length - 1){
	 			movieName += movieArr[i] + "+";
	 		}
	 		else{
	 			movieName += movieArr[i];
	 		}
	}

	//sconsole.log(movieName);

	if(movieName !== ""){
		 	request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
				if (!error && response.statusCode === 200) {
				    logger.all("Title: " + JSON.parse(body).Title);
				    logger.all("Release Year: " + JSON.parse(body).Year);
				    logger.all("IMDB Rating: " + JSON.parse(body).imdbRating);
				    logger.all("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				    logger.all("Country where movie was produced: " + JSON.parse(body).Country);
				    logger.all("Language: " + JSON.parse(body).Language);
				    logger.all("Plot: " + JSON.parse(body).Plot);
				    logger.all("Actors: " + JSON.parse(body).Actors + "\n");
				}
			});
	 	}
	 	else{
	 		request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
				if (!error && response.statusCode === 200) {
				    logger.all("Title: " + JSON.parse(body).Title);
				    logger.all("Release Year: " + JSON.parse(body).Year);
				    logger.all("IMDB Rating: " + JSON.parse(body).imdbRating);
				    logger.all("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				    logger.all("Country where movie was produced: " + JSON.parse(body).Country);
				    logger.all("Language: " + JSON.parse(body).Language);
				    logger.all("Plot: " + JSON.parse(body).Plot);
				    logger.all("Actors: " + JSON.parse(body).Actors + "\n");
				}
			});

	 	}
}


