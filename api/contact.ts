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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
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
