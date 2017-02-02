$(document).ready(function(){
	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		console.log(location);
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units=imperial&APPID=' + apiKey;
		console.log(weatherUrl);
		$.getJSON(weatherUrl, function(weatherData){
			console.log(weatherData);
			var currentTemp = weatherData.main.temp;
			var currentCode = weatherData.weather[0].id;
			var currentCondition = weatherData.weather[0].description;
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			$('#currentTemp').html("<img src='http://openweathermap.org/img/w/"+ icon +"'></img>The temp in " + name + " is currently " + currentTemp);
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');
			var windSpeed = weatherData.wind.speed;
			$('#wind span').html(windSpeed);
			var humidity = weatherData.main.humidity;
			$('#humidity span').html(humidity);

			var lineColor = 'black';
			if(currentTemp < 32){
				lineColor = '#AAF7FF';
			}else if(currentTemp < 60){
				lineColor = '#129793';
			}else if(currentTemp < 70){
				lineColor = '#80f470';
			}else if(currentTemp < 80){
				lineColor = '#ffc32d';
			}else{
				lineColor = '#f74f5d';
			}

			if(currentCode < 300){
				$('.container').css('background-image', 'url("/images/thunderstorm.jpg")');
			}else if(currentCode < 400){
				$('.container').css('background-image', 'url("/images/drizzle.jpg")');
			}else if(currentCode < 505){
				$('.container').css('background-image', 'url("/images/rain.jpg")');
			}else if(currentCode == 511){
				$('.container').css('background-image', 'url("/images/freezing-rain.jpg")');
			}else if(currentCode < 540){
				$('.container').css('background-image', 'url("/images/heavy-rain.jpg")');
			}else if(currentCode < 650){
				$('.container').css('background-image', 'url("/images/snow.jpg")');
			}else if(currentCode < 790){
				$('.container').css('background-image', 'url("/images/mist.jpg")');
			}else if(currentCode == 800){
				$('.container').css('background-image', 'url("/images/clear-sky.jpg")');
			}else if(currentCode == 801){
				$('.container').css('background-image', 'url("/images/few-clouds.jpg")');
			}else if(currentCode < 805){
				$('.container').css('background-image', 'url("/images/cloudy.jpg")');
			}else{
				$('.container').css('background-image', 'url("/images/wind.jpg")');
			}

			
			var currentPercent = 0;
			function animate(current){
				context.clearRect(0,0,500, 500);
				context.fillStyle = "rgba(100,100,100,.4)";
				context.beginPath();
				context.arc(155,75,50,Math.PI * 0,Math.PI * 2);
				context.closePath();
				context.fill();

				context.font = "20px Arial";
				context.fillStyle = '#333';
				context.fillText(currentCondition,20,30);

				context.font = "40px Arial";
				context.fillStyle = '#FFF';
				context.fillText((Math.floor(currentTemp) + "\xB0F"),110,90);

				context.lineWidth = 20;
				context.strokeStyle = lineColor;
				context.beginPath();
				context.arc(155,75,60,Math.PI * 1.5,Math.PI * 2 * current + Math.PI * 1.5);
				context.stroke();
				currentPercent++;
				if(currentPercent < currentTemp){
					requestAnimationFrame(function(){
						animate(currentPercent / 100);
					});
				}

			}
			animate();
		});

		// $.getJSON()
	});
});