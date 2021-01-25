var cleared = false;

//function to add pair of values
function addValue(){
    hideXML();
    const text = input.value;
    const res = text.split("=");
    if(res.length == 2){
        const name = res[0].trim();
        const value = res[1].trim();
        const pattern = new RegExp("^[0-9a-zA-Z]+$");
        if(name.match(pattern) && name.match(pattern)){
            if(!cleared){
                makeTextEmpty();
                cleared = true;
            }
            document.getElementById("text").value += `${name}=${value}\n`;
        }
    }
    input.value = "";
}

//function to clear textarea
function makeTextEmpty(){
    hideXML();
    document.getElementById("text").value = '';
}

//function to sort list
function sort(param){
    hideXML();
    const strings = getPairs();
    let sorted = false;
    for(let i = 0; i < strings.length; i++){
        sorted = true;
        for(let j = 0; j < strings.length - i - 1; j++){
            if(strings[j][param] > strings[j + 1][param]){
                const tmp = strings[j];
                strings[j] = strings[j + 1];
                strings[j + 1] = tmp;
                sorted = false;
            }
        }
        if(sorted) break;
    }
    let result = "";
    for(let string of strings){
        result += string.join("=") + "\n";
    }
    document.getElementById("text").value = result;
}

//function to get array of pairs
function getPairs(){
    let text = document.getElementById("text").value;
    text = text.split("\n");
    let strings = []
    for(let line of text){
        if(line.includes("=")){
            strings.push(line.split("="));
        }
    }
    return strings;
}

//function to show xml text
function showXML(){
    const pairs = getPairs();
    let text = '<?xml version="1.0" encoding="UTF-8"?>\n<test>\n';
    for(const pair of pairs){
        const name = pair[0];
        const value = pair[1];
        text += `  <${name}>${value}</${name}>\n`
    }
    text += "</test>"
    const textEl = document.getElementById("hiddenText");
    textEl.value = text;
    textEl.hidden = false;
    document.getElementById("hiddenBtn").hidden = false;
}

//function to hide xml text
function hideXML(){
    document.getElementById("hiddenText").hidden = true;
    document.getElementById("hiddenBtn").hidden = true  ;
}