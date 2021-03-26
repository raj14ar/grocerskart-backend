const nodeMailer = require('../config/nodemailer');

exports.newOrder = (order) => {

    console.log('inside nodemailer')
    let htmlString = nodeMailer.renderTemplate({order: order}, '/new_order_mailer_template.ejs');

    nodeMailer.transporter.sendMail({
       from: 'youtimoindia@gmail.com',
       to: 'raj14ar@gmail.com',
       subject: "New Order Placed!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}