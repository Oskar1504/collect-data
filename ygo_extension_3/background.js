var cmlinks = [];
var nummern = [];
var preise = [];
var namen = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		console.log("------------MSG-RECEIVED: "+request.betreff+"-------------");
		//need to search the pack to get the eng names
		
		if(request.betreff == "search_preise"){
			nummern = request.data;
			let Url = "https://cardcluster.de/search/";

			for (var i = 0; i < 4; i++) {
				Url+=request.data[0][0][i];
			}

			chrome.tabs.create({active:true, url: Url});
			console.log("------------SEARCHING:"+Url+"--------------");

			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
					
				setTimeout(function(){
					console.log("SEND COMMAND TO GET ENG CARDMARKET URLS.");
					chrome.tabs.sendMessage(tab[0].id,{betreff:'get_cardmarket_url',data:request.data,msg:"get_cardmarket_url"});
				},5000);
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

		if(request.betreff == "reset"){
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

