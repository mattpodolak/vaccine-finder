import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(msg) {
  try {
    await sgMail.send(msg);
  } catch (e) {
    throw new Error(`Could not send email: ${e.message}`);
  }
}
