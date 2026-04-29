    const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.type !== "citizen") {
  window.location.href = "login.html";
}

document.getElementById("welcome").innerText =
  `Welcome ${user.name} (ID: ${user.id})`;

function bookLPG() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Login required");
    return;
  }

  const income = Number(document.getElementById("income").value);
  const members = Number(document.getElementById("members").value);
const rationNo = document.getElementById("rationNo").value.trim();
const rationType = document.getElementById("rationType").value;

if (!rationNo || !rationType) {
  return;
}
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // 🔒 PREVENT DUPLICATE LPG
  const alreadyPending = bookings.some(
  b =>
    b.rationCardNumber === rationNo &&
    b.type === "lpg" &&
    b.status === "Pending"
);

if (alreadyPending) {
  return;
}
  // 🔢 Priority logic (simple & deterministic)
  const incomeWeight = Math.max(0, (30000 - income) / 10000);
const priority = (members * 2) + incomeWeight;

  const booking = {
  bookingId: "BKG" + Math.floor(1000 + Math.random() * 9000),
  userId: currentUser.id,
  userName: currentUser.name,

  rationCardNumber: rationNo,
  rationCardType: rationType, // PHH / AAY / NPHH

  priority,
  status: "Pending",
  bookingDate: new Date().toISOString().split("T")[0],
  expectedDate: getExpectedDate(priority)
};

  bookings.push(booking);

  localStorage.setItem("bookings", JSON.stringify(bookings));

  const result = document.getElementById("result");

result.innerHTML = `
  <div style="
    margin-top:16px;
    padding:14px;
    border-radius:8px;
    background:#e6f9f3;
    border:1.5px solid #00b37e;
    color:#064e3b;
    font-size:14px;
  ">
    <strong>✅ Booking Confirmed</strong><br><br>
    <b>Booking ID:</b> ${booking.bookingId}<br>
    <b>Priority Score:</b> ${booking.priority}<br>
    <b>Expected Delivery:</b> ${booking.expectedDate}<br>
    <b>Status:</b> ${booking.status}
  </div>
`;
}

function getExpectedDate(priority) {
  const days = priority >= 8 ? 2 : priority >= 6 ? 4 : 7;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function bookFuel() {
  const fuelType = document.getElementById("fuelType").value;
  const litres = Number(document.getElementById("litres").value);
  const error = document.getElementById("litreError");

  error.innerText = "";

  if (!fuelType) {
    error.innerText = "Please select fuel type";
    return;
  }

  if (!litres || litres < 1 || litres > 3) {
    error.innerText = "Fuel limit is 1 to 3 litres only";
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // 🔒 Prevent duplicate pending fuel booking
  const alreadyPending = bookings.some(
    b =>
      b.userId === user.id &&
      b.type === "fuel" &&
      b.fuelType === fuelType &&
      b.status === "Pending"
  );

  if (alreadyPending) {
    showFuelResult("⚠️ You already have a pending fuel booking", false);
    return;
  }

  const  newBooking= {
    bookingId: "FUEL" + Math.floor(100000 + Math.random() * 900000),
    type: "fuel",
    fuelType,
    litres,
    userId: user.id,
    userName: user.name,
    address: user.address || "Registered Address",
    status: "Pending",
    deliveryType: "Fast",
    bookingDate: new Date().toISOString().split("T")[0]
  };

  const exists = bookings.some(b => b.bookingId === newBooking.bookingId);

if (!exists) {
  bookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

  // ✅ FAST DELIVERY SUCCESS MESSAGE
  showFuelResult(
    `🚀 <b>Fuel Booking Successful!</b><br><br>
     <b>Fuel:</b> ${fuelType.toUpperCase()}<br>
     <b>Litres:</b> ${litres}<br>
     <b>Delivery:</b> Same Day / Fast Track<br>
     <b>Booking ID:</b> ${newBooking.bookingId}<br>
     <b>Status:</b> Pending`,
    true
  );

  document.getElementById("fuelForm").reset();
}
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
/* ===============================
   RESULT DISPLAY (NO ALERTS)
================================ */
function showFuelResult(message, success) {
  const result = document.getElementById("fuelResult");

  result.innerHTML = `
    <div style="
      margin-top:16px;
      padding:14px;
      border-radius:8px;
      background:${success ? "#e6f9f3" : "#fff3cd"};
      border:1.5px solid ${success ? "#00b37e" : "#ff9800"};
      color:#064e3b;
      font-size:14px;
    ">
      ${message}
    </div>
  `;
}
