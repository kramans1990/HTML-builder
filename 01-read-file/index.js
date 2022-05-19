const path = require("path");
let currentFolder = process.cwd();
let finalPath = path.join(__dirname , 'text.txt');
console.log(finalPath);
//

let fs = require('fs');
let text;
let readStream = new fs.ReadStream(finalPath);
readStream.on('readable', function(){
    let text = readStream.read();
    if (text) {
        console.log(text.toString());
      }
});
