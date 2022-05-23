const path = require("path");
let fs = require('fs');
const { dirname } = require("path");

let projectPath = path.join(__dirname, 'project-dist');
let assetPath = path.join(projectPath, 'assets');

fs.mkdir(assetPath, { recursive: true }, () => {
    makeAssets();
});

async function makeAssets() {
    let fPath = path.join(assetPath, 'fonts');
    let iPath = path.join(assetPath, 'img');
    let sPath = path.join(assetPath, 'svg');
    fs.mkdir(fPath, { recursive: true }, () => {
     
        fs.mkdir(iPath, { recursive: true }, () => {
            
            fs.mkdir(sPath, { recursive: true }, () => {
               
                removeAssets();

            });
        });
    });
}
async function removeAssets() {
    // filenamesAssets = await fs.promises.readdir(aPath);


    let finalAssetPathCopy = path.join(projectPath, 'assets', 'fonts');

    fs.readdir(finalAssetPathCopy, (err, files) => {
        if (err)
            console.log(err);
        else {
            
            files.forEach(file => {
              
                fs.unlink(path.join(finalAssetPathCopy, file), () => { });
            })

            finalAssetPathCopy = path.join(projectPath, 'assets', 'img');

            fs.readdir(finalAssetPathCopy, (err, files) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("\nCurrent directory filenames:");
                    files.forEach(file => {
                    
                        fs.unlink(path.join(finalAssetPathCopy, file), () => { });
                    })

                    finalAssetPathCopy = path.join(projectPath, 'assets', 'svg');

                    fs.readdir(finalAssetPathCopy, (err, files) => {
                        if (err)
                            console.log(err);
                        else {
                            //console.log("\nCurrent directory filenames:");
                            files.forEach(file => {
                            
                                fs.unlink(path.join(finalAssetPathCopy, file), () => { });
                            })
                            copyAssets();
                        }
                    })


                }
            })

        }
    })






}
function copyAssets() {
    let finalAssetPath = path.join(__dirname, 'assets', 'fonts');
    let finalAssetPathCopy = path.join(projectPath, 'assets', 'fonts');
    fs.readdir(finalAssetPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            //console.log("\nCurrent directory filenames:");
            files.forEach(file => {
                fs.copyFile(path.join(finalAssetPath, file), path.join(finalAssetPathCopy, file), (err) => {
                    if (err) throw err;
                });
            })
        }
        finalAssetPath = path.join(__dirname, 'assets', 'img');
        finalAssetPathCopy = path.join(projectPath, 'assets', 'img');
        fs.readdir(finalAssetPath, (err, files) => {
            if (err)
                console.log(err);
            else {
                files.forEach(file => {
                    fs.copyFile(path.join(finalAssetPath, file), path.join(finalAssetPathCopy, file), (err) => {
                        if (err) throw err;
                    });

                })
            }

            finalAssetPath = path.join(__dirname, 'assets', 'svg');
            finalAssetPathCopy = path.join(projectPath, 'assets', 'svg');
            fs.readdir(finalAssetPath, (err, files) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("\nCurrent directory filenames:");
                    files.forEach(file => {
                        fs.copyFile(path.join(finalAssetPath, file), path.join(finalAssetPathCopy, file), (err) => {
                            if (err) throw err;

                        });
                    })
                    mergeStyles();  
                }
            })
       
       
        })
    })


}

async function mergeStyles(){
    let bundlePath = path.join(__dirname ,'project-dist', 'style.css');
    fs.writeFile(bundlePath,"", (error)=>{ if(error){
        console.log(error);
      }});
        fs.readdir(path.join(__dirname,'styles'), (err,files)=>{
        if (err)
        console.log(err);
        else {
        
        files.forEach(file => {
            let fullPath = path.join(__dirname,'styles',file);
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
        })
        getTemplates();
       
    }
   
    });
}
async function getTemplates(){
    let tempath = new Array();
    let components = path.join(__dirname,'components');
    let templatePath = path.join(__dirname,'template.html');
    let htmlDocument  ="";
    fs.readFile(templatePath, 'utf8', function(err, data) {
        if (err) throw err;
             htmlDocument = data;
           fs.readdir(components, (err,files)=>{
            if (err)
            console.log(err);
            else {
                files.forEach(file => {
                     let fileexname = path.extname(path.join(components,file));
                     let basename =  path.basename(path.join(components,file));
                    let basenameTemplate= "{{"+basename.substring(0, basename.length - fileexname.length)+ "}}";
                    let x =  htmlDocument.includes(basenameTemplate);
                    if(htmlDocument.includes(basenameTemplate)){
                        
                        let obj = {     // объект
                            template: basenameTemplate,  
                            path: file                   
                          };
                          if(fileexname === '.html'){
                            tempath.push(obj);
                          }
                          
                     } 
                });
            }

            buildHtml(tempath,htmlDocument);

           });

      });
}
var itemsProcessed = 0;
async function buildHtml(obj, html){
    let htmlDocument = html;
   for(let i = 0 ; i<obj.length ;i++){
        fs.readFile(path.join(__dirname,'components',obj[i].path), 'utf8', function(err, data) {
                            if (err) throw err;
                           // let html = data;
                            htmlDocument = htmlDocument.replace(obj[i].template,data);
                            itemsProcessed++;
                            if(itemsProcessed==obj.length){
                            fs.writeFile(path.join(projectPath,'index.html'),htmlDocument, (error)=>{ if(error){
                            } 
                              });}
                        });
   }
}
