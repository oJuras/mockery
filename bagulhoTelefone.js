const express = require('express');
const app = express()
const bodyParser = require('body-parser');  

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  

async function MainCourse(number) {
    const puppeteer = require('puppeteer-extra');
    const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
    const {executablePath} = require('puppeteer')
    
    puppeteer.use(
      RecaptchaPlugin({
        provider: {
          id: '2captcha',
          token: '' //apikey do 2captcha
        }
      })
    );
  
    const browser = await puppeteer.launch({executablePath: executablePath()});
    const page = await browser.newPage();
    
    await page.goto('https://consultanumero.abrtelecom.com.br/consultanumero/consulta/consultaSituacaoAtualCtg', {
      waitUntil: 'networkidle0'
    });
    
    await page.setViewport({width: 1080, height: 1024});
    await page.type('#telefone', number, {delay: 15});
    await page.solveRecaptchas()
    await page.click('#consultaSituacao');
        
    const textSelector = await page.waitForSelector(
      '#resultado'
    );
    const fullTitle = await textSelector.evaluate(el => el.textContent);
    
    await browser.close();
  
    return(fullTitle);
};

app.post('/num', urlencodedParser, async function (req, res) {
    let local_numbers = req.body.numbers.split(',');
    let payload = [];
    for(let i = 0; i < local_numbers.length; i++){
        let holder = await MainCourse(local_numbers[i]);
        payload.push(local_numbers[i] + holder);
    };
    res.end(payload.toString());
});
  
var server = app.listen(8712, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("App listening at http://%s:%s", host, port)  
})  