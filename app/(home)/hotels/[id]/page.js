import Summary from "@/app/components/hotel/details/Summary";
import Gallery from "@/app/components/hotel/details/Gallery";
import Overview from "@/app/components/hotel/details/Overview";
import { getHotelById } from "@/app/database/queries";

const HotelDetailsPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  const hotelInfo = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotelInfo={hotelInfo} />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview overview={hotelInfo?.overview} />
    </>
  );
};

export default HotelDetailsPage;
