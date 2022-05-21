const path = require("path");
let fs = require('fs');
let finalPath = path.join(__dirname , 'files');
let finalPathCopy = path.join(__dirname , 'files-copy');


async function  copyDir () {
  // let s = await fs.rmdir(finalPathCopy, { recursive: true }, () => {
    fs.mkdir(finalPathCopy, { recursive: true }, () =>{});
   // });
   const filenamesCopy = await fs.promises.readdir(finalPathCopy, {withFileTypes: 'true'});
   for(let i = 0 ;i<filenamesCopy.length;i++){
    let fullPath = path.join(finalPathCopy, filenamesCopy[i].name);

     fs.stat(fullPath, (error,stat) => {
        if(error){console.log(error);}
        else{
            if(stat.isFile){
            fs.unlink(fullPath,(error)=>{
                if(error){           
                        console.log(error);          
                }
                else{
                console.log('Удалено: ', filenamesCopy[i].name)}
            }
                );
        }
        }
     });
  
   
   
    }
    const filenames = await fs.promises.readdir(finalPath, {withFileTypes: 'true'}); 
    for(let i = 0 ;i<filenames.length;i++){
          let fullPath = path.join(finalPath, filenames[i].name);
          let fullPathCopy = path.join(finalPathCopy, filenames[i].name);
          fs.stat(fullPath, (error, stats) => {
                   if (error) {
                     console.log(error);
                   }
                   else {          
                  if(stats.isFile() == true){
                    fs.copyFile(fullPath, fullPathCopy, (err) => {
                        if (err) throw err;
                        console.log('скопирован файл ' + filenames[i].name );
                      });
                   }     
                   }
                });} 
}
copyDir();
