import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { searchAirports, searchFlights } from "../../sevices/flightApi";
import debounce from "lodash/debounce";

function CostForm() {
  const [formData, setFormData] = useState({
    departureAirport: "",
    departureAirportId: "",
    destination: "Cairo",
    departureDate: "",
    returnDate: "",
    treatmentType: "",
    accommodationLevel: "Budget",
    selectedFlightType: "cheapest", // cheapest, fastest, or best
  });

  const [airports, setAirports] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [flightOptions, setFlightOptions] = useState(null);

  const [totalCost, setTotalCost] = useState(null);

  const treatmentOptions = [
    {value: "single-implant", label: "Single Implant", price: 800},
    {
      value: "multiple-implants",
      label: "Multiple Implants (2-6)",
      price: 800,
    },
    {value: "all-on-4", label: "All-on-4", price: 5500},
    {value: "all-on-6", label: "All-on-6", price: 6500},
    {
      value: "full-mouth-upper",
      label: "Full Mouth Implants (Upper)", price: 12000,
    },
    {
      value: "full-mouth-lower",
      label: "Full Mouth Implants (Lower)", price: 12000,
    },
    {
      value: "full-mouth-rehab",
      label: "Full Mouth Rehabilitation", price: 15000,
    },
  ];

  const accommodationLevels = [
    {
      value: "Budget",
      label: "Budget",
      price: 80,
      description: "Under $80/night",
      details: "3-star hotels, basic amenities",
    },
    {
      value: "Standard",
      label: "Standard",
      price: 115,
      description: "$80 - $150/night",
      details: "4-star hotels, good amenities",
    },
    {
      value: "Luxury",
      label: "Luxury",
      price: 150,
      description: "$150+/night",
      details: "5-star hotels, premium amenities",
    },
  ];

  // Debounced airport search
  const debouncedSearch = debounce(async (query) => {
    if (query.length < 2) {
      setAirports([]);
      return;
    }
    
    try {
      setIsSearching(true);
      const results = await searchAirports(query);
      setAirports(results);
    } catch (error) {
      console.error('Error searching airports:', error);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleInputChange = async (e) => {
    const {name, value} = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'departureAirport') {
      debouncedSearch(value);
    }
  };

  const handleAirportSelect = async (airport) => {
    setFormData(prev => ({
      ...prev,
      departureAirport: `${airport.city} (${airport.iata})`,
      departureAirportId: airport.id
    }));
    setAirports([]); // Clear suggestions

    // Search for flights if we have all required data
    if (formData.departureDate) {
      try {
        const flights = await searchFlights({
          departureIata: airport.iata,
          date: formData.departureDate
        });
        setFlightOptions(flights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    }
  };

  const calculateTotalCost = (e) => {
    e.preventDefault();

    if (
      !formData.treatmentType ||
      !formData.departureDate ||
      !formData.returnDate ||
      !flightOptions
    ) {
      alert("Please fill in all required fields and select a flight");
      return;
    }

    const selectedTreatment = treatmentOptions.find(
      (t) => t.value === formData.treatmentType
    );
    const selectedAccommodation = accommodationLevels.find(
      (a) => a.value === formData.accommodationLevel
    );

    // Calculate number of nights
    const departure = new Date(formData.departureDate);
    const returnDate = new Date(formData.returnDate);
    const nights = Math.ceil((returnDate - departure) / (1000 * 60 * 60 * 24));

    const treatmentCost = selectedTreatment ? selectedTreatment.price : 0;
    const accommodationCost = selectedAccommodation
      ? selectedAccommodation.price * nights
      : 0;
    
    // Get selected flight cost
    const selectedFlight = flightOptions[formData.selectedFlightType];
    const flightCost = selectedFlight ? selectedFlight.price * 2 : 0; // Multiply by 2 for round trip

    const total = treatmentCost + accommodationCost + flightCost;
    setTotalCost({
      treatment: treatmentCost,
      accommodation: accommodationCost,
      flight: flightCost,
      nights: nights,
      total: total,
      selectedFlight: selectedFlight
    });

    console.log(total);
  };

  return (
    <div className="bg-dark-2 rounded-lg p-6 w-full max-w-4xl">
      <form className="space-y-6">
        {/* Departure Airport and Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Departure Airport
            </label>
            <input
              type="text"
              name="departureAirport"
              value={formData.departureAirport}
              onChange={handleInputChange}
              placeholder="e.g., JFK, LHR"
              className="input"
            />
            {isSearching && (
              <div className="absolute right-3 top-10">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            )}
            {airports.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-dark-3 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                {airports.map((airport) => (
                  <div
                    key={airport.id}
                    className="p-3 hover:bg-dark-2 cursor-pointer border-b border-gray-600 last:border-b-0"
                    onClick={() => handleAirportSelect(airport)}
                  >
                    <div className="font-medium">{airport.city} ({airport.iata})</div>
                    <div className="text-sm text-gray-400">{airport.name}, {airport.country}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              disabled
              value={formData.destination}
              className="input"
              readOnly
            />
          </div>
        </div>

        {/* Departure and Return Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleInputChange}
              className="input"
            />
          </div>
        </div>

        {/* Flight Options */}
        {flightOptions && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-4 text-gray-300">
              Select Flight Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(flightOptions).map(([type, flight]) => (
                <div
                  key={type}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.selectedFlightType === type
                      ? "border-gray-100 bg-blue-500/10"
                      : "border-gray-600 bg-dark-3"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      selectedFlightType: type,
                    }))
                  }
                >
                  <h3 className="text-lg font-semibold mb-1 capitalize">
                    {type} Option
                  </h3>
                  <div className="text-sm space-y-1">
                    <p>Airline: {flight.airline}</p>
                    <p>Flight: {flight.flightNumber}</p>
                    <p>Duration: {flight.duration}h</p>
                    <p className="text-lg font-semibold mt-2">
                      ${flight.price} <span className="text-sm">per way</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Treatment Type */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Treatment Type
          </label>
          <select
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-dark-3 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
            <option value="">Select a treatment</option>
            {treatmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Accommodation Level */}
        <div>
          <label className="block text-sm font-medium mb-4 text-gray-300">
            Accommodation Level
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accommodationLevels.map((level) => (
              <div
                key={level.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.accommodationLevel === level.value
                    ? "border-gray-100 bg-blue-500/10"
                    : "border-gray-600 bg-dark-3"
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    accommodationLevel: level.value,
                  }))
                }>
                <h3 className="text-lg font-semibold mb-1">{level.label}</h3>
                <p className="text-gray-300 text-sm mb-2">
                  {level.description}
                </p>
                <p className="text-gray-400 text-xs">{level.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button type="button" onClick={calculateTotalCost}>
            Calculate Total Cost
          </Button>
        </div>

        {totalCost && (
          <div className="mt-8 p-6 bg-dark-3 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Treatment Cost:</span>
                <span>${totalCost.treatment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Accommodation ({totalCost.nights} nights):</span>
                <span>${totalCost.accommodation.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Flight Cost (Round Trip):</span>
                  <span>${totalCost.flight.toLocaleString()}</span>
                </div>
                {totalCost.selectedFlight && (
                  <div className="text-sm text-gray-400">
                    <p>Airline: {totalCost.selectedFlight.airline}</p>
                    <p>Flight Number: {totalCost.selectedFlight.flightNumber}</p>
                    <p>Duration: {totalCost.selectedFlight.duration}h</p>
                  </div>
                )}
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total Estimated Cost:</span>
                <span>${totalCost.total.toLocaleString()}</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              *This is an estimate. Actual costs may vary based on specific
              requirements and current rates.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export default CostForm;
