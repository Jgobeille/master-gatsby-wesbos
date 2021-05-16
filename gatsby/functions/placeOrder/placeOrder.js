const nodemailer = require('nodemailer');

// create transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    // Create test email
    from: 'Slicks slices <slick@example.com>',
    to: 'orders@example.come',
    subject: 'New order!',
    html: `<p>Your new pizza order is here!</p>`,
  });

  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
