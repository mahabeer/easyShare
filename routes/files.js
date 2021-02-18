const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.random() * 1E9}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limit: {
        fileSize: 1000000 * 100
    }
}).single('myfile');

router.post("/", (req, res) => {

    upload(req, res, async (err) => {
        //validate request
        if (!req.file) {
            return res.json({ error: "All fields are required" })
        }
        if (err) {
            return res.status(500).send({ err: err.message })
        }

        //Store to database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            filesize: req.file.size
        });

        const response = await file.save();

        //Send Response
        return res.json({ files: `${process.env.APP_BASE_URL}files/${response.uuid}` })

    })
});


router.post("/send",async(req,res)=>{
    const {uuid, sendfrom, sendto } = req.body;
   
    const files = await File.findOne({"uuid":uuid});
    if(files==null)
    {
        return res.json({"error":"Link has expired!"});
    }
    if(files.sender)
    {
        return res.json({"error":"Email already sent !"});
    }

    files.sender=sendfrom;
    files.receiver=sendto;
    const response = await files.save();
 
    const sendEmail = require("../services/emailSend");
    const htmlTemplate = require("../services/emailTemplate");
    sendEmail(sendfrom,sendto,`${sendfrom} sent you files via easyShare.`,'',htmlTemplate(
        sendfrom,
        "24 Hours",
        `${process.env.APP_BASE_URL}files/${files.uuid}`
    ));

    return res.json({"success":true});
    
})
module.exports = router;