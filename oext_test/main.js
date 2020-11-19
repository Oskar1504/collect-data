 

console.log("Read Twitter extension active");
setTimeout(function(){
	
if(document.hasFocus()){
	
	if(document.getElementById("erkennungschluessel").innerText == "oskarderkrassedatenangler"){
			let trigger = document.getElementById("trigger").innerText;
			console.log(trigger);
			chrome.runtime.sendMessage({ betreff:"trigger",message:trigger});
			setTimeout(function(){
			location.reload();
		},5000);
	}
}

},2000);
chrome.runtime.onMessage.addListener(
	function (request, sender){
		// If we get the request from the Background script
		if (request.line == 'countparas'){
			// Select all `<p>` elements in the document body
			var paras = document.body.querySelectorAll('p');
			// If the number of `<p>` elements is greater than zero

			let data = document.getElementsByTagName("article");
			let tweets = "", theCount = 0;
			for(var i = 0; i < data.length; i++){
				//übersdpirngt only bilder tweets
				if(data[i].childNodes[0].children[0].children[0].children[1].children[1].children[1].children[0].children.length == 0){
					i++;
					}
					tweets += data[i].childNodes[0].children[0].children[0].children[1].children[1].children[1].children[0].children[0].innerText+"+";
					theCount ++;				
				
			}

			if (tweets.length > 0) {

				// Send the count back to the background script
				chrome.runtime.sendMessage({betreff:"tweets",data:tweets,count:theCount });
			} else {
				alert('Something went wrong.');
			}
		};
		//das der empfang der sachen auf der ouptut seite mit db zugriff
		if (request.line == 'info'){

			//string zersetzen und scpeichern
			var string = request.info ,db_tweets = [], new_string = "";
			console.log(string,string.length);
			
			for(var i =0; i < string.length;i++) {
				if(string[i] == "#"){
					new_string += "_";
					i++;
				}
				if(string[i] == "ö"){
					new_string += "oe";
					i++;
				}
				if(string[i] == "ä"){
					new_string += "ae";
					i++;
				}
				if(string[i] == "ü"){
					new_string += "ue";
					i++;
				}
				new_string += string[i];
				if(string[i+1] == "+"){
					db_tweets.push(new_string);
					new_string = "";
					i++;
			}
		}

			console.log(db_tweets);

			


			for(var i = 0; i < db_tweets.length; i++){

				document.getElementById("data").innerHTML += "<br><br><br><span class = 'tweet'>"+db_tweets[i]+"</span>";
			}

		}
	}
);
