import ItemDetail from '../../../../components/Items/ItemDetail';

function Page({ params }: { params: { id: string } }) {
  return <ItemDetail params={params} />;
}

export default Page;
