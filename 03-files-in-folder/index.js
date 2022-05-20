
const path = require("path");
let fs = require('fs');
let finalPath = path.join(__dirname , 'secret-folder');
const readPartials = async () => {
    const filenames = await fs.promises.readdir(finalPath, {withFileTypes: 'true'});   
     for(let i = 0 ;i<filenames.length;i++){
         let fullPath = path.join(finalPath, filenames[i].name);
        fs.stat(fullPath, (error, stats) => {
            if (error) {
              console.log(error);            }
            else {          
            if(stats.isFile() == true){
                let fileexname = path.extname(fullPath).replace('.','');               
                let basename =  path.basename(fullPath);
                basename = basename.substring(0, basename.length - fileexname.length-1);                
                console.log(basename.padEnd(20), " | " , fileexname.padEnd(5) , " | " , (stats.size/1024 + " kb").padEnd(15))
            }     
            }
          });
     } 
  };
readPartials();

