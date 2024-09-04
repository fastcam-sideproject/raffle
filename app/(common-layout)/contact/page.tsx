import { Metadata } from 'next';
import Banner from '../../../components/Banner/Banner';
import EmailForm from '../../../components/Email/EmailForm';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <>
      <Banner />
      <section className="flex flex-col justify-center items-center m-8">
        <h2 className="font-bold">문의 하기</h2>
        <EmailForm />
      </section>
    </>
  );
}
