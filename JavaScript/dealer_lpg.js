const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.type !== "dealer_lpg") {
  window.location.href = "login.html";
}

document.getElementById("dealerWelcome").innerText =
  `Welcome ${user.name} (ID: ${user.id})`;

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const table = document.getElementById("dealerTable");

// ✅ FILTER ONLY LPG PENDING BOOKINGS
const lpgBookings = bookings.filter(
  b => b.type === "lpg" && b.status === "Pending"
);

table.innerHTML = ""; // clear table before rendering

lpgBookings.forEach((b, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${b.userName}</td>
    <td>${b.userId}</td>
    <td>${b.priority}</td>
    <td>${b.rationCardNumber}</td>
    <td>${b.rationCardType}</td>
    
  `;
  table.appendChild(row);
});