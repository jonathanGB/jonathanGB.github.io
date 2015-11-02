/* FUNCTIONS */

function getLastPushToRepo() {
	// get request to GitHub's API
	$.get("https://api.github.com/repos/jonathanGB/jonathanGB.github.io", function(data) {
		var lastUpdate = new Date(data.pushed_at), // parsed the "last push" as a Date object
		    lang = $('html').attr('lang'), // detect the language, so we can make a custom string for fr & en
		    days = [],
		    months = [],
		    dateSuffix = lastUpdate.getDate(),
		    lastUpdateString = '';
		    
		if (lang == "en") {
			days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			if (dateSuffix == 1 || dateSuffix == 21 || dateSuffix == 31)
				dateSuffix = dateSuffix + '<sup>st</sup>'; // 'st' superscript
			else if (dateSuffix == 2 || dateSuffix == 22)
				dateSuffix = dateSuffix + '<sup>nd</sup>'; // 'nd' superscript
			else if (dateSuffix == 3 || dateSuffix == 23)
				dateSuffix = dateSuffix + '<sup>rd</sup>'; // 'rd' superscript
			else
				dateSuffix = dateSuffix + '<sup>th</sup>'; // else, 'th' superscript

			// format a nice string
			lastUpdateString = lastUpdateString.concat(days[lastUpdate.getDay()], ", ", months[lastUpdate.getMonth()], " ", dateSuffix, " ", lastUpdate.getFullYear());
		} else if (lang == "fr") {
			days = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
			months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

			if (dateSuffix == 1)
				dateSuffix = dateSuffix + '<sup>er</sup>'; // 'er' superscript

			// format a nice French string
			lastUpdateString = lastUpdateString.concat(days[lastUpdate.getDay()], ", ", dateSuffix, " ", months[lastUpdate.getMonth()], " ", lastUpdate.getFullYear());
		}

		$('footer #lastPush').html(lastUpdateString); // add the nice formatted string to the footer
		$('footer').show(); // display the footer
	});
}


// on DOM ready...
$(function() {

	/* ON START */

	// show the "arrowTop" image if we're far enough from the top of the page (arbitrarily 300px)
	if (window.pageYOffset > 300)
		$('#arrowTop').show();

	// detect if touch device: if so, block the "hover" event for the dropdown
	if ('ontouchstart' in document.documentElement) {
		$('#arrowTop span').removeAttr('title class data-tooltip');
	}

	// instanciate foundation-js
	$(document).foundation({
		tooltip: {
			touch_close_text: '', // no text on close of the tooltip
			disable_for_touch: true
		}
	});

	if ($('html').attr('lang') == 'en')
		$('#projects li p, #projects li div').hide();

	getLastPushToRepo();


	/* EVENTS */

	// show/hide the "arrowTop" image depending on the vertical offset of the page the user is 
	$(document).scroll(function(e) {
		if (window.pageYOffset > 300)
			$('#arrowTop').show();
		else
			$('#arrowTop').hide();
	});

	// "scroll to the top of the page" animation handler	
	$('#arrowTop img').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, window.pageYOffset / 2); // the speed of "smooth-scroll" is constant, the time of the animation being proportional to the distance to travel
	});

	// anchors in the page "smooth-scroll" animation handler
	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href')); // grab the Element to scroll to
		var navHeight = $('nav').height() + parseInt($('nav').css('padding-bottom')) + parseInt($('nav').css('padding-top')); // calculate the height of the nav (padding included)

		$('html, body').animate({
			scrollTop: $goToElement.offset().top - navHeight // position so that the sticky nav and the Element to go to are well aligned vertically
		}, Math.abs(window.pageYOffset - $goToElement.offset().top) / 2); // "smooth-scroll" speed is constant
	});

	if ($('html').attr('lang') == 'en') {
		$('#projects li h3').click(function() {
			$(this).children('.caret').toggleClass('caret-open');
			$(this).siblings('p, div').slideToggle();
		});
	}


	/* EASTER EGGS PURPOSE */

	var clicks = 0;

	$('header img').click(function() { // hint: that's my picture at the top...
		clicks++;
		
		if (clicks == 5) {
			console.log("and his name is john cena");

			// swap "data-src" to "src", so easter1 img is loaded (but not by the ones who don't know about this easter egg)
			var src = $('#easter1').data('src'); 
			$('#easter1').removeData('src').removeAttr('data-src').attr('src', src);

			$('#easter1').fadeIn(500);
			$('audio').get(0).play();

			// after 6s, hide easter1 img gradually
			setTimeout(function() {
				$('#easter1').fadeOut(500);
			}, 6000);
		} else if (clicks == 10) {
			console.log("it's happening!");

			// swap "data-src" to "src", so easter2 img is loaded (but not by the ones who don't know about this easter egg)
			var src = $('#easter2').data('src');
			$('#easter2').removeData('src').removeAttr('data-src').attr('src', src);

			// show easter2 for 5s
			$('#easter2').fadeIn(500, function() {
				setTimeout(function() {
					$('#easter2').fadeOut(500);
				}, 5000);
			});
		} else if (clicks == 15) { // if you're here, you've gone mad
			$('audio').attr('loop', 'true').get(0).play(); // make the audio loop infinitely 
			$('#easter2').fadeIn(500);
		}
	});
});