import { getRatingsForHotel } from "@/app/database/queries"

const HotelRating = async ({ id }) => {
    const ratings = await getRatingsForHotel(id)


    const getRatingDescription = (avgRating) => {
        if (avgRating === 0) {
            return "Not Rated";
        } else if (avgRating > 0 && avgRating <= 2) {
            return "Poor";
        } else if (avgRating > 2 && avgRating <= 3) {
            return "Average";

        } else if (avgRating > 3 && avgRating <= 4) {
            return "Good";
        } else if (avgRating > 4 && avgRating <= 5) {
            return "Excellent";
        }
    }


    let avgRating = 0;
    if (ratings.length === 1) {
        avgRating = ratings[0].rating;
    }

    if (ratings.length > 1) {
        const total = ratings.reduce((sum, current) => sum + current.rating, 0);
        avgRating = total / ratings.length;
    }



    return (
        <>

            <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
                {avgRating}
            </div>
            <span className="font-medium">{getRatingDescription(avgRating)}</span>
        </>
    )
}

export default HotelRating;