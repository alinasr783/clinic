import supabase from "./supabase";

export async function createBooking(booking) {
    const { data, error } = await supabase
        .from('users_bookings')
        .insert([booking])
        .select()

    if (error) {
        console.error(error);
        throw new Error('Failed to create booking');
    }

    return data
}

// export async function getHotelsPrice(searchParams) {
//     const {
//         bearerToken,
//         checkinDate,
//         checkoutDate,
//         cityId = -2140479, // Default to Amsterdam
//         numberOfAdults = 2,
//         numberOfRooms = 1,
//         country = 'nl',
//         platform = 'desktop'
//     } = searchParams;

//     if (!bearerToken) {
//         throw new Error('Bearer token is required');
//     }

//     if (!checkinDate || !checkoutDate) {
//         throw new Error('Check-in and check-out dates are required');
//     }

//     try {
//         const resp = await fetch(
//             `https://demandapi.booking.com/3.1/accommodations/search`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Affiliate-Id': '0',
//                     Authorization: `Bearer ${bearerToken}`
//                 },
//                 body: JSON.stringify({
//                     booker: {
//                         country,
//                         platform
//                     },
//                     checkin: checkinDate,
//                     checkout: checkoutDate,
//                     city: cityId,
//                     extras: [
//                         'extra_charges',
//                         'products'
//                     ],
//                     guests: {
//                         number_of_adults: numberOfAdults,
//                         number_of_rooms: numberOfRooms
//                     }
//                 })
//             }
//         );

//         if (!resp.ok) {
//             throw new Error(`HTTP error! status: ${resp.status}`);
//         }

//         const data = await resp.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching hotel prices:', error);
//         throw new Error('Failed to fetch hotel prices');
//     }
// }

// For dashboard


export async function getBookings(page = 1, itemsPerPage = 8) {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // Get total count
    const { count, error: countError } = await supabase
        .from('users_bookings')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error(countError);
        throw new Error('Failed to fetch bookings count');
    }

    // Get paginated data
    const { data, error } = await supabase
        .from('users_bookings')
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(error);
        throw new Error('Failed to fetch bookings');
    }

    return {
        data,
        totalItems: count,
        totalPages: Math.ceil(count / itemsPerPage),
        currentPage: page,
        itemsPerPage
    };
}