import { Metadata } from 'next';
import EmailForm from '../../../components/Email/EmailForm';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <>
      <EmailForm />
    </>
  );
}
