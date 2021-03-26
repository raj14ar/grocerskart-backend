const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'youtimoindia@gmail.com',
        pass: 'Jaimahakal@2021'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../mailer_template', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}