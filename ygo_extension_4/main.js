var nummern = [];
console.log("Yugipedia complete extension.")
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Message received: "+request.betreff);
		if(request.betreff == "get_cardmarket_url"){
			 get_cardmarket_url(request.data);
		}

		if(request.betreff == "get_price"){
			search_cards(request.data,0);
			
		}



		if(request.betreff == "send_nummern"){
			console.log(request.data);
			nummern = request.data;
			console.log(nummern);
			
		}

		if(request.betreff == "reset"){
			reset();
		}
		
	}	
);

//wird immer beim onload aufgerufen aber die test variable ist dafür da das das progrmma weis wann er suchen soll
window.onload = function() {
	if(localStorage.getItem('test') == 'true'){
		//hier muss er den brckgorund anfragen um die karten id zu bekommen
		chrome.runtime.sendMessage({betreff:"get_nummern"});
		let index = localStorage.getItem('index');
		setTimeout(function(){

			get_card_preis(nummern,index);

			if(index < nummern.length-1){
				search_cards(nummern,parseInt(index)+1);
			}else{
				reset();
				chrome.runtime.sendMessage({betreff:"end"});
			}
		},1000);
	}
		  
	};

function search_cards(cardids,index){
	//console.log(cardids[index]);
	//sucht karte
	document.getElementById("ProductSearchInput").value = cardids[index];
	document.getElementById("search-btn").click();

	//setzt local vlaues damit der wert weitergegeben wird
	localStorage.setItem("test",true)
	localStorage.setItem("index",index)
	
}

function get_card_preis(arr,index){
	let price = sanitize(document.getElementsByClassName("price-container")[0].innerText);
	let card = [arr[index],price]
	chrome.runtime.sendMessage({betreff:"store_price",price:card});
}


function sanitize(text){
	text = text.replace(/●/g,"-");
	return text.replace(/,/g,".");
}

function reset(){

	localStorage.setItem("test",false)
	localStorage.setItem("index",0)
	console.log(localStorage.getItem('index'))
	console.log(localStorage.getItem('test'))
}

