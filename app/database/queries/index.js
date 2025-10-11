import { hotelModel } from "@/app/models/hotel-model";
import { ratingModel } from "@/app/models/rating-model";
import { reviewModel } from "@/app/models/review-model";
import { bookingModel } from "@/app/models/booking-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

// ----------------------------
// 1️⃣ Helper function: Check if hotel is booked in given dates
// ----------------------------
async function findBooking(hotelId, checkin, checkout) {
  const bookings = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = bookings.find((match) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const bookingStart = new Date(match.checkin);
    const bookingEnd = new Date(match.checkout);

    // Proper overlap check
    return !(checkoutDate <= bookingStart || checkinDate >= bookingEnd);
  });

  return found || null;
}

// ----------------------------
// 2️⃣ Get all hotels with optional booking check
// ----------------------------
export async function getAllHotels(destination, checkin, checkout) {
  const regex = new RegExp(destination, "i");

  const hotels = await hotelModel
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

  // If checkin & checkout provided, check booking status
  const hotelsWithBooking =
    checkin && checkout
      ? await Promise.all(
          hotels.map(async (hotel) => {
            hotel.isBooked = !!(await findBooking(
              hotel._id,
              checkin,
              checkout
            ));
            return hotel;
          })
        )
      : hotels;

  return replaceMongoIdInArray(hotelsWithBooking);
}

// ----------------------------
// 3️⃣ Get single hotel by ID with optional booking check
// ----------------------------
export async function getHotelById(hotelId, checkin, checkout) {
  const hotel = await hotelModel.findById(hotelId).lean();
  if (!hotel) return null;

  if (checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    hotel.isBooked = !!found;
  }

  return replaceMongoIdInObject(hotel);
}

// ----------------------------
// 4️⃣ Get all ratings for a hotel
// ----------------------------
export async function getRatingsForHotel(hotelId) {
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}

// ----------------------------
// 5️⃣ Get all reviews for a hotel
// ----------------------------
export async function getReviewsForHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}
