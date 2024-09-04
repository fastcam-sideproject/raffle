import { Metadata } from 'next';
import Banner from '../../../components/Banner/Banner';
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
