let yandereDev = [[0],[0],[0],[0]]
let MorP;
function contador(){
    yandereDev[3][0] += parseInt(30)
    
    for(let i = 0; i < yandereDev.length; i++){
        if(yandereDev[i-1] != undefined && yandereDev[i][0] == 60){
           yandereDev[i][0] = 0;
           yandereDev[i-1][0] += 1;
        }
        if(yandereDev[1][0] == 24){
            yandereDev[1][0] = 0;
            yandereDev[0][0] += 1;
        }
        if(yandereDev[1][0] >= 12){
            MorP = "PM"
        }else{
            MorP = "AM"
        }
    }
    console.log(yandereDev, MorP)
}
const tempoMerda = setInterval(contador, 2000);