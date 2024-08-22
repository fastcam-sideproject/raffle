import nodemailer from 'nodemailer';

export type ContactType = {
  from: string;
  title: string;
  content: string;
};

type MailOptionType = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export function sendEmail({ from, title, content }: ContactType) {
  const mailOptions: MailOptionType = {
    to: process.env.NEXT_APP_EMAIL || '',
    from: `${from}`,
    subject: `[All Your Raffle 1:1 문의] ${title}`,

    html: `
    <h1>${title}</h1>
    <div>${content}</div>
    </br>
    <p>보낸사람 : ${from}</p>
    `,
  };
  return transporter.sendMail(mailOptions);
}
