const router =  require("express").Router();
const File = require("../models/file");

router.get("/:uuid",async(req,res)=>{
    try {
        const file = await File.findOne({uuid:req.params.uuid});
        if(!file)
        {
            return res.render('download',{error:"Link has been expired."})
        }

        const filepath = `${__dirname}/../${file.path}`;
        return res.download(filepath);
    }
    catch(err)
    {
        return res.render('download',{error:"Something went wrong"})
    }
    
});


module.exports= router;