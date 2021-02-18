

const connectDb = require('./config/db');
connectDb();

const Filemodel = require("./models/file");
const fs= require("fs");

async function fetchData()
{
 const passdate = new Date(Date.now() - 24*60*60*1000);
 const files = await Filemodel.find({ "createdAt" : { $lt : passdate }});
 console.log(passdate)
 console.log(files.length)
 if(files.length)
 {
     for(const file of files)
     { 
         try {
            fs.unlinkSync(file.path);
            await file.remove();
            console.log(`Successfully deleted ${file.filename}`);
         }
         catch(err)
         {
             console.log(`Error while deleting file ${err}`);
         }
     }
     
 }
 console.log("Job Done");
}

fetchData().then(process.exit);