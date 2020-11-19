console.log("Yugipedia complete extension.")
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Message received: "+request.betreff);
		if(request.betreff == "get_cardmarket_url"){
			 get_cardmarket_url(request.data);
		}

		if(request.betreff == "get_price"){
			let price = 69;
				if(document.querySelectorAll('[class*="price-container"]')[0] != undefined){
					price = document.querySelectorAll('[class*="price-container"]')[0].innerText;
				}
			 	chrome.runtime.sendMessage({betreff:"search_cmlink",price:price,count:request.count});
			}
		
		

	}	
);


function sanitize(text){
	text = text.replace(/●/g,"-");
	return text.replace(/,/g,"*");
}


function get_cardmarket_url(karten){
	let nummern = document.querySelectorAll('[class*="PrintList__Num"]');
	let name = document.querySelectorAll('[class*="RowLink"]');
	let count =0;
	let cmlinks = [];
	let ger_namen = [];
	for (var i = 0; i < nummern.length; i++) {
		if(i != nummern.length-1){

			if(nummern[i].innerText != nummern[i+1].innerText && gesuchte_karte(karten,nummern[i].innerText)){
				//console.log(get_name(name[i].href));
				count++;
				cmlinks.push(get_name(name[i].href));
				ger_namen.push(document.querySelectorAll('[class*="RowLink"]')[0].children[0].children[1].innerText);
			}
		}else{
			//console.log(get_name(name[i].href));
			cmlinks.push(get_name(name[i].href));
			ger_namen.push(document.querySelectorAll('[class*="RowLink"]')[0].children[0].children[1].innerText);
			count++;
		}
	}
	console.log(count);
	console.log(cmlinks);

	chrome.runtime.sendMessage({betreff:"cmlinks",data:cmlinks,namen:ger_namen,msg:"cmlinks"});

}

function get_name(url){
	let name = "";
	for (var i = url.length - 1; i >= 0; i--) {
		if(url[i] != "/"){
			name+=url[i];
		}else{
			break;
		}
	}
	let setname = document.getElementsByTagName("h1")[0].innerText.replace(/ /g,"-");
	setname = setname.replace(/:/g,"");
	let output = "https://www.cardmarket.com/de/YuGiOh/Products/Singles/"+setname+"/"+name.split("").reverse().join("")+"?language=3&minCondition=4";
	return output;
}

function gesuchte_karte(arr,setnummer){
	let nummern = [];
	for (var j = 0; j < arr[0].length; j++) {
		let nummer = "";
		for (var k = 7; k <= 9; k++) {
			nummer+=arr[0][j][k];
		}
		console.log(nummer);
		nummern.push(nummer);
	}
	console.log(nummern);
	for (var y = 0; y < nummern.length; y++) {
		if(nummern[y] == setnummer){
			return true;
		}
	}
	return false;
}