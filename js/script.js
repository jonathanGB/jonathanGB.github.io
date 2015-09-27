$(function() {
	$('a.smooth-scroll').click(function(e) {
		e.preventDefault();
		
		var $goToElement = $($(this).attr('href'));

		$('html, body').animate({
			scrollTop: $goToElement.offset().top
		}, 1500);
	});
})