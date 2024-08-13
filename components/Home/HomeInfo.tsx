export default function HomeInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Shop</h3>
            <p className="text-gray-800">쿠폰을 구매하고 행운을 받아가세요</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">About</h3>
            <p className="text-gray-800">저희 팀 소개 입니다</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-800">문의가 있으면 문의 주세요</p>
          </div>
        </div>
      </div>
    </section>
  );
}
