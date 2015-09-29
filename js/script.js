$(function() {
	$('#arrowTop img').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, window.pageYOffset / 2);
	});

	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href'));
		var navHeight = $('nav').height() + parseInt($('nav').css('padding-bottom')) + parseInt($('nav').css('padding-top'));

		$('html, body').animate({
			scrollTop: $goToElement.offset().top - navHeight
		}, Math.abs(window.pageYOffset - $goToElement.offset().top) / 2);
	});

	$(document).scroll(function(e) {
		if (window.pageYOffset > 300)
			$('#arrowTop').show();
		else
			$('#arrowTop').hide();
	});

	if (window.pageYOffset > 300)
		$('#arrowTop').show();

	if ('ontouchstart' in document.documentElement) {
		$('#arrowTop span').removeAttr('title class data-tooltip');
		$('a[data-dropdown]').removeAttr('data-options');
	}

	$.get("https://api.github.com/repos/jonathanGB/jonathanGB.github.io", function(data) {
		var lastUpdate = new Date(data.pushed_at),
		    lang = $('html').attr('lang'),
		    days = [],
		    months = [],
		    lastUpdateString = '';
		    
		if (lang == "en") {
			days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			lastUpdateString = lastUpdateString.concat(days[lastUpdate.getDay()], ", ", months[lastUpdate.getMonth()], " ", lastUpdate.getDate(), " ", lastUpdate.getFullYear());
		} else if (lang == "fr") {
			days = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
			months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
			lastUpdateString = lastUpdateString.concat(days[lastUpdate.getDay()], ", ", lastUpdate.getDate(), " ", months[lastUpdate.getMonth()], " ", lastUpdate.getFullYear());
		}

		$('footer #lastPush').html(lastUpdateString);
		$('footer').show();
	});

	$(document).foundation({
		tooltip: {
			touch_close_text: '',
			disable_for_touch: true
		}
	});

	/* Easter egg purpose */
	var clicks = 0;

	$('header img').click(function() {
		clicks++;
		
		if (clicks == 5) {
			console.log("and his name is john cena");
			$('#easter1').fadeIn(500);
			$('audio').get(0).play();

			setTimeout(function() {
				$('#easter1').fadeOut(500);
			}, 6000);
		} else if (clicks == 10) {
			console.log("it's happening!");

			var src = $('#easter2').data('src');
			$('#easter2').removeData('src').removeAttr('data-src').attr('src', src);

			$('#easter2').fadeIn(500, function() {
				setTimeout(function() {
					$('#easter2').fadeOut(500);
				}, 5000);
			});
		}
	})
})