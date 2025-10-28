const API_KEY = 'c329b1a555665c8849b6a8fe6ce59212';
const BASE_URL = 'http://api.aviationstack.com/v1';

export async function searchAirports(query) {
    try {
        const response = await fetch(
            `${BASE_URL}/airports?access_key=${API_KEY}&search=${query}`
        );

        if (!response.ok) {
            throw new Error('Airport search failed');
        }

        const data = await response.json();
        return data.data.map(airport => ({
            id: airport.airport_id,
            name: airport.airport_name,
            iata: airport.iata_code,
            city: airport.city_name,
            country: airport.country_name
        }));
    } catch (error) {
        console.error('Error searching airports:', error);
        throw new Error('Failed to search airports');
    }
}

export async function searchFlights(params) {
    const { departureIata, arrivalIata, date } = params;
    
    try {
        const response = await fetch(
            `${BASE_URL}/flights?access_key=${API_KEY}&dep_iata=${departureIata}&arr_iata=CAI&flight_status=scheduled`
        );

        if (!response.ok) {
            throw new Error('Flight search failed');
        }

        const data = await response.json();
        
        // Group and sort flights by different criteria
        const flights = data.data.reduce((acc, flight) => {
            const price = Math.random() * (1000 - 300) + 300; // Simulated price since API doesn't provide it
            const duration = Math.random() * (12 - 6) + 6; // Simulated duration in hours
            
            acc.push({
                flightNumber: flight.flight.number,
                airline: flight.airline.name,
                departure: {
                    time: flight.departure.scheduled,
                    terminal: flight.departure.terminal
                },
                arrival: {
                    time: flight.arrival.scheduled,
                    terminal: flight.arrival.terminal
                },
                price: Math.round(price),
                duration: Math.round(duration * 100) / 100
            });
            return acc;
        }, []);

        // Sort flights by different criteria
        return {
            cheapest: flights.sort((a, b) => a.price - b.price)[0],
            fastest: flights.sort((a, b) => a.duration - b.duration)[0],
            best: flights.sort((a, b) => 
                (b.airline === 'Emirates' || b.airline === 'Qatar Airways' ? 1 : 0) - 
                (a.airline === 'Emirates' || a.airline === 'Qatar Airways' ? 1 : 0)
            )[0]
        };
    } catch (error) {
        console.error('Error searching flights:', error);
        throw new Error('Failed to search flights');
    }
}