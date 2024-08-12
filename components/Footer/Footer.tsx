import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="w-full bg-gray-50">
      <div className="px-24 py-10 grid grid-cols-4 gap-12 max-md:flex max-md:flex-col max-md:p-10">
        <div className="flex flex-col gap-8">
          <Image width={100} height={100} src="/image/logo_title.png" alt="Logo" />
          <span className="text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque cum quia corrupti!
          </span>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-gray-300">Links</span>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex flex-col gap-8">
          <span className="text-gray-300">Help</span>
          <span>Payment Option</span>
          <span>Returns</span>
          <span>Privacy Policies</span>
        </div>
        <div>
          <span className="text-gray-300">NewsLatter</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
