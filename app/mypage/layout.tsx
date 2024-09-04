import HeaderNav from '../../components/Header/HeaderNav';

export default function BannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      {children}
    </>
  );
}
