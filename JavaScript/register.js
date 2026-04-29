function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const type = document.querySelector('input[name="atype"]:checked');
  if (!type) {
    alert("Select account type");
    return;
  }

  const user = {
    id: "RF" + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    password,
    type: type.value
  };

  // 🔹 Get existing users or empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // 🔹 Prevent duplicate email
  const exists = users.some(u => u.email === email);
  if (exists) {
    alert("User already registered!");
    return;
  }

  users.push(user);

  // 🔹 Save back
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "login.html";
}
