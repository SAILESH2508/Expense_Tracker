// Hardcoded login credentials
const USERNAME = "NISHA";
const PASSWORD = "1234";

// Function to handle login
function login() {
    let enteredUsername = document.getElementById("username").value.trim();
    let enteredPassword = document.getElementById("password").value.trim();

    if (enteredUsername === USERNAME && enteredPassword === PASSWORD) {
        sessionStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "daily_expense.html"; // Redirect to dashboard
    } else {
        alert("Invalid credentials! Please try again.");
    }
}

// Function to handle logout
function logout() {
    sessionStorage.removeItem("loggedIn");
    alert("You have been logged out.");
    window.location.href = "login.html"; // Redirect to login page
}

// Function to check login status and prevent unauthorized access
function checkLogin() {
    if (!sessionStorage.getItem("loggedIn")) {
        alert("Please log in first!");
        window.location.href = "login.html"; // Redirect to login if not logged in
    }
}

// Function to set the monthly budget
function setBudget() {
    let budget = document.getElementById("budget").value.trim();
    
    if (!budget || isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }

    localStorage.setItem("budget", budget);
    document.getElementById("budget-display").innerText = `Budget: ₹${budget}`;
    updateExpenseList(); // Refresh remaining budget
    alert("Budget set successfully!");
}

// Function to load saved budget on page load
function loadBudget() {
    let savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
        document.getElementById("budget-display").innerText = `Budget: ₹${savedBudget}`;
    }
}

// Function to add an expense
function addExpense() {
    let name = document.getElementById("expense-name").value.trim();
    let amount = parseFloat(document.getElementById("expense-amount").value.trim());
    let category = document.getElementById("expense-category").value;
    let date = new Date().toLocaleDateString();

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ name, amount, category, date });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateExpenseList();
    alert("Expense added successfully!");

    // Clear input fields
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-category").value = "Other";
}

// Function to update expense list
function updateExpenseList() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = ""; // Clear previous list

    let totalSpent = 0;

    expenses.forEach((expense, index) => {
        totalSpent += expense.amount;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });

    // Update totals
    document.getElementById("total-spent").innerText = `Spent: ₹${totalSpent.toFixed(2)}`;

    // Remaining budget
    let budget = parseFloat(localStorage.getItem("budget")) || 0;
    let remaining = budget - totalSpent;
    document.getElementById("remaining-budget").innerText = `Remaining: ₹${remaining.toFixed(2)}`;
}

// Function to delete an expense
function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses.splice(index, 1); // Remove selected expense
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }
}

// Function to handle signup
function signup() {
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    let user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage

    alert("Signup successful! Redirecting to login page.");
    window.location.href = "expense.html"; // Redirect to login page
}

// Load budget and expenses when page loads
document.addEventListener("DOMContentLoaded", function() {
    loadBudget();
    updateExpenseList();
});
