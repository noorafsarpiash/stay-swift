import Search from "@/app/components/search/Search";
import Filter from "@/app/components/search/Filter";
import HotelList from "@/app/components/hotel/HotelList";

const HotelListPage = ({
  searchParams: { checkin, checkout, destination },
}) => {
  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            fromList={true}
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <HotelList
            destination={destination}
            checkin={checkin}
            checkout={checkout}
          />
        </div>
      </section>
    </>
  );
};

export default HotelListPage;
