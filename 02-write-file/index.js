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
    readLine.question("Введите текст:" + '\n', function(answer) {
        if(answer === 'exit'){           
            console.log( 'Завершение процесса');
             process.exit();
         }
         fs.appendFile(finalPath, `${answer}` +'\n', function () {           
          });
      readText();
    });
}
readLine.on('SIGINT', function() {
    console.log('Завершение процесса');
    process.exit();
});
readText();
