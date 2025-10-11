import HotelCard from "./HotelCard";

import { getAllHotels } from "@/app/database/queries";



const HotelList = async ({ destination, checkin, checkout }) => {
  const allHotels = await getAllHotels(destination, checkin, checkout);

  return (
    <div className="col-span-9">
      <div className="space-y-4">

        {
          allHotels.map((hotel) => (
            <HotelCard
              checkin={checkin}
              checkout={checkout}
              key={hotel.id} hotelInfo={hotel} />
          ))
        }


      </div>
    </div>
  );
};

export default HotelList;
