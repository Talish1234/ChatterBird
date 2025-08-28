import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS
  }
});

const sendVerificationEmail = async (to, token, req) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const verifyLink = `${protocol}://${host}/email/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://example.com/chatterbird-logo.png" alt="Chatterbird Logo" style="width: 150px;">
      </div>
      <h2 style="color: #333; text-align: center;">Verify Your Email Address</h2>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Hello,
      </p>
      <p style="color: #666; font-size: 16px; line-height: 1.6;">
        Thanks for signing up for Chatterbird! To complete your registration and get started, please click the button below to verify your email address.
      </p>
      <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
        <a href="${verifyLink}" style="background-color: #007BFF; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
          Verify My Email
        </a>
      </div>
      <p style="color: #999; font-size: 14px; text-align: center;">
        If the button doesn't work, you can also copy and paste the following link into your browser:<br>
        <a href="${verifyLink}" style="color: #007BFF; font-size: 14px; word-break: break-all;">${verifyLink}</a>
      </p>
      <p style="color: #999; font-size: 14px; text-align: center; margin-top: 40px;">
        Best regards,<br>
        The Chatterbird Team
      </p>
    </div>
  `;

  const info = await transport.sendMail({
    from: '"Chatterbird" <talishtarik1234@gmail.com>',
    to,
    subject: "Action Required: Verify Your Email Address for Chatterbird",
    html
  });

  console.log("Verification email sent:", info.messageId);
}

export { sendVerificationEmail };