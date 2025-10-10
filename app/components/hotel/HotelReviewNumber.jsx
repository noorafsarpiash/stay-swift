import { getReviewsForHotel } from "@/app/database/queries"
import Link from "next/link"


const HotelReviewNumber = async ({ id }) => {

    return (
        <>
            {
                id?.length === 0 ? (<Link href="" className="underline">Be the first one to review</Link>) :
                    (<Link href={`/hotel/${id}/reviews`} className="underline">{id.length} Reviews</Link>)
            }
        </>
    )
}

export default HotelReviewNumber