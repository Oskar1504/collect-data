console.log("Yugipedia to text started.")
chrome.runtime.onMessage.addListener(
	function (request, sender){
		console.log("Background script message received. Msg: "+request.betreff)
		// If we get the request from the Background script
		if (request.betreff == 'ygo'){
			
			let trs = document.getElementById("Top_table").children[1].childNodes;
			console.log(trs);
			let listdata = [];


			for(var i = 0; i < trs.length; i++){
			
			//for(var i = 88; i < 97; i++){


				let trdata = [];
				trdata.push(trs[i].childNodes[0].innerText);
				trdata.push(trs[i].childNodes[1].innerText);
				trdata.push(trs[i].childNodes[2].innerText);
				//man kann hier noch nach den spezifischeren daten gehen fals man die auf de rkarten seite nciht finden würde
				trdata.push(trs[i].childNodes[3].innerText);
				trdata.push(sanitize(document.getElementsByTagName("h1")[0].innerText));

				listdata.push(trdata);
			}

			//starts scann
			chrome.runtime.sendMessage({betreff:"seriennummern",data:listdata,msg:"Main.js send seriennummern."});
		}

		// If we get the request from the Background script
		if (request.betreff == 'test'){
			
			//ist die neue getdata
			console.log("Background script message received. Msg: "+request.betreff);
			console.log(request.listdata[3]);
			let carddata = [];

			let types = request.listdata[3];
			if(types.match(/Pendulum/g)){
				console.log("Pendel effect monster detected starting scan_pendel_effect.")
				carddata = scan_pendel_effect(request.listdata);
			}else if(types.match(/Fusion/g)){
				carddata = fusion_monster(request.listdata);

			}else if(types.match(/Ritual Monster/g)){
				carddata = effect_monster(request.listdata);

			}else if(types.match(/Synchro/g)){
				carddata = fusion_monster(request.listdata);

			}else if(types.match(/Xyz/g)){
				carddata = xyz_monster(request.listdata);

			}else if(types.match(/Spell/g) || types.match(/Trap/g) ){
				carddata = spell_trap(request.listdata);

			}else if(types == "Effect Monster" || types.match(/Tuner/g) || types.match(/Flip/g)){
				carddata = effect_monster(request.listdata);

			}else if(types == "Normal Monster"){
				carddata = normal_monster(request.listdata);

			}else{
				carddata = scan_empty();
			}

			chrome.runtime.sendMessage({betreff:"storedata",data:carddata,count:request.count+1,msg:"Main send cart data."});
		}



		// If we get the request from the Background script
		if(request.betreff == 'getdata'){
			console.log("Background script message received. Msg: "+request.betreff);
			let data = [];
			//pushed seriennummer
			data.push(request.seriennummer);
			//hier 0-6 wobei bei effect ist 6 leer weil wpendel sacale
			let pes = document.getElementsByTagName("p");
			for(let i = 0; i <= 6;i++ ){
				let text = pes[i].innerText;
				if( text == "\n" || text == ""|| text == " "){
					text = " ";
				}
				data.push(text);
			}

			//das sind die deutschen sachen
			let lang = document.querySelectorAll('[lang="de"]');
			for(let i = 0; i < lang.length;i++ ){
				
				data.push(sanitize(lang[i].innerText));
			}
			if(lang.length == 2){
				data.push("-");
			}

			//bild url
			data.push(document.getElementsByTagName("img")[1].src);

			chrome.runtime.sendMessage({betreff:"storedata",data:data,count:request.count+1,msg:"Main send cart data."});
		}

		
	}
);

function sanitize(text){
	text = text.replace(/●/g,"-");
	return text.replace(/,/g,"*");
}

function scan_empty(){
	let carddata = [];
	for (var i = 0; i < 36; i++) {
		carddata.push("");
	}
	return carddata;
}

