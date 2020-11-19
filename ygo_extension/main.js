console.log("Yu gi oh extension started")
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Background script message received. Msg: "+request.betreff)
		// If we get the request from the Background script
		if (request.betreff == 'ygo'){
			let stringpasscodes = "54343893||08706701||13764881||05780210||08372133||01980574||34761841||40975574||28859794||77360173||78010363||26202165||03717252||77723643||30328508||37445295||52551211||76547525||43385557||63422098||09012916||80696379||58685438||70095154||34160055||67696066||97268402||28985331||24291651||60832978||34710660||72989439||65192027||73176465||00102380||42921475||69764158||16404809||04058065||85520851||06849042||40159926||07161742||17257342||89181134||50896944||85138716||15894048||48355999||07025445||41753322||11747708||83011277";
			let passcodes = stringpasscodes.split("||");
			console.log(passcodes);
			if(request.count < passcodes.length){

				//chrome.runtime.sendMessage({betreff:"search",passcode:passcodes[request.count],count:request.count});
			}else{
				chrome.runtime.sendMessage({betreff:"end",msg:"All passcodes searched."});
			}

		}
		
	}
);
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Background script message received. Msg: "+request.betreff)
		// If we get the request from the Background script
		if(request.betreff == 'getdata'){
			console.log("getdata");
			let data = [];
			//name
			data.push(document.getElementsByTagName("h1")[1].innerText);
			//effekt
			data.push(document.getElementsByClassName('fWQEYT')[0].innerText);
			//eigenschaft
			data.push(document.getElementsByClassName('eSXMMp')[0].children[1].innerText);
			//typ
			data.push(document.getElementsByClassName('eSXMMp')[1].children[1].innerText);
			//kategorie
			data.push(document.getElementsByClassName('eSXMMp')[2].children[1].innerText);
			//stufe
			data.push(document.getElementsByClassName('eSXMMp')[3].children[1].innerText);
			//atk
			data.push(document.getElementsByClassName('eSXMMp')[4].children[1].innerText);
			//def
			data.push(document.getElementsByClassName('eSXMMp')[5].children[1].innerText);
			//passcodes
			data.push(document.getElementsByClassName('eSXMMp')[6].children[1].innerText);
			//img src
			data.push(document.getElementsByTagName("img")[0].src);
			chrome.runtime.sendMessage({betreff:"storedata",data:data,count:request.count});
		}
	}
);

		