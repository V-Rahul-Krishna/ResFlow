import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load data from localStorage (mock admin access)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    setUsers(storedUsers);
    setBookings(storedBookings);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* USERS SECTION */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Registered Users</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Type</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border capitalize">{u.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOOKINGS SECTION */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">All Bookings</h2>
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Booking ID</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Details</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="text-center">
                <td className="p-2 border">{b.bookingId}</td>
                <td className="p-2 border">{b.userName}</td>
                <td className="p-2 border uppercase">{b.type}</td>
                <td className="p-2 border">
                  {b.type === "fuel"
                    ? `${b.fuelType} - ${b.litres}L`
                    : `Priority: ${b.priority}`}
                </td>
                <td className="p-2 border">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
