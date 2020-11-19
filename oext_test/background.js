chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	// Select active tab of the current window
	}, function(tab) {
		//clock();
		chrome.tabs.sendMessage(
			// Send a message to the content script
			tab[0].id, { line: 'countparas' }
		);
	});
});

function clock(){
		setTimeout(function(){
			chrome.tabs.query({
			currentWindow: true,
			active: true
		// Select active tab of the current window
		}, function(tab) {
			
			chrome.tabs.sendMessage(
				// Send a message to the content script
				tab[0].id, { line: 'countparas' }
			);
			if(tab[0].title != "Scan"){

			clock();
			}
		});
			console.log("timer");
			
		},10000);
	}


chrome.runtime.onMessage.addListener(
	function (request, sender) {
		// If there exists a value named 'count'
		// in the message sent by content script
		if(request.betreff == "trigger"){
			console.log(request.message);
		}
		if (request.betreff == "tweets") {
			console.log('Count of scanned tweets is: ' +
				request.count + ' and tab id is ' + sender.tab.id);
			var mytext = '' + request.count + '';
			// Set the badge of the extension to the value of 'mytext'
			chrome.browserAction.setBadgeText({ text: mytext });
		chrome.tabs.query({
				title: "Scan"
				// Select active tab of the current window
				}, function(tab) {
				chrome.tabs.sendMessage(
					// Send a message to the content script
					tab[0].id, { line: 'info',info: request.data}
				);
			});
		};
	}
);