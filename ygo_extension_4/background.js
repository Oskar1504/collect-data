var cmlinks = [];
var nummern = [];
var price = [];
var namen = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		console.log("------------MSG-RECEIVED: "+request.betreff+"-------------");
		//need to search the pack to get the eng names
		
		if(request.betreff == "search_preise"){
			nummern = request.data;
			console.log(nummern);
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------Searching "+nummern.length+" Cards------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'get_price',data:nummern});
			});

		}
		if(request.betreff == "get_nummern"){
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------SENDING IDS------");
				console.log(nummern);
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'send_nummern',data:nummern});
			});

		}


		if(request.betreff == "store_price"){
			console.log(request.betreff);
			price.push(request.price);
			console.log(price);

		}



		if(request.betreff == "end"){
			console.log(request.betreff);
			console.log("---END----START----DOWNLOAD--");
			download(price);
		}

		if(request.betreff == "reset"){
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------RESET------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'reset'});
			});

		}

		if(request.betreff == "cmlinks"){
			cmlinks = request.data;
			cmlinks.pop();
			console.log(cmlinks);

			namen = request.namen;
			namen.pop();
			console.log(namen);

			//starts search
			console.log("----------------START-PRICE-SEARCH----------------");
			console.log("------Searching "+cmlinks.length+" Cards------");

			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------Searching "+cmlinks[0]+" Cards------");
			  	var Url = cmlinks[0];
		      	chrome.tabs.update(tab.id, {url: Url});
			
				setTimeout(function(){
					console.log("Send command to main script to store data from: "+Url);
					chrome.tabs.sendMessage(tab[0].id,{betreff:'get_price',count:1});
				},3000);
			});
		}

		if(request.betreff == "search_cmlink"){
			preise.push([nummern[0][request.count-1],request.price,namen[request.count-1]]);

			

			if(request.count < cmlinks.length){
				//starts search
				console.log("----------------START-PRICE-SEARCH----------------");
				console.log("------Searching "+cmlinks.length+" Cards------");

				chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
					console.log("-----------------"+request.count+" / " +cmlinks.length+" SEARCHED-----------------");
				  	var Url = cmlinks[request.count];
			      	chrome.tabs.update(tab.id, {url: Url});
				
					setTimeout(function(){
						//console.log("Send command to main script to store data from: "+Url);
						chrome.tabs.sendMessage(tab[0].id,{betreff:'get_price',count:request.count+1});
					},3000);
				});
			}else{
				console.log("-------------END---------------");
				console.log("------Found: "+preise.length+" Prices------");
				console.log(preise);
			}
		}

		if(request.betreff == "res2et"){
			console.log(cmlinks);
			console.log(nummern);
			console.log(preise);
			cmlinks = [];
			nummern = [];
			preise = [];
			console.log("reset");
			console.log(cmlinks);
			console.log(nummern);
			console.log(preise);

		}
	
	}
);


function download(array){
	console.log(array);
	var a = document.createElement('a');
		var file = new Blob([ array.join('\n') ], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = 'ygo_preise.csv';
		a.click();

		end_data = [];
		g_seriennummern = [];
}
