import Table from "../../components/Table";

function BookingsTable({bookings, paginationData, onPageChange}) {
  if (!bookings || bookings.length === 0) {
    return (
      <Table>
        <Table.Empty>No bookings found.</Table.Empty>
      </Table>
    );
  }

  return (
    <Table>
      <Table.Header>
        <Table.Title>Bookings</Table.Title>
      </Table.Header>

      <Table.Content>
        <Table.Element>
          <Table.Head>
            <Table.Row hover={false}>
              <Table.HeaderCell>Service</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Dentist</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {bookings.map((booking) => (
              <Table.Row key={booking.id}>
                <Table.Cell>{booking.service || "N/A"}</Table.Cell>
                <Table.Cell>{booking.date || "N/A"}</Table.Cell>
                <Table.Cell>{booking.time || "N/A"}</Table.Cell>
                <Table.Cell>{booking.dentist || "N/A"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Element>
      </Table.Content>

      {paginationData && paginationData.totalPages > 1 && (
        <Table.Pagination
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          totalItems={paginationData.totalItems}
          itemsPerPage={paginationData.itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </Table>
  );
}

export default BookingsTable;
