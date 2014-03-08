(function($){
	var $window = $(window),
		$document = $(document),
		sticker   = ".sticker",
		deleteBtn = ".delete",

		template = '<div class="sticker">' +
			'<div class="inner">' +
			'<textarea class="memo"></textarea>' +
			'<a class="delete" href="#" title="delete">✕</a>' +
			'</div>' +
			'</div>';

	// 
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
		$("body").append(template);
		$document.find(sticker).addClass(request.color).draggable();
	});

	// delete sticker
	$document.on("click", deleteBtn, function(e){
		e.preventDefault();
		$(this).parents(".sticker").remove();
	});

})(jQuery);

