import AdminItemDetail from '../../../../components/AdminDashboard/AdminItemDetail';

export default function DetailItemPage({ params }: { params: { id: number } }) {
  return <AdminItemDetail params={params} />;
}
