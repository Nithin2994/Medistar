const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");


async function sendMail(emailDetails){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nagumothu.banu@gmail.com',
            pass: 'banu25021995'
        },
        secure: false,//true
        port: 25,//465
        tls: {
            rejectUnauthorized: false
        }
    });

    const data = await ejs.renderFile(__dirname + "/test.ejs", { data: emailDetails.cards ,name:emailDetails.name});

    const mainOptions = {
        from: '"commonquail" no-reply@commonquail.com',
        to: emailDetails.email,
        subject: 'Card Details For Booking',
        html: data
    };

    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}
module.exports={sendMail}