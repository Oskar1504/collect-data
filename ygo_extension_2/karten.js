function scan_pendel_effect(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push("");
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[1].innerText);
	//hier jetzt ne if abfrage
	//monste sub 2
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2].innerText);
	}else{
		carddata.push("");
	}
	//monste sub 3
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3].innerText);
	}else{
		carddata.push("");
	}
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//Monstertype (das erste auf der karte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[0].innerText);
	//level
	carddata.push(document.querySelectorAll('a[title*="Level"]')[1].innerText);
	//rank
	carddata.push("");
	//link
	carddata.push("");
	//ATK
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[5].children[1].children[0].children[0].innerText);
	//DEF
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[5].children[1].children[0].children[1].innerText);
	//pendel links
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[4].children[1].innerText);
	//pendel rechts aktuel noch das selbe
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[4].children[1].innerText);
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push("");
	//pendel effect
	carddata.push(sanitize(document.querySelectorAll('[lang="de"]')[1].innerText));
	//effekt/text
	carddata.push(sanitize(document.querySelectorAll('[lang="de"]')[2].innerText));
	//limitaiton status
	carddata.push(document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}

function effect_monster(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push("");
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[1].innerText);
	//hier jetzt ne if abfrage
	//monste sub 2
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2].innerText);
	}else{
		carddata.push("");
	}
	//monste sub 3
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3].innerText);
	}else{
		carddata.push("");
	}
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//Monstertype (das erste auf der karte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[0].innerText);
	//level
	carddata.push(document.querySelectorAll('a[title*="Level"]')[1].innerText);
	//rank
	carddata.push("");
	//link
	carddata.push("");
	//ATK
	carddata.push(document.querySelectorAll('a[title*="ATK"]')[1].innerText);
	//DEF
	carddata.push(document.querySelectorAll('a[title*="DEF"]')[1].innerText);
	//pendel links
	carddata.push("");
	//pendel rechts aktuel noch das selbe
	carddata.push("");
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push("");
	//pendel effect
	carddata.push("");
	//effekt/text
	carddata.push(sanitize(document.querySelectorAll('[lang="de"]')[1].innerText));
	//limitaiton status
	carddata.push( document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}




function normal_monster(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push("");
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push("");
	//hier jetzt ne if abfrage
	//monste sub 2
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2].innerText);
	}else{
		carddata.push("");
	}
	//monste sub 3
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3].innerText);
	}else{
		carddata.push("");
	}
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//Monstertype (das erste auf der karte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[0].innerText);
	//level
	carddata.push(document.querySelectorAll('a[title*="Level"]')[1].innerText);
	//rank
	carddata.push("");
	//link
	carddata.push("");
	//ATK
	carddata.push(document.querySelectorAll('a[title*="ATK"]')[1].innerText);
	//DEF
	carddata.push(document.querySelectorAll('a[title*="DEF"]')[1].innerText);
	//pendel links
	carddata.push("");
	//pendel rechts aktuel noch das selbe
	carddata.push("");
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push("");
	//pendel effect
	carddata.push("");
	//effekt/text
	carddata.push(sanitize(document.querySelectorAll('[lang="de"]')[1].innerText));
	//limitaiton status
	carddata.push( document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}


function fusion_monster(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push("");
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push("");
	//hier jetzt ne if abfrage
	//monste sub 2
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2].innerText);
	}else{
		carddata.push("");
	}
	//monste sub 3
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3].innerText);
	}else{
		carddata.push("");
	}
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//Monstertype (das erste auf der karte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[0].innerText);
	//level
	carddata.push(document.querySelectorAll('a[title*="Level"]')[1].innerText);
	//rank
	carddata.push("");
	//link
	carddata.push("");
	//ATK
	carddata.push(document.querySelectorAll('a[title*="ATK"]')[1].innerText);
	//DEF
	carddata.push(document.querySelectorAll('a[title*="DEF"]')[1].innerText);
	//pendel links
	carddata.push("");
	//pendel rechts aktuel noch das selbe
	carddata.push("");
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	let effekt = sanitize(document.querySelectorAll('[lang="de"]')[1].innerHTML).split("<br>");

	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push(effekt[0]);
	//pendel effect
	carddata.push("");
	//effekt/text
	carddata.push(effekt[1]);
	//limitaiton status
	carddata.push(document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}



function xyz_monster(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push("");
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push("");
	//hier jetzt ne if abfrage
	//monste sub 2
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[2].innerText);
	}else{
		carddata.push("");
	}
	//monste sub 3
	if(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3]){
		carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[3].innerText);
	}else{
		carddata.push("");
	}
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//Monstertype (das erste auf der karte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[2].children[1].children[0].children[0].innerText);
	//level
	carddata.push("");
	//rank
	carddata.push(document.querySelectorAll('a[title*="Rank"]')[1].innerText);
	//link
	carddata.push("");
	//ATK
	carddata.push(document.querySelectorAll('a[title*="ATK"]')[1].innerText);
	//DEF
	carddata.push(document.querySelectorAll('a[title*="DEF"]')[1].innerText);
	//pendel links
	carddata.push("");
	//pendel rechts aktuel noch das selbe
	carddata.push("");
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	let effekt = sanitize(document.querySelectorAll('[lang="de"]')[1].innerHTML).split("<br>");

	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push(effekt[0]);
	//pendel effect
	carddata.push("");
	//effekt/text
	carddata.push(effekt[1]);
	//limitaiton status
	carddata.push(document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}

function spell_trap(listdata){
	let carddata = [];

	//name ger
	carddata.push(document.querySelectorAll('[lang="de"]')[0].innerText);
	//name eng
	carddata.push(listdata[1]);
	//set name
	carddata.push(listdata[4]);//-----------------------
	//set id
	carddata.push(listdata[0]);
	//rarity
	carddata.push(listdata[3]);
	//Card type (monsterkarte/Zauberkarte/Fallenkarte)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[0].children[1].innerText);
	//zauber/fallen typ (normal,permanent,ritual,ausrüstug,spielfeld,schnell------normal,permanent,konterfalle)
	carddata.push(document.getElementsByClassName("innertable")[0].children[0].children[1].children[1].innerText);
	//monster sub typ (normal,effekt,fusions,ritual, xyz , synchro)
	//hier ist wichtig elemt 0 daraus ist warriai,wyrm,drache usw
	carddata.push("");
	//hier jetzt ne if abfrage
	//monste sub 2
	carddata.push("")
	//monste sub 3
	carddata.push("")
	//monster abiloy 1 (flipp,toon,?zwilling?)
	carddata.push("");
	//monster effekt 2 (flipp,toon,?zwilling?,union,spriit,empfänger)
	carddata.push("");
	//attribute (lciht,erde,feuer.....)
	carddata.push("");
	//Monstertype (das erste auf der karte)
	carddata.push("");
	//level
	carddata.push("");
	//rank
	carddata.push("");
	//link
	carddata.push("");
	//ATK
	carddata.push("");
	//DEF
	carddata.push("");
	//pendel links
	carddata.push("");
	//pendel rechts aktuel noch das selbe
	carddata.push("");
	// 8 mal link 
	for (var i = 0; i < 8; i++) {
		carddata.push("");
	}
	//material stehe auf der seite in der deutrshcn beschreibung da muss ich den text auf das erste <br> scanne
	carddata.push("");
	//pendel effect
	carddata.push("");
	//effekt/text
	carddata.push(sanitize(document.querySelectorAll('[lang="de"]')[1].innerHTML));
	//limitaiton status
	carddata.push(document.querySelectorAll('div[class*="status"]')[1].children[0].innerText);
	
	//databas id konami bis jetzt immer leer
	carddata.push("");
	//passcode
	carddata.push(document.querySelectorAll('p .mw-redirect[title]')[0].innerText);
	//limitation text nur wenn limitation status != unlimiitert
	carddata.push("");


	return carddata;

}
