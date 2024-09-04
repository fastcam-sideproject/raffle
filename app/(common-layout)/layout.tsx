import HeaderNav from '../../components/Header/HeaderNav';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}
