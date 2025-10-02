import { hotelModel } from "@/app/models/hotel-model";
import { replaceMongoIdInArray } from "@/utils/data-util";

export async function getAllHotels() {
  const hotels = await hotelModel.find().lean();

  console.log("--- MongoDB Fetch Result (Hotels Found) ---");
  console.log(hotels.length, "hotels found."); // কতগুলো হোটেল পাওয়া গেছে
  console.log("-------------------------------------------");

  return replaceMongoIdInArray(hotels);
}
