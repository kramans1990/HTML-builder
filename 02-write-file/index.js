const readline = require('readline');
const fs = require('fs');
const path = require("path");

let finalPath = path.join(__dirname , 'out.txt');
fs.appendFile(finalPath,"",()=>{});
let readLine = readline.createInterface({
input: process.stdin,
output: process.stdout
});
function readText(){
    readLine.question("Введите текст:" + '  ', function(answer) {
        if(answer === 'exit'){
            console.log('Завершение процесса');
             process.exit();
         }
         fs.appendFile(finalPath, '\n' + `${answer}`, function () {           
          });
      readText();
    });
}
readLine.on('SIGINT', function() {
    console.log('Завершение процесса');
    process.exit();
});
readText();