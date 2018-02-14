# Liri Bot

## What it is
Liri is a node command line based application that takes in certain commands to output
Tweets, Spotify requests, and movie searches. It also reads in a random.txt file that will
perform the specific command within the file, as well as search for the additional request.
The program also utilizes the Log4JS NPM package in order to keep a log of the commands within 
the console.


## How it Works
Liri was made using the Twitter, Spotify, and OMDB API's. For each I utilized NPM packages
in order to extract data from each API. I also utilized the Log4JS NPM package in order to
keep track of what is logged in the console within a log.txt file. The main program makes use
of a switch block in order to determin the command asked for in the terminal, and then proceeds to 
call upon the corresponding function to process the request. 

1. Twitter Requests

   The twitter command (my-tweets) will display the previous 20 tweets made by a user, 
   in this case me. Since the node package will return an array full of all the tweets made by the user,
   I utilized a for loop in order to print only the most previous 20 tweets. From there I printed the tweet and
   also the date it was created.

2. Spotify Requests

   The Spotify request (spotify-this-song) takes in a song to be searched and then displays
   information about that song including the band, album the song came from, as well as other pieces
   of information. Since the Spotify API returns an array of the songs found that match that search, I made
   the decision to only display the first search result. In order to search a song with multiple words in it, 
   I utilized a quick for loop to search through the process.argv array and build a mega-string to send to my
   Spotfiy function. From this, I printed out the corresponding information regarding that song.

3. OMDB Requests

   The OMDB request (movie-this) searches for a specific movie and prints various information regarding it.
   In order to take in a movie request with multiple words in the title, I again utilized a simple for loop
   to search through the process.argv array and build a string to send to the OMDB specific function. From there
   I utilized the request NPM package to query the OMDB API and parse the results, printing the corresponding information in the 
   process.

4. Random.txt Requests

   The do-what-it-says request parses a .txt file with one of the above commands, and then performs 
   that command with the additional data given. To sepearte the command from the search request I utilized
   the .split() function, since the two pieces of information were seperated from a comma. I then utilized 
   another switch statement to determine which command was requested, and then called the corresponding function.

5. Log4JS

   The Log4JS node package creates a logger object that can be used to write to the console as well as an
   additional log file. Different 'levels' can be used to attach labels to each log as well. I attached the 
   'all' level since that seemed most appropriate in this case. 
