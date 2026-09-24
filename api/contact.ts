import nodemailer from 'nodemailer';

/**
 * Private consultation enquiry submitted from the Orthodox Wealth Management
 * page (`src/components/wealth/WealthConsultationForm.tsx`).
 */
export interface ContactEnquiry {
  firstName: string;
  email: string;
  phone: string;
  preferredMethod: string;
}

/**
 * Minimal structural types so this handler compiles without pulling in a
 * platform-specific SDK. They match both `@vercel/node` and Express handlers.
 */
interface ContactRequest {
  method?: string;
  body?: Partial<ContactEnquiry>;
}

interface ContactResponse {
  status: (code: number) => { json: (body: unknown) => unknown };
}

/** Emails a consultation enquiry to the advisory inbox. Throws if sending fails. */
export async function sendContactEnquiry(enquiry: ContactEnquiry): Promise<void> {
  const { firstName, email, phone, preferredMethod } = enquiry;

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 starts plain and upgrades with STARTTLS.
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: process.env.SMTP_TO || from,
    replyTo: email,
    subject: `New Orthodox Wealth Management enquiry - ${firstName}`,
    text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}\nPreferred Method: ${preferredMethod}`,
  });
}

export default async function handler(req: ContactRequest, res: ContactResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, email, phone, preferredMethod } = req.body ?? {};
  if (!firstName || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sendContactEnquiry({
      firstName,
      email,
      phone,
      preferredMethod: preferredMethod || 'Email',
    });
    return res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send inquiry' });
  }
}
