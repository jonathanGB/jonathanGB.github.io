$(function() {
	$(document).foundation({
		tooltip: {
			touch_close_text: ''
		}
	});

	$('#arrowTop img').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, window.scrollY * 2 / 3);
	});

	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href'));
		var navHeight = $('nav').height() + parseInt($('nav').css('padding-bottom')) + parseInt($('nav').css('padding-top'));

		$('html, body').animate({
			scrollTop: $goToElement.offset().top - navHeight
		}, Math.abs(window.scrollY - $goToElement.offset().top));
	});

	$(document).scroll(function(e) {
		if (scrollY > 300)
			$('#arrowTop').show();
		else
			$('#arrowTop').hide();
	});

	if (scrollY > 300)
		$('#arrowTop').show();
})