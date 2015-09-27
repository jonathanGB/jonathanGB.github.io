$(function() {
	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href'));
		var navHeight = $('nav').height() + parseInt($('nav').css('padding-bottom')) + parseInt($('nav').css('padding-top'));

		$('html, body').animate({
			scrollTop: $goToElement.offset().top - navHeight
		}, Math.abs(window.scrollY - $goToElement.offset().top ));
	});
})