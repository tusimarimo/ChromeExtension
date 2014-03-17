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
			'</div>',
  $stickers = [],
  locationHref = document.location.href,
  createSticker = function(color, stickerId, reload){
    var $sticker = $(template);
    stickerId = stickerId || "sticker{"+locationHref+"}_"+$stickers.length;
    $sticker.data("id", stickerId);
    $stickers.push($sticker);
    $("body").append($sticker);
    $sticker.filter(":last").addClass(color).draggable({
      stop : function(evt, ui){
        localStorage.setItem(stickerId+"_left", ui.offset.left);
        localStorage.setItem(stickerId+"_top", ui.offset.top);
      }
    });
    $sticker.on('keyup', 'textarea', function(){
      var $this = $(this);
      localStorage.setItem(stickerId+"_text", $this.val());
    });
    if(!reload){
      localStorage.setItem("sticker{"+locationHref+"}Length", $stickers.length);
      localStorage.setItem(stickerId+"_color", color);
    } else {
      var left = localStorage.getItem(stickerId+"_left");
      var top = localStorage.getItem(stickerId+"_top");
      var text = localStorage.getItem(stickerId+"_text");
      if(left!= undefined && top != undefined){
        $sticker.css({left: left+"px", top: top+"px"});
      }
      if(text){
        $sticker.find("textarea").val(text);
      }
    }
  },
  stickerLength = localStorage.getItem("sticker{"+locationHref+"}Length") || 0;
  for(var i=0; i<stickerLength; i++){
    (function(num){
      var stickerId = "sticker{"+locationHref+"}_"+num;
      var color = localStorage.getItem(stickerId+"_color") || "red";
      createSticker(color, stickerId, true);
    }(i));
  }
  // 
  chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    createSticker(request.color);
  });
  // delete sticker
  $document.on("click", deleteBtn, function(e){
    e.preventDefault();
    var $this = $(this);
    var $sticker = $this.parent().parent();
    var stickerId = $sticker.data("id");
    $(this).parents(".sticker").remove();
    $stickers = $stickers.filter(function(_$sticker){return _$sticker.data("id") != $sticker.data("id");});
    localStorage.removeItem(stickerId+"_color");
    localStorage.removeItem(stickerId+"_text");
    localStorage.removeItem(stickerId+"_left");
    localStorage.removeItem(stickerId+"_top");
    localStorage.setItem("sticker{"+locationHref+"}Length", $stickers.length);
  });

})(jQuery);














