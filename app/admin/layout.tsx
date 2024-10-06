import AdminNav from '../../components/AdminDashboard/AdminNav';
import HeaderNav from '../../components/Header/HeaderNav';

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderNav />
      <main className="flex">
        <aside className="w-1/4 min-h-screen">
          <AdminNav />
        </aside>
        <section className="w-[100%] flex justify-center items-center p-4">{children}</section>
      </main>
    </>
  );
}
