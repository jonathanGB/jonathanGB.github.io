$(function() {
	$('#arrowTop img').click(function(e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, window.pageYOffset * 2 / 3);
	});

	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href'));
		var navHeight = $('nav').height() + parseInt($('nav').css('padding-bottom')) + parseInt($('nav').css('padding-top'));

		$('html, body').animate({
			scrollTop: $goToElement.offset().top - navHeight
		}, Math.abs(window.pageYOffset - $goToElement.offset().top));
	});

	$(document).scroll(function(e) {
		if (window.pageYOffset > 300)
			$('#arrowTop').show();
		else
			$('#arrowTop').hide();
	});

	if (window.pageYOffset > 300)
		$('#arrowTop').show();

	if ('ontouchstart' in document.documentElement)
		$('#arrowTop span').removeAttr('title class data-tooltip');

	$(document).foundation({
		tooltip: {
			touch_close_text: '',
			disable_for_touch: true
		}
	});
})