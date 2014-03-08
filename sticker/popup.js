var addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(){

	// 選択された色を取得
	var bgColor = document.getElementsByName("bgColor"),
		selectedBgColor;
	for(var i=0; i<bgColor.length; i++){
		if( bgColor[i].checked ){
			selectedBgColor = bgColor[i].value;
		}
	}

	var options = {
		color: selectedBgColor
	};

	chrome.tabs.getSelected(null, function(tab){
		chrome.tabs.sendRequest(tab.id, options);
	});
});
