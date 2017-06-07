function pokemon(number, check, name, nickname, method, order, attempts, gif, johto, hoenn, sinnoh, unova, kalos, alola) {
    this.number = number;
    this.check = check;
    this.name = name;
    this.nickname = nickname;
    this.method = method;
    this.order = order;
    this.attempts = attempts;
    this.gif = gif;
    this.johto = johto;
    this.hoenn = hoenn;
    this.sinnoh = sinnoh;
    this.unova = unova;
    this.kalos = kalos;
    this.alola = alola;
}

function method(name, odds, number, average) {
    this.name = name;
    this.odds = odds;
    this.number = number;
    this.average = average;
}

function saveTable() {
    var everything = "";
    var y = 0;
    var x = 0;
    while(x < pokemonArray.length) {
        if(y === 0) {
            everything = everything + pokemonArray[x].number + "\t";
            y++;
        }
        else if(y === 1) {
            everything = everything + pokemonArray[x].check + "\t";
            y++;
        }
        else if(y === 2) {
            everything = everything + pokemonArray[x].name + "\t";
            y++;
        }
        else if(y === 3) {
            everything = everything + pokemonArray[x].nickname + "\t";
            y++;
        }
        else if(y === 4) {
            everything = everything + pokemonArray[x].method + "\t";
            y++;
        }
        else if(y === 5) {
            everything = everything + pokemonArray[x].order + "\t";
            y++;
        }
        else if(y === 6) {
            everything = everything + pokemonArray[x].attempts + "\t";
            y++;
        }
        else if(y === 7) {
            everything = everything + pokemonArray[x].gif + "\t";
            y=0;
            x++;
        }
    }
    localStorage.setItem("Bran", everything);
}
function loadTable(){
    fullTable = localStorage.getItem("Bran");
    var array = fullTable.split('\t');
    var y = 0;
    var z = 0;
    for(var x = 0; x < array.length && z < pokemonArray.length; x++) {
        if(y === 0) {
            pokemonArray[z].number = array[x];
            y++;
        }
        else if(y === 1) {
            pokemonArray[z].check = array[x];
            y++;
        }
        else if(y === 2) {
            pokemonArray[z].name = array[x];
            y++;
        }
        else if(y === 3) {
            pokemonArray[z].nickname = array[x];
            y++;
        }
        else if(y === 4) {
            pokemonArray[z].method = array[x];
            y++;
        }
        else if(y === 5) {
            pokemonArray[z].order = parseInt(array[x]);
            y++;
        }
        else if(y === 6) {
            pokemonArray[z].attempts = parseInt(array[x]);
            y++;
        }
        else if(y === 7) {
            pokemonArray[z].gif = array[x];
            y=0;
            z++;
        }
    }
    updateTable();
}
function newEntry() {
    for(var x = 0; x < pokemonArray.length; x++) {
        if(document.getElementById('identifier').value === pokemonArray[x].name || document.getElementById('identifier').value === pokemonArray[x].number) {
            pokemonArray[x].check = "✓";
            pokemonArray[x].nickname = document.getElementById('nickname').value;
            pokemonArray[x].method = document.getElementById('method').value;
            pokemonArray[x].order = document.getElementById('order').value;
            pokemonArray[x].attempts = parseInt(document.getElementById('attempts').value);
            pokemonArray[x].gif = "Shiny/" + pokemonArray[x].name + ".gif";
        }
    }
    document.getElementById('identifier').value = "";
    document.getElementById('nickname').value = "";
    document.getElementById('method').value = "";
    document.getElementById('order').value = "";
    document.getElementById('attempts').value = "";
    updateTable();
}
function deleteEntry() {
    for(var x = 0; x < pokemonArray.length; x++) {
        if(document.getElementById('identifierDelete').value === pokemonArray[x].name || document.getElementById('identifierDelete').value === pokemonArray[x].number) {
            pokemonArray[x].check = "";
            pokemonArray[x].nickname = "";
            pokemonArray[x].method = "";
            pokemonArray[x].order = "";
            pokemonArray[x].attempts = "";
            pokemonArray[x].gif = "";
            console.log(pokemonArray[x].nickname)
        }
    }
    document.getElementById('identifierDelete').value = "";
    updateTable();
}

//Generic function used by sorters to swap two elements in the array
function swap(x, y) {
    var temp = arrayCopy[x];
    arrayCopy[x] = arrayCopy[y];
    arrayCopy[y] = temp;
}

//Recreate table using all Pokemon in National Dex
function nationalDex() {
    arrayCopy = [];
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    mode = "National"
    createTable();
    data();
}

//Recreate the table using Pokemon in the Kanto Dex
function kantoDex() {
    arrayCopy = [];
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    for(var i = 0; i < 151; i++) {
        arrayCopy[i] = jQuery.extend(true, {}, pokemonArray[i]);
    }
    mode = "Kanto";
    createTable();
    data();
}
//Recreate the table using Pokemon in the Johto Dex
function johtoDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortByJohto();
    arrayCopy.splice(256, 546);
    mode = "Johto";
    createTable();
    data();
}
//Recreate the table using Pokemon in the Hoenn Dex
function hoennDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortByHoenn();
    arrayCopy.splice(211, 591);
    mode = "Hoenn";
    createTable();
    data();
}
//Recreate the table using Pokemon in the Sinnoh Dex
function sinnohDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortBySinnoh();
    arrayCopy.splice(210, 592);
    mode = "Sinnoh";
    createTable();
    data();
}
//Recreate the table using Pokemon in the Unova Dex
function unovaDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortByUnova();
    arrayCopy.splice(301, 501);
    mode = "Unova";
    createTable(); 
    data();
}
//Recreate the table using Pokemon in the Kalos Dex
function kalosDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortByKalos();
    arrayCopy.splice(457, 345);
    mode = "Kalos";
    createTable();   
    data();
}
//Recreate the table using Pokemon in the Alola Dex
function alolaDex() {
    arrayCopy = JSON.parse(JSON.stringify(pokemonArray));
    var table = document.getElementById("shiny");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    sortByAlola();
    arrayCopy.splice(302, 500);
    mode = "Alola";
    createTable();  
    data();
}

//Calculate values needed for the percentage bars
function data() {
    var caught = 0;
    var gen1 = 0;
    var gen2 = 0;
    var gen3 = 0;
    var gen4 = 0;
    var gen5 = 0;
    var gen6 = 0;
    var gen7 = 0;
    for(var x = 0; x < pokemonArray.length; x++) {
        if(pokemonArray[x].check === "✓") {
            caught++;
            if(pokemonArray[x].number <= 151) {
                gen1++;
            }
            else if(pokemonArray[x].number <= 251 && pokemonArray[x].number > 151) {
                gen2++;
            }
            else if(pokemonArray[x].number <= 386 && pokemonArray[x].number > 251) {
                gen3++;
            }
            else if(pokemonArray[x].number <= 493 && pokemonArray[x].number > 386) {
                gen4++;
            }
            else if(pokemonArray[x].number <= 649 && pokemonArray[x].number > 493) {
                gen5++;
            }
            else if(pokemonArray[x].number <= 721 && pokemonArray[x].number > 649) {
                gen6++;
            }
            else{
                gen7++;
            }
        }
    }
    
    //Record Percentage values for progress bars
    var nationalPercent = ((caught/802)*100).toFixed(2);
    var gen1Percent = ((gen1/151)*100).toFixed(2);
    var gen2Percent = ((gen2/100)*100).toFixed(2);
    var gen3Percent = ((gen3/135)*100).toFixed(2)
    var gen4Percent = ((gen4/107)*100).toFixed(2)
    var gen5Percent = ((gen5/156)*100).toFixed(2)
    var gen6Percent = ((gen6/72)*100).toFixed(2)
    var gen7Percent = ((gen7/81)*100).toFixed(2)
    
    //Send Numerical values to be displayed
    document.querySelector('.total').innerHTML = "Total: " + caught + "/802";
    document.querySelector('.totalPercent').innerHTML = nationalPercent + "%";

    document.querySelector('.gen1').innerHTML = "Gen 1: " + gen1 + "/151";
    document.querySelector('.gen1percent').innerHTML = gen1Percent + "%";
    
    document.querySelector('.gen2').innerHTML = "Gen 2: " + gen2 + "/100";
    document.querySelector('.gen2percent').innerHTML = gen2Percent + "%";
    
    document.querySelector('.gen3').innerHTML = "Gen 3: " + gen3 + "/135";
    document.querySelector('.gen3percent').innerHTML =  gen3Percent + "%";
    
    document.querySelector('.gen4').innerHTML = "Gen 4: " + gen4 + "/107";
    document.querySelector('.gen4percent').innerHTML =  gen4Percent + "%";
    
    document.querySelector('.gen5').innerHTML = "Gen 5: " + gen5 + "/156";
    document.querySelector('.gen5percent').innerHTML = gen5Percent+ "%";
    
    document.querySelector('.gen6').innerHTML = "Gen 6: " + gen6 + "/72";
    document.querySelector('.gen6percent').innerHTML = gen6Percent + "%";
    
    document.querySelector('.gen7').innerHTML = "Gen 7: " + gen7 + "/81";
    document.querySelector('.gen7percent').innerHTML = gen7Percent + "%";
    
    //Overwrite Progress bar width with percentage values
    $('#natPercent').css('width', nationalPercent + "%")
    $('#Percent1').css('width', gen1Percent + "%")
    $('#Percent2').css('width', gen2Percent + "%")
    $('#Percent3').css('width', gen3Percent + "%")
    $('#Percent4').css('width', gen4Percent + "%")
    $('#Percent5').css('width', gen5Percent + "%")
    $('#Percent6').css('width', gen6Percent + "%")
    $('#Percent7').css('width', gen7Percent + "%")
    
    //Display the current mode
    document.querySelector('.mode').innerHTML = "Mode: " + mode;
}

//Calculate data and create table for the method table
function methodTable() {
    var breeding = 0;
    var breedSum = 0;
    
    var friendSafari = 0;
    var safariSum = 0;
    
    var sosChain = 0;
    var sosSum = 0;
    
    var hordes = 0;
    var hordeSum = 0;
    
    var fullOdds = 0;
    var fullSum = 0;
    
    var softReset = 0;
    var resetSum = 0;
    
    var dexNav = 0;
    var dexSum = 0;
    
    var chainFish = 0;
    var fishSum = 0;
    
    var pokeRadar = 0;
    var radarSum = 0;
    
    for(var i = 0; i < pokemonArray.length; i++) {
        if(pokemonArray[i].method === "SOS Chain") {
            sosChain++;
            sosSum = sosSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Breeding") {
            breeding++;
            breedSum = breedSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Friend Safari") {
            friendSafari++;
            safariSum = safariSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Hordes") {
            hordes++;
            hordeSum = hordeSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Full Odds") {
            fullOdds++;
            fullSum = fullSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Soft-Reset") {
            softReset++;
            resetSum = resetSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "DexNav") {
            dexNav++;
            dexSum = dexSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "Chain Fishing") {
            chainFish++;
            fishSum = fishSum + pokemonArray[i].attempts;
        }
        else if(pokemonArray[i].method == "PokeRadar") {
            pokeRadar++;
            radarSum = radarSum + pokemonArray[i].attempts;
        }
    }
    
    
    methodArray[0] = new method("SOS Chain", "1/683 (@70)", sosChain, Math.round(sosSum/sosChain));
    methodArray[1] = new method("Breeding", "1/512", breeding, Math.round(breedSum/breeding));
    methodArray[2] = new method("Friend Safari", "1/512", friendSafari,  Math.round(safariSum/friendSafari));
    methodArray[3] = new method("Hordes", "1/273", hordes, Math.round(hordeSum/hordes));
    methodArray[4] = new method("Full Odds", "1/8192", fullOdds,  Math.round(fullSum/fullOdds));
    methodArray[5] = new method("Soft-Reset", "1/1365", softReset,  Math.round(resetSum/softReset));
    methodArray[6] = new method("DexNav", "1/201", dexNav,  Math.round(dexSum/dexNav));
    methodArray[7] = new method("Chain Fishing", "1/100 (@20)", chainFish,  Math.round(fishSum/chainFish));
    methodArray[8] = new method("PokeRadar", "1/200 (@40)", pokeRadar,  Math.round(radarSum/pokeRadar));
    
    sortMethods();
    
    var table = document.getElementById("method");
    for(var x = 0; x < methodArray.length; x++) {
        var entry = methodArray[x];
        var row = document.createElement('tr');
        var properties = 4;
        for(var y = 0; y < 4; y++) {
            var cell = document.createElement('td');
            if(y === 0) {
                cell.innerHTML = entry.name;
            }
            else if(y === 1) {
                cell.innerHTML = entry.odds;
            }
            else if(y===2) {
                cell.innerHTML = entry.number;
            }
            else if(y === 3) {
                if(isNaN(entry.average)) {
                    entry.average = 0;
                }
                cell.innerHTML = entry.average;
            }
            cell.style.backgroundColor = "white";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    
}
function sortMethods() {
    for(var i = 0; i < methodArray.length; i++) {
        for(var j = 0; j < methodArray.length-1-i; j++) {
            if(methodArray[j].number < methodArray[j+1].number) {
                swapMethod(j, j+1);
            }
        }
    }
}
function swapMethod(x, y) {
    var temp = methodArray[x];
    methodArray[x] = methodArray[y];
    methodArray[y] = temp;
}

function createTable() {
    var table = document.getElementById("shiny");
    for(var x = 0; x < arrayCopy.length; x++) {
        var entry = arrayCopy[x];
        var row = document.createElement('tr');
        var properties = 8;
        var gray = false;
        if(entry.check === "✓") {
            gray = true;
        }
        for(var y = 0; y < 8; y++) {
            var cell = document.createElement('td');
            if(y === 0) {
                if(mode == "Johto") {
                    cell.innerHTML = entry.johto;
                }
                else if(mode == "Hoenn") {
                    cell.innerHTML = entry.hoenn;
                }
                else if(mode == "Sinnoh") {
                    cell.innerHTML = entry.sinnoh;
                }
                else if(mode == "Unova") {
                    cell.innerHTML = entry.unova;
                }
                else if(mode == "Kalos") {
                    cell.innerHTML = entry.kalos;
                }
                else if(mode == "Alola") {
                    cell.innerHTML = entry.alola;
                }
                else{
                    cell.innerHTML = entry.number;
                }
            }
            else if(y === 1) {
                cell.innerHTML = entry.check;
            }
            else if(y === 2) {
                cell.innerHTML = entry.name;
            }
            else if(y === 3) {
                cell.innerHTML = entry.nickname;
            }
            else if(y === 4) {
                cell.innerHTML = entry.method;
            }
            else if(y === 5) {
                cell.innerHTML = entry.order;
            }
            else if(y === 6) {
                cell.innerHTML = entry.attempts;
            }
            else {
                if(gray) {
                    var img = document.createElement('img');
                    img.src = entry.gif;
                    cell.appendChild(img)
                }
            }
            if(gray) {
                cell.style.backgroundColor = "darkgray";
            }
            else{
                cell.style.backgroundColor = "white";
            }
            
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function sortByNumber() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].number > arrayCopy[j+1].number) {
                swap(j, j+1);
            }
        }
    }
    updateTable();
}
function sortByJohto() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].johto > arrayCopy[j+1].johto) {
                swap(j, j+1);
            }
        }
    }
}
function sortByHoenn() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].hoenn > arrayCopy[j+1].hoenn) {
                swap(j, j+1);
            }
        }
    }
}
function sortBySinnoh() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].sinnoh > arrayCopy[j+1].sinnoh) {
                swap(j, j+1);
            }
        }
    }
}
function sortByUnova() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].unova > arrayCopy[j+1].unova) {
                swap(j, j+1);
            }
        }
    }
}
function sortByKalos() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].kalos > arrayCopy[j+1].kalos) {
                swap(j, j+1);
            }
        }
    }
}
function sortByAlola() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].alola > arrayCopy[j+1].alola) {
                swap(j, j+1);
            }
        }
    }
}
function sortByName() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-i-1; j++) {
            if(arrayCopy[j].name > arrayCopy[j+1].name) {
                swap(j, j+1);
            }
        }
    }
    
    updateTable();
}
function sortByNickname() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-i-1; j++) {
            if(arrayCopy[j].nickname === "" && arrayCopy[j+1].nickname !== "") {
                swap(j, j+1)
            }
            else if(arrayCopy[j].nickname !== "" && arrayCopy[j+1].nickname === "") {
            }
            else if(arrayCopy[j].nickname === "" && arrayCopy[j+1].nickname === "") {
            }
            else if(arrayCopy[j].nickname !== "" && arrayCopy[j+1].nickname !== "") {
                if(arrayCopy[j].nickname > arrayCopy[j+1].nickname) {
                    swap(j, j+1);
                }
            }
        }
    }
    updateTable();
}
function sortByMethod() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].method === "" && arrayCopy[j+1].method !== "") {
                swap(j, j+1)
            }
            else if(arrayCopy[j].method !== "" && arrayCopy[j+1].method === "") {
            }
            else if(arrayCopy[j].method === "" && arrayCopy[j+1].method === "") {
            }
            else if(arrayCopy[j].method !== "" && arrayCopy[j+1].method !== "") {
                if(arrayCopy[j].method > arrayCopy[j+1].method) {
                    swap(j, j+1);
                }
            }
        }
    }
    updateTable();
}
function sortByOrder() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].order === "" && arrayCopy[j+1].order !== "") {
                swap(j, j+1)
            }
            else if(arrayCopy[j].order !== "" && arrayCopy[j+1].order === "") {
            }
            else if(arrayCopy[j].order === "" && arrayCopy[j+1].order === "") {
            }
            else if(arrayCopy[j].order !== "" && arrayCopy[j+1].order !== "") {
                if(arrayCopy[j].order > arrayCopy[j+1].order) {
                    swap(j, j+1);
                }
            }
        }
    }
    updateTable();
}
function sortByAttempts() {
    for(var i = 0; i < arrayCopy.length; i++) {
        for(var j = 0; j < arrayCopy.length-1-i; j++) {
            if(arrayCopy[j].attempts === "" && arrayCopy[j+1].attempts !== "") {
                swap(j, j+1)
            }
            else if(arrayCopy[j].attempts !== "" && arrayCopy[j+1].attempts === "") {
            }
            else if(arrayCopy[j].attempts === "" && arrayCopy[j+1].attempts === "") {
            }
            else if(arrayCopy[j].attempts !== "" && arrayCopy[j+1].attempts !== "") {
                if(arrayCopy[j].attempts > arrayCopy[j+1].attempts) {
                    swap(j, j+1);
                }
            }
        }
    }
    updateTable();
}

function updateTable() {
    for(var x = 1; x < arrayCopy.length+1; x++) {
        var entry = arrayCopy[x-1];
        var table = document.getElementById("shiny").rows[x].cells;
        if(entry.check === "✓") {
            var gray = true;
        }
        else {
            gray = false;
        }
        for(var y = 0; y < 8; y++) {
            if(y === 0) {
                if(mode == "Johto") {
                    table[y].innerHTML = entry.johto;
                }
                else if(mode == "Hoenn") {
                    table[y].innerHTML = entry.hoenn;
                }
                else if(mode == "Sinnoh") {
                    table[y].innerHTML = entry.sinnoh;
                }
                else if(mode == "Unova") {
                    table[y].innerHTML = entry.unova;
                }
                else if(mode == "Kalos") {
                    table[y].innerHTML = entry.kalos;
                }
                else if(mode == "Alola") {
                    table[y].innerHTML = entry.alola;
                }
                else{
                    table[y].innerHTML = entry.number;
                }
            }
            else if(y === 1) {
                table[y].innerHTML = entry.check;
            }
            else if(y === 2) {
                table[y].innerHTML = entry.name;
            }
            else if(y === 3) {
                table[y].innerHTML = entry.nickname;
            }
            else if(y === 4) {
                table[y].innerHTML = entry.method;
            }
            else if(y === 5) {
                if(isNaN(entry.order)) {
                    entry.order = "";
                }
                table[y].innerHTML = entry.order;
            }
            else if(y === 6) {
                if(isNaN(entry.attempts)) {
                    entry.attempts = "";
                }
                table[y].innerHTML = entry.attempts;
            }
            else {
                var img = document.createElement('img');
                img.src = entry.gif;
                table[y].innerHTML = "";
                table[y].appendChild(img);
            }
            if(gray) {
                table[y].style.backgroundColor = "darkgray";
            }
            else{
                table[y].style.backgroundColor = "white";
            }
        }
    }
    data();
}

function main() {  
    data();
    methodTable();
    createTable();
}

var methodArray = [];

var arrayCopy = JSON.parse(JSON.stringify(pokemonArray))
var mode = "National";




main();