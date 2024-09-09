import HeaderNav from '../../components/Header/HeaderNav';

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}
