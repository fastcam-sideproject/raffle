import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="h-screen flex items-center justify-center bg-[url('/image/background/gift_bg.jpg')] bg-no-repeat bg-cover">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4 text-shadow-white-shadow">
          All You Raffle 에 오신것을 환영합니다
        </h2>
        <p className="text-xl mb-6 text-shadow-white-shadow">행운을 받아가세요!</p>
        <button type="button" className="bg-blue-400 text-white px-6 py-3 rounded-full shadow-2xl">
          <Link href="/shop">Get Started</Link>
        </button>
      </div>
    </section>
  );
}
