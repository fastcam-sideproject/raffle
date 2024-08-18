import HeaderNav from '../../components/Header/HeaderNav';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}
