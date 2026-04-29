/* =========================
   AUTH CHECK
========================= */
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.type !== "dealer_fuel") {
  window.location.href = "login.html";
}

document.getElementById("fuelDealerWelcome").innerText =
  `Welcome ${user.name} (ID: ${user.id})`;

/* =========================
   LOAD BOOKINGS
========================= */
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const table = document.getElementById("fuelTable");

/* FIFO — no sorting */
bookings.forEach((b, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${index + 1}</td>
    <td>${b.userName}</td>
    <td>${b.userId}</td>

    <td>${b.fuelType}</td>
    <td>${b.litres}</td>
    <td>${b.status}</td>
  `;

  table.appendChild(row);
});

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
