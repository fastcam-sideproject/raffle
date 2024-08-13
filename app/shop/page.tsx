// import AdvertisementStyle from '../../components/Advertisement/AdvertisementStyle';
import Banner from '../../components/Banner/Banner';
import ItemGrid from '../../components/Items/ItemGrid';

function Page() {
  return (
    <>
      {/* <AdvertisementStyle /> */}
      <Banner />
      <section className="flex flex-col items-center my-10">
        <ItemGrid />
      </section>
    </>
  );
}

export default Page;
