import ItemDetail from '../../../../components/Items/ItemDetail';

export default function DetailItemPage({ params }: { params: { id: string } }) {
  return <ItemDetail params={params} />;
}
