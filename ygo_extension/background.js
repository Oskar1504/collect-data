chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	// Select active tab of the current window
	}, function(tab) {
		console.log("YGO button clicked");
		chrome.tabs.sendMessage(
			// Send a message to the content script
			tab[0].id, { betreff: 'ygo',count:0 }
		);
	});
});

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.betreff == "search") {
			
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("Searching: ",request.passcode);
			  	var myNewUrl = 'https://cardcluster.de/search/'+request.passcode;
		      	chrome.tabs.update(tab.id, {url: myNewUrl});
			
			setTimeout(function(){
				console.log("Send store data command.");
				chrome.tabs.sendMessage(tab[0].id,{betreff:'getdata',count:request.count});
			},3000);
			});
		};
	}
);

var end_data = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.betreff == "storedata") {
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
			 console.log("Data received.Store into array.")
			 end_data.push(request.data.join('|'));
			 console.log(end_data);
			setTimeout(function(){
				console.log(request.count);
				chrome.tabs.sendMessage(tab[0].id,{betreff:'ygo',count:request.count+1});
			},500);
			});
		};
	}
);

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.betreff == "end") {
			console.log(request.msg);

		
		var a = document.createElement('a');
		var file = new Blob([ end_data.join('||') ], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = 'ygo_data';
		a.click();

		//clear end_data
		end_data = [];
		};
	}
);