import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
   service: "gmail",
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS, 
  },
});

const sendVerificationEmail = async (to, html, subject) => {
  
  const info = await transport.sendMail({
    from: '"Chatterbird" <talishtarik1234@gmail.com>',
    to,
    subject: subject,
    html
  });

  console.log("Verification email sent:", info.messageId);
}

export { sendVerificationEmail };