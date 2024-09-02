// import AdvertisementStyle from '../../components/Advertisement/AdvertisementStyle';
import { Metadata } from 'next';
import ItemGrid from '../../components/Items/ItemGrid';

export const metadata: Metadata = {
  title: 'Shop',
};

export default function ShopPage() {
  return (
    <>
      {/* <AdvertisementStyle /> */}
      <section className="flex flex-col items-center my-10">
        <ItemGrid />
      </section>
    </>
  );
}
