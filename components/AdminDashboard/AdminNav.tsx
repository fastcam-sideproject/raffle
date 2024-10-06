import Link from 'next/link';

function AdminNav() {
  return (
    <nav className="h-[100%] border-r">
      <ul className="flex flex-col">
        <li className="w-[100%] h-12 flex justify-center items-center border-b hover:bg-primary hover:text-white">
          <Link href="/admin">관리자 페이지 홈</Link>
        </li>
        <li className="w-[100%] h-12 flex justify-center items-center border-b hover:bg-primary hover:text-white">
          <Link href="/admin/regform">물건 등록하기</Link>
        </li>
        <li className="w-[100%] h-12 flex justify-center items-center border-b hover:bg-primary hover:text-white">
          <Link href="/admin/itemlist">리스트 보기</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;
