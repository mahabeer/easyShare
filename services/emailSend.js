const nodemailer = require("nodemailer");

async function emailSend(sender,receiver,subject,text,html)
{
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASSWORD, 
        },
        tls:{
                rejectUnauthorized:false
            }
      });

      let info = await transporter.sendMail({
        from: `"easyShare 👻" <${sender}>`, 
        to: receiver, 
        subject: subject, 
        text: text, 
        html: html, 
      }).then((data)=> {
        return data;
    }).catch((err)=>{console.log(err)});;

}

module.exports=emailSend;