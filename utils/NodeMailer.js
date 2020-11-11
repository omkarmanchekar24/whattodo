const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const initializeTransport = () => {
  return nodemailer.createTransport(
    sgTransport({
      service: "SendGrid",
      auth: {
        api_key:
          "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",
      },
    })
  );
};

const sendEmail = ({ to, subject, html }) => {
  return initializeTransport().sendMail({
    from: "omkarmanchekar.24@gmail.com",
    to: to,
    subject: subject,
    html: html,
  });
};

module.exports = sendEmail;
