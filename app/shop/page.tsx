import { Metadata } from 'next';
import ItemGrid from '../../components/Items/ItemGrid';

export const metadata: Metadata = {
  title: 'Shop',
};

export default function ShopPage() {
  return (
    <section className="flex flex-col items-center my-10">
      <ItemGrid />
    </section>
  );
}
