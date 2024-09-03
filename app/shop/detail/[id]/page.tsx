import ItemDetail from '../../../../components/Items/ItemDetail';

export default function DetailItemPage({ params }: { params: { id: number } }) {
  return <ItemDetail params={params} />;
}
