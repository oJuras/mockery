let stringTarget = '', olocoText = '', charCodeArr = [], dancaBixo = '', montanha = [];

function reset(){
    let stringTarget = '', olocoText = '', charCodeArr = [], dancaBixo = '', montanha = []; 
}

function olocofy(stringTarget){
    for(let i = 0; i < stringTarget.length; i++){
        let code = stringTarget.charCodeAt(i);
        let result = code.toString(2)
        for(let k = 0; k < result.length; k++){
            if(result[k] == 1){
                charCodeArr.push('oloco');
            }else{
                charCodeArr.push('oloko');
            }
        }
        charCodeArr.push("olloko");
    }
    let finito = charCodeArr.toString()
    reset();
    return finito
}

function desolocofy(olocoText){
    let pegouNoMeu = olocoText.split(',')
    for(let o = 0; o < pegouNoMeu.length; o++){
        if(pegouNoMeu[o] == 'olloko'){
            montanha.push(dancaBixo)
            dancaBixo = '';
        }else{
            if(pegouNoMeu[o] == 'oloco'){
                pegouNoMeu[o] = '1'
            }
            if(pegouNoMeu[o] == 'oloko'){
                pegouNoMeu[o] = '0'
            }
            dancaBixo += ''+pegouNoMeu[o];
        }
    }
    let finito = montanha.map(elem => String.fromCharCode(parseInt(elem, 2))).join("");
    reset();
    return finito
}

console.log(desolocofy('oloco,oloco,oloko,oloko,oloko,oloco,oloko,olloko,oloco,oloco,oloko,oloco,oloco,oloco,oloco,olloko,oloco,oloco,oloko,oloco,oloco,oloco,oloko,olloko,oloco,oloco,oloko,oloko,oloko,oloko,oloco,olloko,oloco,oloco,oloko,oloco,oloco,oloko,oloko,olloko,oloco,oloco,oloko,oloko,oloco,oloko,oloko,olloko,oloco,oloco,oloko,oloco,oloco,oloco,oloco,olloko'))
//console.log(olocofy('bonaldo'))