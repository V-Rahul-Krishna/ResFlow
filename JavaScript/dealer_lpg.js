  const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.type !== "dealer_lpg") {
  window.location.href = "login.html";
}

document.getElementById("dealerWelcome").innerText =
  `Welcome ${user.name} (ID: ${user.id})`;
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const table = document.getElementById("dealerTable");

bookings.forEach((b, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${index + 1}</td>
  <td>${b.userName}</td>
  <td>${b.userId}</td>
  <td>${b.priority}</td>
  <td>${b.rationCardNumber}</td>
  <td>${b.rationCardType}</td>
  <td>${b.status}</td>
`;

  table.appendChild(row);
});
