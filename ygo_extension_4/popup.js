window.onload=function(){
	//document.getElementById("firstbutton").addEventListener("click", popup_button);
	
	document.getElementById("fileinput").addEventListener("change",  function() {openFile(event);},false );

	document.getElementById("search_preise").addEventListener("click",  function() {search_preise();},false );
	//document.getElementById("search_daten").addEventListener("click",  function() {search_daten();},false );
	document.getElementById("reset").addEventListener("click",  function() {reset();},false );
  
}
var cards = [];
var openFile = function(event) {
		console.log(event);
        var input = event.target;
        cards = [];
        var reader = new FileReader();

        reader.onload = function(){

          let text = reader.result;
          let nice_text =text;
          
          cards = nice_text.split('|');

          console.log(cards);

        };
        
        reader.readAsText(input.files[0]);
      };




//sends message to the current tab u looking on
function search_preise(){
	let msg = {
		betreff:"search_preise",
		data:cards,
		msg:"popup send search_daten"
	}
	chrome.runtime.sendMessage(msg);
}

function search_date(){
	
}

function reset(){
	let msg = {
		betreff:"reset",
		msg:"reset"
	}
	chrome.runtime.sendMessage(msg);
}



//sends message to the current tab u looking on
function popup_button(){
	
	let params = {
		active:true,
		currentWindow:true
	}
	chrome.tabs.query(params, gotTab);

	function gotTab(tabs){
		let userinput = document.getElementById("userinput").value;
		let msg = {
			betreff:"popup",
			command:userinput
		}

		chrome.tabs.sendMessage(tabs[0].id,msg);
	}
}


