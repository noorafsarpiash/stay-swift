import { hotelModel } from "@/app/models/hotel-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { ratingModel } from "@/app/models/rating-model";
import { reviewModel } from "@/app/models/review-model";
import { bookingModel } from "@/app/models/booking-model";
import { isDate } from "next-auth/adapters";
export async function getAllHotels(destination, checkin, checkout) {
  const regex = new RegExp(destination, "i");

  const hotelsBysDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsBysDestination;

  if (checkin && checkout) {
  }

  return replaceMongoIdInArray(hotelsBysDestination);
}

async function findBooking(hotelId, checkin, checkout) {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return isDateInbetween(
      isDateInbetween(checkin, match.checkin, match.checkout) ||
        isDateInbetween(checkout, match.checkin, match.checkout)
    );
  });
  return found;
}

export async function getHotelById(hotelId) {
  const hotel = await hotelModel.findById(hotelId).lean();
  return replaceMongoIdInObject(hotel);
}

export async function getRatingsForHotel(hotelId) {
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}

export async function getReviewsForHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}
