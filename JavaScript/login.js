document.getElementById("signin").addEventListener("click", function () {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const userType = document.querySelector('input[name="atype"]:checked');
  const users = JSON.parse(localStorage.getItem("users"));

  if (!users || users.length === 0) {
    console.log("❌ USERS EMPTY OR MISSING");
    return;
  }

  const matchedUser = users.find(
    u =>
      u.email === email &&
      u.password === password &&
      u.type === userType.value
  );
  if (!matchedUser) {
    alert("❌ INVALID CREDENTIALS");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(matchedUser));

if (matchedUser.type === "citizen") {
  window.location.href = "citizen.html";
}
else if (matchedUser.type === "dealer_lpg") {
  window.location.href = "dealer_lpg.html";
}
else if (matchedUser.type === "dealer_fuel") {
  window.location.href = "fuel-dealer.html";
}
});
