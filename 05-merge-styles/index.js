const path = require("path");
let fs = require('fs');
let finalPath = path.join(__dirname , 'styles');
let bundlePath = path.join(__dirname ,'project-dist', 'bundle.css');
fs.writeFile(bundlePath,"", (error)=>{ if(error){
  console.log(error);
}}
  
  )

 async function bundleStyles  ()  {
      
    const filenames = await fs.promises.readdir(finalPath, {withFileTypes: 'true'});
     for(let i = 0 ;i<filenames.length;i++){
         let fullPath = path.join(finalPath, filenames[i].name);
        fs.stat(fullPath, (error, stats) => {
            if (error) {
              console.log(error);
            }
            else {          
            if(stats.isFile() == true){
                let fileexname = path.extname(fullPath);
                if(fileexname === '.css'){
                    let readStream = new fs.ReadStream(fullPath);
                    readStream.on('readable', function(){
                        let text = readStream.read();
                        if (text) {
                           //cssContent.push(text.toString());
                             fs.appendFile(bundlePath,text, (error)=>{
                              if(error) console.log(error);
                             })
                          }
                    });
                }
            }     
            }
          });
     } 

  };
bundleStyles();

