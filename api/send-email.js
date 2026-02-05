import { Resend } from 'resend';

const getRequiredEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }
  return value;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const resendApiKey = getRequiredEnv('RESEND_API_KEY');
    const receiverEmail = getRequiredEnv('RECEIVER_EMAIL');

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [receiverEmail],
      reply_to: email,
      subject: `Portfolio Inquiry from ${name}`,
      html: `
        <h2>New Portfolio Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ success: true, message: 'Email sent successfully!', data });
  } catch (error) {
    console.error('Email API error:', error);
    res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
