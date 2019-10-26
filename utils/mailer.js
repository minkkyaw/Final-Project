const nodemailer = require('nodemailer');

const mailer = mailContent => {
    const newAccountOutput = `
        <h2>Welcome To Quattuor ${mailContent.name}!</h2>
        <p>${mailContent.text}</p>
    `;
    const resetPasswordOutput = `
        <h2>Reset Password</h2>
    <p>Follow these steps to reset your password...and don't forget it this time!</p>
    `
    let output;
    switch(mailContent.type) {
        case("new account"):
            console.log("NA")
            output = newAccountOutput;
            break;
        case("reset password"):
            return output = resetPasswordOutput;
            break;
    }
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: 'mail.google.com',
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
            user: 'quattuorapp@gmail.com', // generated ethereal user
            pass: '4Quattuor4'  // generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Quattuor" quattuorapp@gmail.com', // sender address
        to: mailContent.email, // list of receivers
        subject: mailContent.subject, // Subject line
        text: 'Thank you for joining the fastest growing sports social media platform on the web! We are pumped to have you as part of the Quattuor community and hope to help you find fun games and new friends wherever you might be!', // plain text body
        html: output // html body
    };

    console.log(mailOptions);

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
}

module.exports = mailer;
