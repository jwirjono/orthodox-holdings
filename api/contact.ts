import nodemailer from 'nodemailer';

/**
 * Private consultation enquiry submitted from the Orthodox Wealth Management
 * page (`src/components/wealth/WealthConsultationForm.tsx`).
 */
export interface WealthEnquiry {
  source: 'wealth';
  firstName: string;
  email: string;
  phone: string;
  preferredMethod: string;
}

/**
 * Advisory engagement enquiry submitted from the main site's consultation
 * section (`src/components/ConsultationSection.tsx`).
 */
export interface ConsultationEnquiry {
  source: 'consultation';
  name: string;
  company: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
}

export type ContactEnquiry = WealthEnquiry | ConsultationEnquiry;

/**
 * Minimal structural types so this handler compiles without pulling in a
 * platform-specific SDK. They match both `@vercel/node` and Express handlers.
 */
interface ContactRequest {
  method?: string;
  body?: unknown;
}

interface ContactResponse {
  status: (code: number) => { json: (body: unknown) => unknown };
}

const field = (body: Record<string, unknown>, key: string): string =>
  typeof body[key] === 'string' ? (body[key] as string).trim() : '';

/**
 * Validates a request body into an enquiry, or returns null when a required
 * field is missing. Bodies without `source` come from the Wealth Management form.
 */
export function parseEnquiry(body: unknown): ContactEnquiry | null {
  if (!body || typeof body !== 'object') return null;
  const data = body as Record<string, unknown>;

  if (data.source === 'consultation') {
    const enquiry: ConsultationEnquiry = {
      source: 'consultation',
      name: field(data, 'name'),
      company: field(data, 'company'),
      email: field(data, 'email'),
      phone: field(data, 'phone'),
      areaOfInterest: field(data, 'areaOfInterest'),
      message: field(data, 'message'),
    };
    return enquiry.name && enquiry.email && enquiry.phone ? enquiry : null;
  }

  const enquiry: WealthEnquiry = {
    source: 'wealth',
    firstName: field(data, 'firstName'),
    email: field(data, 'email'),
    phone: field(data, 'phone'),
    preferredMethod: field(data, 'preferredMethod') || 'Email',
  };
  return enquiry.firstName && enquiry.email && enquiry.phone ? enquiry : null;
}

const composeMessage = (enquiry: ContactEnquiry): { subject: string; text: string } => {
  if (enquiry.source === 'consultation') {
    const { name, company, email, phone, areaOfInterest, message } = enquiry;
    return {
      subject: `New Orthodox private consultation request - ${name}${company ? ` (${company})` : ''}`,
      text:
        `Name: ${name}\nCompany: ${company || '-'}\nEmail: ${email}\nPhone: ${phone}\n` +
        `Area of Interest: ${areaOfInterest || '-'}\n\nNotes:\n${message || '-'}`,
    };
  }

  const { firstName, email, phone, preferredMethod } = enquiry;
  return {
    subject: `New Orthodox Wealth Management enquiry - ${firstName}`,
    text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}\nPreferred Method: ${preferredMethod}`,
  };
};

/** Emails an enquiry to the advisory inbox. Throws if sending fails. */
export async function sendContactEnquiry(enquiry: ContactEnquiry): Promise<void> {
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
    replyTo: enquiry.email,
    ...composeMessage(enquiry),
  });
}

export default async function handler(req: ContactRequest, res: ContactResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const enquiry = parseEnquiry(req.body);
  if (!enquiry) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await sendContactEnquiry(enquiry);
    return res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send inquiry' });
  }
}
