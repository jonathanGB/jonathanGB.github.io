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
})