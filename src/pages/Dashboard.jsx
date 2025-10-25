import {useEffect, useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import BookingsTable from "../features/dashboard/BookingsTable";
import {getBookings} from "../sevices/api";
import Button from "../components/Button";

function Dashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookingsData, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getBookings(currentPage, 8);
        setBookingsData(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({page: newPage.toString()});
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col gap-8">
        <div className="text-center py-8">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold mb-4">Booked Appointments</h1>
        <div className="text-center py-8 text-red-500">
          Error loading bookings: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Booked Appointments</h1>
        <Button onClick={handleLogout} variation="secondary" size="small">
          Logout
        </Button>
      </div>
      <BookingsTable
        bookings={bookingsData?.data || []}
        paginationData={bookingsData}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Dashboard;
