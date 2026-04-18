document.addEventListener("DOMContentLoaded", () => {

  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const role = loginForm.querySelector("select")?.value;
      const username = loginForm.querySelector("input[type='text']")?.value;
      const password = loginForm.querySelector("input[type='password']")?.value;

      if (!username || !password) {
        alert("All fields required");
        return;
      }

      if (role === "user") {
        window.location.href = "user-dashboard.html";
      } else if (role === "hospital") {
        window.location.href = "hospital-dashboard.html";
      } else if (role === "supplier") {
        window.location.href = "supplier-dashboard.html";
      } else {
        alert("Invalid role");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();

      const ration = registerForm.querySelector("#ration")?.value;
      const family = registerForm.querySelector("#family")?.value;
      const income = registerForm.querySelector("#income")?.value;

      if (!ration || ration.length < 10) {
        alert("Invalid ration card number");
        return;
      }

      if (family <= 0 || income <= 0) {
        alert("Invalid family or income data");
        return;
      }

      alert("Verification successful. You can now login.");
      window.location.href = "login.html";
    });
  }

  const lpgForm = document.querySelector("#lpgOrderForm");
  const fuelForm = document.querySelector("#fuelOrderForm");

  if (lpgForm) {
    lpgForm.addEventListener("submit", e => {
      e.preventDefault();

      const quantity = lpgForm.querySelector("input[type='number']").value;
      const priority = document.querySelector(".priority-info")?.innerText || "";

      if (quantity != 1) {
        alert("Only one LPG cylinder allowed");
        return;
      }

      if (!priority.includes("High")) {
        alert("Low priority users cannot request LPG now");
        return;
      }

      alert("LPG request submitted successfully");
    });
  }

  if (fuelForm) {
    fuelForm.addEventListener("submit", e => {
      e.preventDefault();

      const type = fuelForm.querySelector("select").value;
      const qty = fuelForm.querySelector("input").value;

      if (!qty || qty <= 0) {
        alert("Enter valid fuel quantity");
        return;
      }

      alert(type + " order placed successfully");
    });
  }

  const logoutBtn = document.querySelector(".logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

});