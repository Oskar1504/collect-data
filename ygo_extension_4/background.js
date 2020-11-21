var nummern = [];
var price = [];

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		console.log("------------MSG-RECEIVED: "+request.betreff+"-------------");
		//need to search the pack to get the eng names
		
		if(request.betreff == "search_preise"){
			nummern = request.data;
			console.log(nummern);
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------SEARCHING "+nummern.length+" CARDS------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'get_price',data:nummern});
			});

		}
		if(request.betreff == "get_nummern"){
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------SENDING-CARDIDS(nummern)------");
				//console.log(nummern);
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'send_nummern',data:nummern});
			});

		}


		if(request.betreff == "store_price"){
			console.log("------STORE-RECEIVED-PRICE------");
			price.push(request.price);
			console.log(price);
			console.log("-----"+price.length+"/"+nummern.length+" CARDS---SEARCHED------");

		}



		if(request.betreff == "end"){
			console.log(request.betreff);
			console.log("---END----START----DOWNLOAD--");
			download(price);
			//reset prie array
			price = [];

			//reset values so onload wont collect data
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------RESET---VALUES--WHICH--ENABLE--SEARCH------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'reset'});
			});
			let URL = "http://projectlifetime.de/yugioh/search_preise.php";
			chrome.tabs.update(tab.id, {url: Url});
		}

		if(request.betreff == "reset"){
			chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
				console.log("------RESET---VALUES--WHICH--ENABLE--SEARCH------");
			  	chrome.tabs.sendMessage(tab[0].id,{betreff:'reset'});
			});

		}
	}
);


function download(array){
	console.log(array);
	var a = document.createElement('a');
		var file = new Blob([ array.join('\n') ], { type: 'text/plain' });

		a.href = URL.createObjectURL(file);
		a.download = 'ygo_preise_'+getTime()+'.csv';
		a.click();

		end_data = [];
		g_seriennummern = [];
}


    function getTime() {
        let d = new Date();
        let n = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        let output = n + "_"+m +"_"+s;
        return output;
    }