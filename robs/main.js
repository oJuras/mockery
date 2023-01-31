var Sentiment = require('sentiment'); //entende em ingles
const translate = require('translate-google') //traduz pra ingles
const fs = require('fs'); //sistema de arquivos
const GoogleTts = require("google-tts.js") //grava audio em linguas 
var player = require('play-sound')(opts = {}) //toca o audio gravado
const readline = require('readline'); //pega input

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function encheu(){
    process.exit(0);
}

let input;

async function questioning(){
    await GoogleTts.saveFile("Como você se sente?", "PT", "audio.mp3")
    await player.play('audio.mp3', function(err){
        //if (err) throw err
    })
    rl.question('Como você se sente? ', async function (feels) {
        input = feels;
        translate(input, { from: 'pt', to: 'en' }).then(async (res) => {
            var sentiment = new Sentiment();
            var result = sentiment.analyze(res);
            //console.dir(result);
            if (result.score > 0) {
                await GoogleTts.saveFile("Você parece estar bem, eu acho", "PT", "audio.mp3");
            } else if (result.score < 0) {
                await GoogleTts.saveFile("Alguns dias são ruins", "PT", "audio.mp3");
            } else {
                await GoogleTts.saveFile("Sentimentos neutros ou mistos", "PT", "audio.mp3");
            }

            player.play('audio.mp3', function (err) {
            });
            await rl.close();
        }).catch(err => {
            console.error(err);
        });
    })
}


(async()=>{

    await fs.readFile('holder','utf-8',async function(err,data){

        if(data.indexOf('primeiravez') != -1){
            await GoogleTts.saveFile("Olá, essa é a primeira vez que você me ouve. Espero que "
            +"aproveite esse programa que eu fiz! Cuidado com acentos na hora de escrever. Qual seu nome?", "PT", "audio.mp3")
            await player.play('audio.mp3', function(err){
                //if (err) throw err
            })
            await rl.question('Qual seu nome? ', async function (her){
                input = her;
                await rl.close();
                await GoogleTts.saveFile(input + "? Você tem um lindo nome! É um prazer te conhecer!", "PT", "audio.mp3")
                await player.play('audio.mp3', async function(err){
                    await fs.writeFile('holder', input, async function(err, data){
                        await GoogleTts.saveFile(input + ", estarei encerrando o programa. Peço que abra-o novamente para concluirmos a configuração", "PT", "audio.mp3")
                        await player.play('audio.mp3', async function(err){
                            var myTimeout = setTimeout(encheu,3000)
                        })
                    })
                })


            })
        }else{
            var payload = "Olá "+data+"! Que bom te ver por aqui!"
            await GoogleTts.saveFile(payload, "PT", "audio.mp3")
            await player.play('audio.mp3', function(err){
                var myTimeout = setTimeout(questioning, 100);
                //if (err) throw err
            })
        }
    })

})();