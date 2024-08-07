import Image from 'next/image';

function Item() {
  return (
    <div>
      <Image width={100} height={100} src="/image/logo_title.png" alt="상품이미지" />
      <h4 className="text-lg font-bold">플레이스테이션</h4>
      <span>게임기</span>
      <button type="button">구매하기</button>
      <div>
        <span>30%</span>
        <p>진행중</p>
        <div>(진행률)</div>
      </div>
    </div>
  );
}

export default Item;
