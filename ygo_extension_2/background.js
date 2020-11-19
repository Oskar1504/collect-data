var end_data = [];

chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true,
		active: true
	// Select active tab of the current window
	}, function(tab) {
		console.log("YGO button clicked");
		console.log(end_data.length);
		if(end_data.length == 0){
			chrome.tabs.sendMessage(
			// Send a message to the content script
			tab[0].id, { betreff: 'ygo',count:0 }

		);
		}else{
			console.log("-------FORCE-----END---------------");
					console.log("------Catogorized: "+end_data.length+" Cards------");
					console.log("------SANITIZING------DATA----------");
					for (var i = 0; i < end_data.length; i++) {
						for (var j = 0; j < end_data[i].length; j++) {
							end_data[i][j] = sanitize(end_data[i][j]);
						}
					}
					console.log(end_data);
					console.log("------STARTING------DOWNLOAD------");

					var a = document.createElement('a');
					var file = new Blob([ end_data.join('\n') ], { type: 'text/plain' });

					a.href = URL.createObjectURL(file);
					a.download = 'yugipedia_data_'+end_data[0][2]+'.csv';
					a.click();


					//restart
					chrome.tabs.sendMessage(
						// Send a message to the content script
						tab[0].id,{betreff:'test',listdata:g_seriennummern[end_data.length-1],count:end_data.length-1}

					);

					end_data = [];
		}
	});
});

var g_seriennummern = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if(request.betreff == "seriennummern"){
			console.log(request.msg);
			g_seriennummern = request.data;
			console.log(g_seriennummern);

			//starts search
			console.log("--------------------START SEARCH--------------------");
			console.log("------Searching "+g_seriennummern.length+" Cards------");

			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("Searching: ",g_seriennummern[0][0]);
			  	var Url = 'https://yugipedia.com/wiki/'+g_seriennummern[0][0];
		      	chrome.tabs.update(tab.id, {url: Url});
			
			setTimeout(function(){
				console.log("Send command to main script to store data from: "+Url);
				chrome.tabs.sendMessage(tab[0].id,{betreff:'test',listdata:g_seriennummern[0],count:0});
			},3000);
			});
		}
	}
);


var g_seriennummern = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		if (request.betreff == "storedata") {
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
			 console.log("Data received.");
			 console.log(request.data);
			 //actuall store command
			 end_data.push(request.data);
			 console.log("Stored into end_data array.");

			 if(request.count < g_seriennummern.length){


				//starts search
				console.log("-----------------"+request.count+" / " +g_seriennummern.length+" SEARCHED-----------------");

				console.log("Searching: ",g_seriennummern[request.count][0]);
			  	var Url = 'https://yugipedia.com/wiki/'+g_seriennummern[request.count][0];
		      	chrome.tabs.update(tab.id, {url: Url});

				setTimeout(function(){
					console.log("Send command to main script to store data from: "+Url);
					chrome.tabs.sendMessage(tab[0].id,{betreff:'test',listdata:g_seriennummern[request.count],count:request.count});
				},3000);
				}else{
					console.log("-------------END---------------");
					console.log("------Catogorized: "+end_data.length+" Cards------");
					console.log("------SANITIZING------DATA----------");
					for (var i = 0; i < end_data.length; i++) {
						for (var j = 0; j < end_data[i].length; j++) {
							end_data[i][j] = sanitize(end_data[i][j]);
						}
					}
					console.log(end_data);
					console.log("------STARTING------DOWNLOAD------");

					var a = document.createElement('a');
					var file = new Blob([ end_data.join('\n') ], { type: 'text/plain' });

					a.href = URL.createObjectURL(file);
					a.download = 'yugipedia_data_'+g_seriennummern[0][4]+'.csv';
					a.click();

					end_data = [];
					g_seriennummern = [];
				}
			});
		};
	}
);


function sanitize(text){
	text = text.replace(/●/g,"-");
	text = text.replace(/\n/g," ");
	return text.replace(/,/g,"*");
}
