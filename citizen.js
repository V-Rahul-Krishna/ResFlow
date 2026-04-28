// =============================================
//   ResFlow – Citizen Dashboard JavaScript
//   Student Project | Simple Booking Logic
// =============================================
 
 
// ===== HELPER: Generate a simple reference ID =====
// Creates a fake booking reference like "RFL-2024-8472"
// Used to display in the confirmation message
function generateRefID() {
  var year = new Date().getFullYear();
  var randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return "RFL-" + year + "-" + randomNum;
}
 
 
// ===== HELPER: Determine category based on income =====
// Simple rule:
//   Income below 2,50,000  → BPL (Below Poverty Line)
//   Income 2,50,000-8,00,000 → Middle Income
//   Income above 8,00,000  → General
function getCategory(income) {
  if (income < 250000) {
    return "BPL (Below Poverty Line) – Priority Tier 2";
  } else if (income <= 800000) {
    return "Middle Income – Priority Tier 3";
  } else {
    return "General / Commercial – Priority Tier 4";
  }
}
 
 
// ===== HELPER: Clear all error messages and red borders =====
function clearErrors() {
  // Remove red borders from inputs
  document.getElementById("income").classList.remove("error");
  document.getElementById("members").classList.remove("error");
 
  // Clear error text
  document.getElementById("incomeError").textContent = "";
  document.getElementById("membersError").textContent = "";
}
 
 
// ===== HELPER: Show an error on a specific field =====
// fieldId   → the input element's id
// errorId   → the span element's id where error text goes
// message   → the error string to display
function showError(fieldId, errorId, message) {
  document.getElementById(fieldId).classList.add("error");
  document.getElementById(errorId).textContent = message;
}
 
 
// ===== MAIN FUNCTION: bookLPG() =====
// Called when user clicks the "Book LPG" button
// Steps:
//   1. Read input values
//   2. Validate inputs
//   3. If valid → show confirmation
//   4. If invalid → show error messages
function bookLPG() {
 
  // --- Step 1: Read values from form ---
  var incomeInput = document.getElementById("income").value.trim();
  var membersInput = document.getElementById("members").value.trim();
 
  // --- Step 2: Clear any previous errors ---
  clearErrors();
 
  // Track whether form is valid
  var isValid = true;
 
  // --- Step 3: Validate Family Income ---
  if (incomeInput === "") {
    // Field is empty
    showError("income", "incomeError", "Please enter your family annual income.");
    isValid = false;
 
  } else if (Number(incomeInput) <= 0) {
    // Value must be a positive number
    showError("income", "incomeError", "Income must be a positive number.");
    isValid = false;
  }
 
  // --- Step 4: Validate Family Members ---
  if (membersInput === "") {
    // Field is empty
    showError("members", "membersError", "Please enter the number of family members.");
    isValid = false;
 
  } else if (Number(membersInput) <= 0) {
    // Must be at least 1 member
    showError("members", "membersError", "Family members must be at least 1.");
    isValid = false;
 
  } else if (!Number.isInteger(Number(membersInput))) {
    // Family members can't be a decimal
    showError("members", "membersError", "Please enter a whole number (e.g. 4).");
    isValid = false;
  }
 
  // --- Step 5: If validation failed, stop here ---
  if (!isValid) {
    return; // Exit the function without booking
  }
 
  // --- Step 6: Convert to numbers for calculation ---
  var income = Number(incomeInput);
  var members = Number(membersInput);
 
  // --- Step 7: Determine user category based on income ---
  var category = getCategory(income);
 
  // --- Step 8: Generate a reference ID ---
  var refID = generateRefID();
 
  // --- Step 9: Build the confirmation detail message ---
  var detailMsg =
    "Income: ₹" + income.toLocaleString("en-IN") +
    " | Members: " + members +
    " | Category: " + category;
 
  var refMsg = "Booking Reference: " + refID + " | Slot: December 12, 2024 · 12:00–14:00";
 
  // --- Step 10: Display the confirmation box ---
  document.getElementById("confirmDetail").textContent = detailMsg;
  document.getElementById("confirmRef").textContent = refMsg;
 
  // Show the hidden confirmation box by adding the "show" class
  var confirmBox = document.getElementById("confirmBox");
  confirmBox.classList.add("show");
 
  // Scroll down smoothly so user can see the confirmation
  confirmBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
 
  // --- Step 11: Disable the Book button (prevent double booking) ---
  var btn = document.getElementById("bookBtn");
  btn.disabled = true;
  btn.textContent = "✅ Booking Submitted";
 
  // --- Step 12: Clear the form inputs ---
  document.getElementById("income").value = "";
  document.getElementById("members").value = "";
 
  // --- Step 13: Log to console (useful for debugging during development) ---
  console.log("Booking successful!");
  console.log("Income: ₹" + income);
  console.log("Members: " + members);
  console.log("Category: " + category);
  console.log("Reference ID: " + refID);
 
} // end bookLPG()