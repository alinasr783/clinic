import {ChevronDown} from "lucide-react";
import {useState} from "react";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import Button from "../../components/Button";
import availableTimesData from "../../data/availableTimes.json";
import {formatDate} from "../../utils/helpers";
import {createBooking} from "../../sevices/api";

function BookingForm() {
  const [selectedService, setSelectedService] = useState("Teeth Whitening");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("02:00 PM");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const services = [
    "Teeth Whitening",
    "General Checkup",
    "Dental Cleaning",
    "Root Canal",
    "Dental Implants",
    "Orthodontics",
  ];

  const availableTimes = availableTimesData.availableTimes;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = {
      service: selectedService,
      date: selectedDate ? formatDate(selectedDate) : "No date selected",
      time: selectedTime,
      dentist: "Dr. Evelyn Reed",
    };

    try {
      console.log("Booking Form Data:", formData);
      const result = await createBooking(formData);
      console.log("Booking created successfully:", result);

      // Optional: Reset form or show success message
      alert("Booking created successfully!");
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-2 p-8 rounded-2xl max-w-6xl mx-auto">
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        onSubmit={handleSubmit}>
        <div className="space-y-8">
          <div>
            <label className="block text-lg font-semibold mb-4 text-gray-200">
              Select a Service
            </label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 
                    rounded-lg px-4 py-3 text-white focus:outline-none 
                        focus:ring-2 focus:ring-white-500 focus:border-transparent 
                            appearance-none cursor-pointer">
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <div
                className="absolute inset-y-0 right-0 
                flex items-center px-2 pointer-events-none">
                <ChevronDown />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Our Dentist
            </h3>
            <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <img
                  src="/logo.jpeg"
                  alt="Dentist"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-white">Dr. Evelyn Reed</h4>
                <p className="text-gray-400 text-sm">
                  General & Cosmetic Dentistry
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Select a Date & Time
            </h3>

            {/* Calendar with DayPicker */}
            <div className="bg-gray-800 rounded-lg p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{before: new Date()}}
                style={{
                  "--rdp-cell-size": "40px",
                  "--rdp-accent-color": "#fff",
                  "--rdp-background-color": "#374151",
                  "--rdp-accent-color-dark": "#2563eb",
                  "--rdp-background-color-dark": "#1f2937",
                  "--rdp-outline": "2px solid var(--rdp-accent-color)",
                  "--rdp-outline-selected": "2px solid var(--rdp-accent-color)",
                  color: "#e5e7eb",
                  backgroundColor: "transparent",
                }}
                className="rdp-dark"
                classNames={{
                  months: "rdp-months",
                  month: "rdp-month",
                  caption: "rdp-caption text-white font-semibold",
                  caption_label: "rdp-caption_label text-white",
                  nav: "rdp-nav",
                  nav_button:
                    "rdp-nav_button text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-2",
                  nav_button_previous: "rdp-nav_button_previous",
                  nav_button_next: "rdp-nav_button_next",
                  table: "rdp-table w-full",
                  head_row: "rdp-head_row",
                  head_cell:
                    "rdp-head_cell text-gray-400 font-medium text-sm p-2",
                  row: "rdp-row",
                  cell: "rdp-cell",
                  button:
                    "rdp-button w-full h-10 text-sm rounded-lg transition-colors text-gray-300 hover:bg-gray-700",
                  button_reset: "rdp-button_reset",
                  day: "rdp-day",
                  day_today: "rdp-day_today font-semibold",
                  day_selected:
                    "rdp-day_selected bg-blue-600 text-white font-semibold hover:bg-blue-700",
                  day_disabled:
                    "rdp-day_disabled text-gray-600 cursor-not-allowed",
                  day_outside: "rdp-day_outside text-gray-600",
                  day_range_middle: "rdp-day_range_middle",
                  day_hidden: "rdp-day_hidden",
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Available Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Available Times
            </h3>
            <div className="space-y-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`
                    w-full p-3 rounded-lg border-2 transition-all duration-200 text-left
                    ${
                      selectedTime === time
                        ? "border-white bg-gray-700 text-white font-semibold"
                        : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700"
                    }
                `}>
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Your Appointment
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Service:</span>
                <span className="text-white font-medium">
                  {selectedService}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date:</span>
                <span className="text-white font-medium">
                  {selectedDate ? formatDate(selectedDate) : "No date selected"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Time:</span>
                <span className="text-white font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Dentist:</span>
                <span className="text-white font-medium">Dr. Evelyn Reed</span>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <div className="mt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Booking..." : "Confirm Appointment"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
