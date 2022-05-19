const path = require("path");
let fs = require('fs');
let finalPath = path.join(__dirname , 'text.txt');

let text;
let readStream = new fs.ReadStream(finalPath);
readStream.on('readable', function(){
    let text = readStream.read();
    if (text) {
        console.log(text.toString());
      }
});
