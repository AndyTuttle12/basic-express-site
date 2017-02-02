var express = require('express');
var router = express.Router();
var request = require('request');

var config = {
   baseUrl: 'http://api.themoviedb.org/3/',
   imageBase: 'http://image.tmdb.org/t/p/w300',
   imageBaseFull: 'http://image.tmdb.org/t/p/original',
   nowPlayingEP: 'movie/now_playing?',
   api_key: '&api_key=fec8b5ab27b292a68294261bb21b04a5'
};

/* GET home page. */
router.get('/', function(req, res, next) {
	var myArr = ['music','backpacking','technology','bartending','foodie'];
	res.render('index', { title: 'My Express Website', arr: myArr});
});

router.get('/weather', function(req, res, next) {
	res.render('weather', { title: 'Daily Weather'});
});

router.get('/search', function(req, res, next) {
	res.render('search', {});
});

router.get('/searchMovie', function(req, res, next) {
	res.send("I am a get route.");
});

router.post('/searchMovie', function(req, res,next) {
	var searchString = encodeURI(req.body.movieSearch);
	var queryUrl = config.baseUrl + 'search/movie?' + config.api_key + '&query=' + searchString;
	// res.send(queryUrl);
	request.get(queryUrl, (error, response, searchData)=>{
		searchData = JSON.parse(searchData);
		res.render('movies', {
			title: 'Search Results',
			movieData: searchData,
			imageUrl: config.imageBase
		});
	});
});

router.get('/movies', function(req, res, next) {

	request.get(config.baseUrl + config.nowPlayingEP + config.api_key, (err, response, movieData)=>{
		movieData = JSON.parse(movieData);
		
		// console.log(typeof(movieData));
		// res.json(movieData);
		res.render('movies', { 
			title: 'Movies',
			movieData: movieData,
			imageUrl: config.imageBase
		});
	});
		
	// res.render('movies', { title: 'Movies'});
});


module.exports = router;
